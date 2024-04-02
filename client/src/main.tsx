import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import NavBar from "./components/NavBar.tsx";
import { BrowserRouter } from "react-router-dom";

import { AuthContextProvider } from "./context/auth.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <main className="min-h-screen w-screen flex bg-background_dark">
          <NavBar />
          <App />
        </main>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
