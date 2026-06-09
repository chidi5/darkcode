import { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router";
import { SessionShell } from "../components/session-shell";
import { UserMessage, BotMessage, ErrorMessage } from "../components/messages";

export function NewSession() {
  const location = useLocation();
  const navigate = useNavigate();
  const message = (location.state as { message?: string })?.message ?? "";

  useEffect(() => {
    if (!message) {
      navigate("/", { replace: true });
    }
  }, [message, navigate]);

  return (
    <SessionShell onSubmit={() => {}} inputDisabled loading>
      <UserMessage message={message} />
      <BotMessage content="A sample bot response." model="opus-4-6" />
      <ErrorMessage message="Sample error message." />
    </SessionShell>
  );
}
