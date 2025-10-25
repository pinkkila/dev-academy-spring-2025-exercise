import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import ThemeContextProvider from "@/contexts/ThemeContextProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeContextProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <App />
    </ThemeContextProvider>
  </StrictMode>,
);
