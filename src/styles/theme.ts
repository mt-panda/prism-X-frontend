import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    chatbot: {
      sidebar: string;
      chatBox: string;
    };
    darkcard: {
      main: string;
      contrastText: string;
    };
    cardshadow: {
      main: string;
    };
  }
  interface PaletteOptions {
    chatbot?: {
      sidebar: string;
      chatBox: string;
    };
    darkcard?: {
      main: string;
      contrastText: string;
    };
    cardshadow?: {
      main: string;
    };
  }

  interface PaletteColor {
    focus?: string;
    hover?: string;
    hero?: string;
  }

  interface SimplePaletteColorOptions {
    focus?: string;
    hover?: string;
    hero?: string;
  }
}

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1536,
    },
  },
  typography: {
      fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
      h1: { fontWeight: 700, fontSize: "3rem" },
      h2: { fontWeight: 600, fontSize: "2.25rem" },
      h3: { fontWeight: 600, fontSize: "1.75rem" },
    body1: { fontSize: "1rem", lineHeight: 1.6 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  palette: {
    primary: {
      main: "#F2F3EB",
      focus: "#378C92",
      hover: "#1F2540",
      hero: "#2D3239",
    },
    text: {
      primary: "#1F2540",
      secondary: "#5c5d5eff",
    },
    chatbot: {
      sidebar: "#6f6f6fff",
      chatBox: "#4747471a",
    },
    darkcard: {
      main: "#1C242C",
      contrastText: "#141921",
    },
    cardshadow: {
      main: "#242433ff",
    },
  },
});

export default theme;
