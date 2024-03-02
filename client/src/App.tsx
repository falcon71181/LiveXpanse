import "./App.css";
import GlobalChat from "./pages/GlobalChat";
import RootPage from "./pages/RootPage";
import Rules from "./pages/Rules";
import Register from "./pages/Register";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootPage />} />
      <Route path="/chat" element={<GlobalChat />} />
      <Route path="/rules" element={<Rules />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
