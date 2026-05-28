import { Command } from "./types";

export const COMMANDS: Command[] = [
  {
    name: "new",
    description: "Start a new conversation",
    value: "/new",
  },
  {
    name: "clear",
    description: "Clear conversation history",
    value: "/clear",
  },
  {
    name: "agents",
    description: "Switch agents",
    value: "/agents",
  },
  {
    name: "models",
    description: "Select AI model",
    value: "/models",
  },
  {
    name: "sessions",
    description: "View and manage conversation sessions",
    value: "/sessions",
  },
  {
    name: "theme",
    description: "Change the appearance of the app",
    value: "/theme",
  },
  {
    name: "login",
    description: "Sign in to your account",
    value: "/login",
  },
  {
    name: "logout",
    description: "Sign out of your account",
    value: "/logout",
  },
  {
    name: "upgrade",
    description: "Buy more credits",
    value: "/upgrade",
  },
  {
    name: "usage",
    description: "Open billing portal in your browser",
    value: "/usage",
  },
  {
    name: "exit",
    description: "Exit the application",
    value: "/exit",
    action: (ctx) => {
      ctx.exit();
    },
  },
];
