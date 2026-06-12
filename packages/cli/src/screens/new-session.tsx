import { DEFAULT_CHAT_MODEL_ID } from "@darkcode/shared";
import { useEffect, useMemo, useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import { z } from "zod";
import { UserMessage } from "../components/messages";
import { SessionShell } from "../components/session-shell";
import { apiClient } from "../lib/api-client";
import { getErrorMessage } from "../lib/http-errors";
import { useToast } from "../providers/toast";

const newSessionSchema = z.object({
  message: z.string(),
});

export function NewSession() {
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();
  const hasStartedRef = useRef(false);

  const state = useMemo(() => {
    const parsed = newSessionSchema.safeParse(location.state);
    return parsed.success ? parsed.data : null;
  }, [location.state]);

  // if the user navigates to this screen without the expected state, redirect them back to the home screen
  useEffect(() => {
    if (!state) {
      navigate("/", { replace: true });
    }
  }, [state, navigate]);

  // create session on mount and navigate to session screen
  useEffect(() => {
    if (!state || hasStartedRef.current) return;

    hasStartedRef.current = true;
    let ignore = false;
    const createSession = async () => {
      try {
        const response = await apiClient.sessions.$post({
          json: {
            title: state.message.slice(0, 100), // use first 100 chars of message as title
            initialMessage: {
              role: "USER",
              content: state.message,
              mode: "BUILD",
              model: DEFAULT_CHAT_MODEL_ID, // TODO: allow user to select model
            },
          },
        });

        if (ignore) return;
        if (!response.ok) {
          throw new Error(await getErrorMessage(response));
        }
        const session = await response.json();
        navigate(`/sessions/${session.id}`, {
          replace: true,
          state: { session },
        });
      } catch (error) {
        if (ignore) return;
        toast.showToast({
          variant: "error",
          message:
            error instanceof Error ? error.message : "Failed to create session",
        });
        navigate("/", { replace: true });
      }
    };

    if (state?.message) {
      createSession();
    }
    return () => {
      ignore = true;
    };
  }, [state, navigate, toast]);

  if (!state) return null;

  return (
    <SessionShell onSubmit={() => {}} inputDisabled loading>
      <UserMessage message={state.message} />
    </SessionShell>
  );
}
