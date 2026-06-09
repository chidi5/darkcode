import { useTheme } from "../providers/theme";

type ThemedRootProps = {
  children: React.ReactNode;
};

export function ThemedRoot({ children }: ThemedRootProps) {
  const { colors } = useTheme();

  return (
    <box backgroundColor={colors.background} width="100%" height="100%" gap={2}>
      {children}
    </box>
  );
}
