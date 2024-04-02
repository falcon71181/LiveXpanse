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
                <main className="min-h-screen w-screen flex">
                    <NavBar />
                    <div className="bg-background_dark">
                        <App />
                    </div>
                </main>
            </AuthContextProvider>
        </BrowserRouter>
    </React.StrictMode>,
);
