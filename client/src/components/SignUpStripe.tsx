import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { siteName } from "../config/WebSite";

const SignUpStrip = () => {
  return (
    <main className="absolute bottom-0 m-0 pl-5 pr-12 w-full bg-[#451093] z-50 h-14 flex justify-between items-center rounded-t-md overflow-hidden">
      <div className="flex gap-3">
        <Link to="/" className="flex items-center gap-3">
          <img src={Logo} className="h-8 w-8" alt="Logo"></img>
        </Link>
        <span className="text-xl font-semibold text-white">Join the {siteName} community !</span>
        <span className="text-white text-lg">Discover the best live streams anywhere.</span>
      </div>
      <Link
        to="/register"
        className="h-7 w-[4.2rem] bg-white hover:bg-neutral-200 rounded flex justify-center items-center text-slate-300 hover:text-white"
      >
        <h1 className="text-sm font-semibold text-black">Sign Up</h1>
      </Link>

    </main>
  )
}

export default SignUpStrip;
