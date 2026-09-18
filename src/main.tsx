import React from "react";
import ReactDOM from "react-dom/client";
import "./fonts.css";
import "./styles.css";
import App from "./App";
import "./responsive.css";
import "./illustration-motion.css";
import { LanguageProvider, MotionProvider } from "./hooks/site";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LanguageProvider>
      <MotionProvider>
        <App />
      </MotionProvider>
    </LanguageProvider>
  </React.StrictMode>,
);
