import { ScrollBoxRenderable } from "@opentui/core";

export type CommandContext = {
  exit: () => void;
};

export type Command = {
  name: string;
  description: string;
  value: string;
  action?: (ctx: CommandContext) => void | Promise<void>;
};

export type CommandMenuProps = {
  query: string;
  selectedIndex: number;
  scrollRef: React.RefObject<ScrollBoxRenderable | null>;
  onSelect: (index: number) => void;
  onExecute: (index: number) => void;
};

export type UseCommandMenuReturn = {
  showCommandMenu: boolean;
  commandQuery: string;
  selectedIndex: number;
  scrollRef: React.RefObject<ScrollBoxRenderable | null>;
  handleContentChange: (content: string) => void;
  resolveCommand: (index: number) => Command | undefined;
  setSelectedIndex: (index: number) => void;
};
