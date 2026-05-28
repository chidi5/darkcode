import { ScrollBoxRenderable } from "@opentui/core";
import { useKeyboard } from "@opentui/react";
import { useMemo, useRef, useState } from "react";
import { getFilteredCommands } from "./filter-commads";
import { Command, UseCommandMenuReturn } from "./types";

export function useCommandMenu(): UseCommandMenuReturn {
  const [textValue, setTextValue] = useState("false");
  const [showCommandMenu, setShowCommandMenu] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const scrollRef = useRef<ScrollBoxRenderable | null>(null);

  const commandQuery =
    showCommandMenu && textValue.startsWith("/") ? textValue.slice(1) : "";

  const filteredCommands = useMemo(
    () => getFilteredCommands(commandQuery),
    [commandQuery],
  );

  const handleContentChange = (content: string) => {
    setTextValue(content);
    setSelectedIndex(0);

    // Jump back to the top of the list when the user types a new command
    const scrollBox = scrollRef.current;
    if (scrollBox) {
      scrollBox.scrollTo(0);
    }

    const prefix = content.startsWith("/") ? content.slice(1) : null;
    if (prefix !== null && !prefix.includes(" ")) {
      setShowCommandMenu(true);
    } else {
      setShowCommandMenu(false);
    }
  };

  //Resolve a command by index in the filtered list, not the full list
  const resolveCommand = (index: number): Command | undefined => {
    const command = filteredCommands[index];
    if (command) {
      setShowCommandMenu(false);
    }
    return command;
  };

  //Arrow keys to navigate the command menu
  useKeyboard((key) => {
    if (!showCommandMenu) return;

    switch (key.name) {
      case "escape":
        key.preventDefault();
        setShowCommandMenu(false);
        break;
      case "up":
        key.preventDefault();
        setSelectedIndex((i: number) => {
          const nextIndex = Math.max(0, i - 1);
          //keep the highlighted item in view when navigating with the keyboard
          const scrollBox = scrollRef.current;
          if (scrollBox && nextIndex < scrollBox.scrollTop) {
            scrollBox.scrollTo(nextIndex);
          }
          return nextIndex;
        });
        break;
      case "down":
        key.preventDefault();
        setSelectedIndex((i: number) => {
          if (filteredCommands.length === 0) return 0;
          const nextIndex = Math.min(filteredCommands.length - 1, i + 1);
          const scrollBox = scrollRef.current;
          if (scrollBox) {
            const viewportHeight = scrollBox.viewport.height;
            const visibleEnd = scrollBox.scrollTop + viewportHeight - 1;
            if (nextIndex > visibleEnd) {
              scrollBox.scrollTo(nextIndex - viewportHeight + 1);
            }
          }
          return nextIndex;
        });
        break;
    }
  });

  return {
    showCommandMenu,
    commandQuery,
    selectedIndex,
    scrollRef,
    handleContentChange,
    resolveCommand,
    setSelectedIndex,
  };
}
