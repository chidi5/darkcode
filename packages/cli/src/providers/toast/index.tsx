import { useTerminalDimensions } from "@opentui/react";
import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { SplitBorderChars } from "../../components/border";
import { useTheme } from "../theme";
import {
  DEFAULT_TOAST_DURATION,
  type ToastOptions,
  type ToastVariant,
} from "./types";

export type ToastContextValue = {
  showToast: (options: ToastOptions) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

type ToastProviderProps = {
  children: React.ReactNode;
};

export function ToastProvider({ children }: ToastProviderProps) {
  const [currentToast, setCurrentToast] = useState<ToastOptions | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const clearCurrentTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const showToast = useCallback(
    (options: ToastOptions) => {
      const duration = options.duration || DEFAULT_TOAST_DURATION;

      clearCurrentTimeout();
      setCurrentToast({
        variant: options.variant || "info",
        ...options,
        duration,
      });
      timeoutRef.current = setTimeout(() => {
        setCurrentToast(null);
      }, duration).unref(); // Use provided duration or default to 3 seconds
    },
    [clearCurrentTimeout],
  );

  const value: ToastContextValue = {
    showToast,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      {currentToast && <Toast {...currentToast} />}
    </ToastContext.Provider>
  );
}

type ToastProps = ToastOptions;

function Toast(currentToast: ToastProps) {
  const { colors } = useTheme();
  const { width } = useTerminalDimensions();

  if (!currentToast) return null;

  const variantColors: Record<ToastVariant, string> = {
    success: colors.success,
    error: colors.error,
    info: colors.info,
  };

  const borderColor = currentToast.variant
    ? variantColors[currentToast.variant]
    : variantColors.info;

  return (
    <box
      position="absolute"
      justifyContent="center"
      alignItems="flex-start"
      top={2}
      right={2}
      paddingLeft={2}
      paddingRight={2}
      paddingTop={1}
      paddingBottom={1}
      backgroundColor={colors.surface}
      borderColor={borderColor}
      border={["left", "right"]}
      width={Math.max(1, Math.min(60, width - 6))} // Ensure width is at least 1 and at most 60 or terminal width minus padding
      customBorderChars={SplitBorderChars}
    >
      <box flexDirection="column" gap={1} width="100%">
        <text fg="#E1E1E1" wrapMode="word" width="100%">
          {currentToast.message}
        </text>
      </box>
    </box>
  );
}
