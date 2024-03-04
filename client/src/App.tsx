import "./App.css";
import GlobalChat from "./pages/GlobalChat";
import RootPage from "./pages/RootPage";
import Rules from "./pages/Rules";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Forum from "./pages/Forum";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootPage />} />
      <Route path="/chat" element={<GlobalChat />} />
      <Route path="/rules" element={<Rules />} />
      <Route path="/community" element={<Forum />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
