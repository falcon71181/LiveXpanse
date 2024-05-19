import "./App.css";
import GlobalChat from "./pages/GlobalChat";
import RootPage from "./pages/RootPage";
import Rules from "./pages/Rules";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Forum from "./pages/Forum";
import Profile from "./pages/Profile";
import { Post } from "./pages/Post";
import { Route, Routes } from "react-router-dom";
import StreamPage from "./pages/StreamPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootPage />} />
      <Route path="/chat" element={<GlobalChat />} />
      <Route path="/rules" element={<Rules />} />
      <Route path="/community/board" element={<Forum />} />
      <Route path="/community/post/:threadId" element={<Post />} />
      <Route path="/stream" element={<StreamPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
