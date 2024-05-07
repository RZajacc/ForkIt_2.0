import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import hungry from "/hungry.svg";

// Add link icon
document.querySelector("link")!.href = hungry;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
