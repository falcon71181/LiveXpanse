import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import NavBar from "./components/NavBar.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <main className="h-[100vh] w-[100vw] flex border-2 border-red-400">
      <NavBar />
      <App />
    </main>
  </React.StrictMode>,
);
