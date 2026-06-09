import { useCallback } from "react";
import { useNavigate } from "react-router";
import { Header } from "../components/header";
import { InputBar } from "../components/input-bar";

export function Home() {
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    (text: string) => {
      navigate("/sessions/new", { state: { message: text } });
    },
    [navigate],
  );

  return (
    <box
      width="100%"
      height="100%"
      gap={2}
      flexGrow={1}
      alignItems="center"
      justifyContent="center"
      position="relative"
    >
      <Header />
      <box maxWidth={78} width="100%" paddingX={2}>
        <InputBar onSubmit={handleSubmit} />
      </box>
    </box>
  );
}
