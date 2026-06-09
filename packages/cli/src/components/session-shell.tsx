import { useEffect, useRef, useCallback } from "react";
import {
  type ScrollBoxRenderable,
  type TextareaRenderable,
  type KeyBinding,
  TextAttributes,
} from "@opentui/core";
import { useTheme } from "../providers/theme";
import { useKeyboardLayer } from "../providers/keyboard-layer";
import { EmptyBorder } from "./border";
import { StatusBar } from "./status-bar";
import { InputBar } from "./input-bar";
import { Spinner } from "./spinner";

export const SESSION_KEY_BINDINGS: KeyBinding[] = [
  { name: "return", action: "submit" },
  { name: "enter", action: "submit" },
  { name: "return", shift: true, action: "newline" },
  { name: "enter", shift: true, action: "newline" },
];

type SessionShellProps = {
  children?: React.ReactNode;
  onSubmit: (message: string) => void;
  inputDisabled?: boolean;
  loading?: boolean;
};

export function SessionShell({
  children,
  onSubmit,
  inputDisabled,
  loading,
}: SessionShellProps) {
  const { colors } = useTheme();

  return (
    <box
      width="100%"
      height="100%"
      flexGrow={1}
      flexDirection="column"
      paddingY={1}
      paddingX={2}
      gap={1}
    >
      <scrollbox flexGrow={1} width="100%" stickyScroll stickyStart="bottom">
        <box gap={1}>{children}</box>
      </scrollbox>
      <box flexShrink={0}>
        <InputBar onSubmit={onSubmit} disabled={inputDisabled} />
      </box>
      <box
        flexShrink={0}
        flexDirection="row"
        gap={2}
        justifyContent="space-between"
        width="100%"
        height={1}
        paddingLeft={1}
      >
        <box flexDirection="row" gap={2} alignItems="center">
          {loading && <Spinner />}
        </box>
        <box flexDirection="row" gap={1} flexShrink={0} marginLeft="auto">
          <text>tab</text>
          <text attributes={TextAttributes.DIM}>agents</text>
        </box>
      </box>
    </box>
  );
}
