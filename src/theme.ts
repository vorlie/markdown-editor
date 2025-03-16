import { createTheme } from "@mui/material/styles";
import "highlight.js/styles/github-dark.css";

export const getTheme = (mode: "light" | "dark") =>
  createTheme({
    typography: {
      fontFamily: "Roboto, sans-serif",
    },
    palette: {
      mode, // Dynamic mode
      primary: { main: "#6750A4" },
      secondary: { main: "#625B71" },
      background:
        mode === "dark"
          ? { default: "#1C1B1F", paper: "#2C2B30" }
          : { default: "#F5F5F5", paper: "#FFFFFF" },
    },
    components: {
      MuiTextField: { styleOverrides: { root: { borderRadius: "12px" } } },
      MuiPaper: {
        styleOverrides: { root: { padding: "16px" } },
      },
    },
  });
