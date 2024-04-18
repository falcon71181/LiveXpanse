import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/auth.tsx";
import RootApp from "./components/RootPage.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <RootApp />
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
