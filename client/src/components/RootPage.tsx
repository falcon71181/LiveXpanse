import NavBar from "./NavBar";
import App from "../App";
import SignUpStrip from "./SignUpStripe";
import { useContext } from "react";
import { AuthContext } from "../context/auth";
import { AuthContextType } from "../types/auth";

const RootApp = () => {
  const { authUser, setAuthUser } = useContext(AuthContext) as AuthContextType;

  return (
    <main className="relative min-h-screen w-screen flex bg-background_dark">
      <NavBar />
      <App />
      {!authUser && (
        <SignUpStrip />
      )}
    </main>
  )
}

export default RootApp;
