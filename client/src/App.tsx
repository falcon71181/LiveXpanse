import "./App.css";
import GlobalChat from "./pages/GlobalChat";
import RootPage from "./pages/RootPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootPage />} />
        <Route path="/chat" element={<GlobalChat />} />
      </Routes>
    </Router>
  );
}

export default App;
