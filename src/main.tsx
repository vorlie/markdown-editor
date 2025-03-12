import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./Root";

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <Root />
    </React.StrictMode>
  );
} else {
  console.error("Root element not found");
}
