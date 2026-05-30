import { join } from "node:path";
import { homedir } from "node:os";
import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import {
  DEFAULT_THEME,
  THEMES,
  type Theme,
  type ThemeColors,
} from "../../theme";
import { createContext, useCallback, useContext, useState } from "react";

const CONFIG_DIR = join(homedir(), ".darkcode");
const THEME_PREFENCES_PATH = join(CONFIG_DIR, "preferences.json");

type ThemePreferences = {
  themeName: string;
};

function getInitialTheme(): Theme {
  try {
    const preferences = JSON.parse(
      readFileSync(THEME_PREFENCES_PATH, "utf-8"),
    ) as Partial<ThemePreferences>;
    const savedTheme = THEMES.find((t) => t.name === preferences.themeName);
    return savedTheme ?? DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
}

function persistTheme(theme: Theme) {
  try {
    mkdirSync(CONFIG_DIR, { recursive: true });
    writeFileSync(
      THEME_PREFENCES_PATH,
      JSON.stringify(
        { themeName: theme.name } satisfies ThemePreferences,
        null,
        2,
      ),
      "utf-8",
    );
  } catch {
    // Ignore errors
  }
}

type ThemeContextValue = {
  colors: ThemeColors;
  currentTheme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

type ThemeProviderProps = {
  children: React.ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(getInitialTheme());

  const setTheme = useCallback((theme: Theme) => {
    setCurrentTheme(theme);
    persistTheme(theme);
  }, []);

  const value: ThemeContextValue = {
    colors: currentTheme.colors,
    currentTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
