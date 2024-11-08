import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { StyleProvider } from "@ant-design/cssinjs";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <StyleProvider hashPriority="high">
      <App />
    </StyleProvider>
  </StrictMode>
);
