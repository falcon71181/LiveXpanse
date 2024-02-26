import "./App.css";
import GlobalChat from "./pages/GlobalChat";
import RootPage from "./pages/RootPage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootPage />} />
      <Route path="/chat" element={<GlobalChat />} />
    </Routes>
  );
}

export default App;
