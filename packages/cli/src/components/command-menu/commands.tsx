import { ThemeDialogContent } from "../dialogs";
import type { Command } from "./types";

export const COMMANDS: Command[] = [
  {
    name: "new",
    description: "Start a new conversation",
    value: "/new",
    action: (ctx) => {
      ctx.toast.showToast({
        message: "Starting a new conversation...",
      });
    },
  },
  {
    name: "agents",
    description: "Switch agents",
    value: "/agents",
    action: (ctx) => {
      ctx.dialog.open({
        title: "Select an Agent",
        children: <text>Agent selection is not implemented yet.</text>,
      });
    },
  },
  {
    name: "models",
    description: "Select AI model",
    value: "/models",
    action: (ctx) => {
      ctx.toast.showToast({
        message: "Model selection is not implemented yet.",
      });
    },
  },
  {
    name: "sessions",
    description: "View and manage conversation sessions",
    value: "/sessions",
    action: (ctx) => {
      ctx.toast.showToast({
        message: "Session management is not implemented yet.",
      });
    },
  },
  {
    name: "theme",
    description: "Change the appearance of the app",
    value: "/theme",
    action: (ctx) => {
      ctx.dialog.open({
        title: "Select Theme",
        children: <ThemeDialogContent />,
      });
    },
  },
  {
    name: "login",
    description: "Sign in to your account",
    value: "/login",
    action: (ctx) => {
      ctx.toast.showToast({
        message: "Login is not implemented yet.",
      });
    },
  },
  {
    name: "logout",
    description: "Sign out of your account",
    value: "/logout",
    action: (ctx) => {
      ctx.toast.showToast({
        message: "Logout is not implemented yet.",
      });
    },
  },
  {
    name: "upgrade",
    description: "Buy more credits",
    value: "/upgrade",
    action: (ctx) => {
      ctx.toast.showToast({
        message: "Upgrade is not implemented yet.",
      });
    },
  },
  {
    name: "usage",
    description: "Open billing portal in your browser",
    value: "/usage",
    action: (ctx) => {
      ctx.toast.showToast({
        message: "Usage information is not implemented yet.",
      });
    },
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
