export type ThemeColors = {
  primary: string;
  planMode: string;
  selection: string;
  thinking: string;
  success: string;
  error: string;
  info: string;
  background: string;
  surface: string;
  dialogSurface: string;
  thinkingBorder: string;
  dimSeparator: string;
};

export type Theme = {
  colors: ThemeColors;
  name: string;
};

export const THEMES: Theme[] = [
  {
    name: "Nightfox",
    colors: {
      primary: "#56D6C2",
      planMode: "#CF8EF4",
      selection: "#89B4FA",
      thinking: "#CF8EF4",
      success: "#82E0AA",
      error: "#E74C5E",
      info: "#56D6C2",
      background: "#0D0D12",
      surface: "#1A1A24",
      dialogSurface: "#0A0A10",
      thinkingBorder: "#34344A",
      dimSeparator: "#4E4E66",
    },
  },
  {
    name: "Catppuccin Mocha",
    colors: {
      primary: "#89B4FA",
      planMode: "#CBA6F7",
      selection: "#F5C2E7",
      thinking: "#CBA6F7",
      success: "#A6E3A1",
      error: "#F38BA8",
      info: "#89B4FA",
      background: "#1E1E2E",
      surface: "#313244",
      dialogSurface: "#181825",
      thinkingBorder: "#45475A",
      dimSeparator: "#585B70",
    },
  },
  {
    name: "Tokyo Night Storm",
    colors: {
      primary: "#7AA2F7",
      planMode: "#BB9AF7",
      selection: "#A9B1D6",
      thinking: "#BB9AF7",
      success: "#9ECE6A",
      error: "#F7768E",
      info: "#7AA2F7",
      background: "#24283B",
      surface: "#1F2335",
      dialogSurface: "#1A1B2E",
      thinkingBorder: "#3B4261",
      dimSeparator: "#565F89",
    },
  },
  {
    name: "Dracula",
    colors: {
      primary: "#BD93F9",
      planMode: "#FF79C6",
      selection: "#F8F8F2",
      thinking: "#FF79C6",
      success: "#50FA7B",
      error: "#FF5555",
      info: "#BD93F9",
      background: "#282A36",
      surface: "#44475A",
      dialogSurface: "#21222C",
      thinkingBorder: "#6272A4",
      dimSeparator: "#6272A4",
    },
  },
  {
    name: "Nord",
    colors: {
      primary: "#88C0D0",
      planMode: "#B48EAD",
      selection: "#D8DEE9",
      thinking: "#B48EAD",
      success: "#A3BE8C",
      error: "#BF616A",
      info: "#88C0D0",
      background: "#2E3440",
      surface: "#3B4252",
      dialogSurface: "#242933",
      thinkingBorder: "#4C566A",
      dimSeparator: "#616E88",
    },
  },
  {
    name: "One Dark",
    colors: {
      primary: "#61AFEF",
      planMode: "#C678DD",
      selection: "#ABB2BF",
      thinking: "#C678DD",
      success: "#98C379",
      error: "#E06C75",
      info: "#61AFEF",
      background: "#282C34",
      surface: "#21252B",
      dialogSurface: "#1B1D23",
      thinkingBorder: "#3B4048",
      dimSeparator: "#5C6370",
    },
  },
  {
    name: "Gruvbox Dark",
    colors: {
      primary: "#83A598",
      planMode: "#D3869B",
      selection: "#EBDBB2",
      thinking: "#D3869B",
      success: "#B8BB26",
      error: "#FB4934",
      info: "#83A598",
      background: "#282828",
      surface: "#3C3836",
      dialogSurface: "#1D2021",
      thinkingBorder: "#504945",
      dimSeparator: "#7C6F64",
    },
  },
  {
    name: "Solarized Dark",
    colors: {
      primary: "#268BD2",
      planMode: "#D33682",
      selection: "#93A1A1",
      thinking: "#D33682",
      success: "#859900",
      error: "#DC322F",
      info: "#268BD2",
      background: "#002B36",
      surface: "#073642",
      dialogSurface: "#00212B",
      thinkingBorder: "#586E75",
      dimSeparator: "#657B83",
    },
  },
  {
    name: "Everforest Dark",
    colors: {
      primary: "#7FBBB3",
      planMode: "#D699B6",
      selection: "#D3C6AA",
      thinking: "#D699B6",
      success: "#A7C080",
      error: "#E67E80",
      info: "#7FBBB3",
      background: "#2D353B",
      surface: "#343F44",
      dialogSurface: "#232A2E",
      thinkingBorder: "#4B565C",
      dimSeparator: "#859289",
    },
  },
  {
    name: "Monokai Pro",
    colors: {
      primary: "#78DCE8",
      planMode: "#AB9DF2",
      selection: "#FCFCFA",
      thinking: "#AB9DF2",
      success: "#A9DC76",
      error: "#FF6188",
      info: "#78DCE8",
      background: "#2D2A2E",
      surface: "#363537",
      dialogSurface: "#221F22",
      thinkingBorder: "#5B595C",
      dimSeparator: "#727072",
    },
  },
  {
    name: "Ayu Dark",
    colors: {
      primary: "#73D0FF",
      planMode: "#D2A6FF",
      selection: "#D9D7CE",
      thinking: "#D2A6FF",
      success: "#AAD94C",
      error: "#F26D78",
      info: "#73D0FF",
      background: "#0A0E14",
      surface: "#131721",
      dialogSurface: "#07090E",
      thinkingBorder: "#2D3640",
      dimSeparator: "#4B5563",
    },
  },
  {
    name: "Rosé Pine Moon",
    colors: {
      primary: "#31748F",
      planMode: "#C4A7E7",
      selection: "#E0DEF4",
      thinking: "#C4A7E7",
      success: "#3E8FB0",
      error: "#EB6F92",
      info: "#31748F",
      background: "#232136",
      surface: "#2A273F",
      dialogSurface: "#1C1A2E",
      thinkingBorder: "#393552",
      dimSeparator: "#6E6A86",
    },
  },
];

export const DEFAULT_THEME =
  THEMES.find((t) => t.name === "Nightfox") || THEMES[0]!;
