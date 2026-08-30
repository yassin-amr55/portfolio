import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// Import order mirrors the original index.html <link> order — some rules
// with equal specificity are duplicated across files, and the later file is
// meant to win.
import "./styles/base.css";
import "./styles/aboutcontent.css";
import "./styles/homecontent.css";
import "./styles/projectscontent.css";
import "./styles/services.css";
import "./styles/contactcontent.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
