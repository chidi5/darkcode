import { useParams, useLocation, useNavigate } from "react-router";
import { SessionShell } from "../components/session-shell";
import { UserMessage, BotMessage, ErrorMessage } from "../components/messages";
import type { InferResponseType } from "hono/client";
import prettyMS from "pretty-ms";
import { z } from "zod";
import {
  DEFAULT_CHAT_MODEL_ID,
  type SupportedChatModelId,
} from "@darkcode/shared";
import { useChat } from "../hooks/use-chat";
import type { Message, ClientMessagePart } from "../hooks/use-chat";
import { useToast } from "../providers/toast";
import { useEffect, useMemo, useState } from "react";
import { getErrorMessage } from "../lib/http-errors";
import { apiClient } from "../lib/api-client";
import { MessageStatus } from "@darkcode/database/enums";
import { useKeyboardLayer } from "../providers/keyboard-layer";
import { useKeyboard } from "@opentui/react";

type SessionData = InferResponseType<
  (typeof apiClient.sessions)[":id"]["$get"],
  200
>;

const sessionLocationSchema = z.object({
  session: z.custom<SessionData>(
    (value) =>
      value != null &&
      typeof value === "object" &&
      "id" in value &&
      typeof value.id === "string",
  ),
});

function mapDbMessages(dbMessages: SessionData["messages"]): Message[] {
  return dbMessages.map((m): Message => {
    if (m.role === "ERROR") {
      return { id: m.id, role: "error", content: m.content };
    }

    if (m.role === "USER") {
      return {
        id: m.id,
        role: "user",
        content: m.content,
        mode: m.mode,
        model: m.model as SupportedChatModelId,
      };
    }

    return {
      id: m.id,
      role: "assistant",
      content: m.content,
      mode: m.mode,
      model: m.model as SupportedChatModelId,
      parts: [{ type: "text", text: m.content }],
      ...(m.duration !== null ? { duration: prettyMS(m.duration * 1000) } : {}),
      interrupted: m.status === MessageStatus.INTERRUPTED,
    };
  });
}

function ChatMessage({ msg }: { msg: Message }) {
  if (msg.role === "user") {
    return <UserMessage message={msg.content} />;
  }
  if (msg.role === "error") {
    return <ErrorMessage message={msg.content} />;
  }
  return (
    <BotMessage
      parts={msg.parts}
      mode={msg.mode}
      model={msg.model}
      duration={msg.duration}
      streaming={false}
      interrupted={msg.interrupted}
    />
  );
}

function SessionChat({ session }: { session: SessionData }) {
  const [initialMessages] = useState(() => mapDbMessages(session.messages));
  const { isTopLayer } = useKeyboardLayer();
  const { messages, streaming, submit, abort, interrupt } = useChat(
    session.id,
    initialMessages,
  );

  //Stop the pending reply when the user leaves this session
  useEffect(() => {
    return () => abort();
  }, [abort]);

  //let a user cancel a reply even before the first streamed chunk arrives
  useKeyboard((key) => {
    if (
      key.name === "escape" &&
      isTopLayer("base") &&
      streaming.status === "streaming"
    ) {
      key.preventDefault();
      interrupt();
    }
  });

  return (
    <SessionShell
      onSubmit={(text) =>
        submit({ userText: text, mode: "BUILD", model: DEFAULT_CHAT_MODEL_ID })
      }
      loading={streaming.status === "streaming"}
      interruptible={streaming.status === "streaming"}
    >
      {messages.map((msg) => (
        <ChatMessage key={msg.id} msg={msg} />
      ))}
      {streaming.status === "streaming" && streaming.parts.length > 0 && (
        <BotMessage
          parts={streaming.parts}
          mode={streaming.mode}
          model={streaming.model}
          streaming
        />
      )}
    </SessionShell>
  );
}

export function Session() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();

  const prefetched = useMemo(() => {
    const parsed = sessionLocationSchema.safeParse(location.state);
    return parsed.success ? parsed.data.session : null;
  }, [location.state]);

  const [session, setSession] = useState<SessionData | null>(prefetched);

  useEffect(() => {
    if (prefetched) return;
    setSession(null); // reset session while loading

    if (!id) return;

    let ignore = false;
    const fetchSession = async () => {
      try {
        const response = await apiClient.sessions[":id"].$get({
          param: { id },
        });
        if (ignore) return;
        if (!response.ok) throw new Error(await getErrorMessage(response));
        setSession(await response.json());
      } catch (error) {
        if (ignore) return;
        toast.showToast({
          variant: "error",
          message:
            error instanceof Error ? error.message : "Failed to load session",
        });
        navigate("/", { replace: true });
      }
    };

    fetchSession();
    return () => {
      ignore = true;
    };
  }, [id, prefetched, toast, navigate]);

  if (!session) {
    return <SessionShell onSubmit={() => {}} inputDisabled loading />;
  }

  return <SessionChat key={session.id} session={session} />;
}
