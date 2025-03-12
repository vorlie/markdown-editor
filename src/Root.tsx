// src/Root.tsx
import { useState, useEffect } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { getTheme } from "./theme";
import App from "./App";

function Root() {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [mode, setMode] = useState<"light" | "dark">(
    prefersDark ? "dark" : "light"
  );

  useEffect(() => {
    const listener = (e: MediaQueryListEvent) =>
      setMode(e.matches ? "dark" : "light");
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", listener);
    return () =>
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", listener);
  }, []);

  return (
    <ThemeProvider theme={getTheme(mode)}>
      <CssBaseline />
      <App mode={mode} setMode={setMode} />
    </ThemeProvider>
  );
}

export default Root;
