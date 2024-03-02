import "./App.css";
import GlobalChat from "./pages/GlobalChat";
import RootPage from "./pages/RootPage";
import Rules from "./pages/Rules";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootPage />} />
      <Route path="/chat" element={<GlobalChat />} />
      <Route path="/rules" element={<Rules />} />
    </Routes>
  );
}

export default App;
