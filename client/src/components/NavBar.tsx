import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/logo.png";
import { siteName } from "../config/WebSite";
import { FaRegUser } from "react-icons/fa";
import { IoLogoWechat } from "react-icons/io5";
import { AiOutlineGlobal } from "react-icons/ai";

const NavBar = () => {
  const location = useLocation();

  return (
    <main className="px-5 bg-[#151E27] fixed h-12 w-full flex items-center justify-between z-50 border-2 border-blue-500">
      <section className="flex items-center gap-3">
        <Link to="/" className="mr-5 flex items-center gap-3">
          <img src={Logo} className="h-8 w-8" alt="Logo"></img>
          <h1 className="text-lg text-[#8D65DE] font-extrabold">{siteName}</h1>
        </Link>
        <Link
          to="/chat"
          className={`text-stone-300 hover:text-[#a970ff] h-7 w-14 flex gap-1 justify-center items-center ${location.pathname === "/chat" && "text-[#a970ff]"}`}
        >
          <AiOutlineGlobal />
          <h1 className="text-sm font-semibold">Chat</h1>
        </Link>
        <Link
          to="/community"
          className={`text-stone-300 hover:text-[#a970ff] h-7 w-14 flex gap-1 justify-center items-center ${location.pathname === "/community" && "text-[#a970ff]"}`}
        >
          <IoLogoWechat />
          <h1 className="text-sm font-semibold">Community</h1>
        </Link>
        {/* Add More Nav Options here */}
      </section>
      <section className="flex items-center justify-center h-8">
        {/* Make Search Bar Workable */}
        <input
          type="text"
          name="text"
          className="input text-[#f7f7f8] mr-[1px] p-[10px] outline-none w-64 h-full bg-[#151E27] transition-all duration-200 ease rounded-l border-[1px] border-white focus:border-[2px] focus:border-[#a970ff] focus:bg-[#0e0e10]"
          placeholder="Search"
        ></input>
        <button className="h-full bg-gray-800 rounded-r-lg flex items-center justify-center w-10 cursor-pointer hover:bg-gray-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="22"
          >
            <path
              d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"
              fill="#efeff1"
            ></path>
          </svg>
        </button>
      </section>
      <section className="flex items-center gap-3">
        <Link
          to="/login"
          className="h-7 w-14 bg-[#263846] hover:bg-[#363846] rounded flex justify-center items-center text-slate-300 hover:text-white"
        >
          <h1 className="text-sm font-semibold">Log In</h1>
        </Link>
        <Link
          to="/register"
          className="h-7 w-[4.2rem] bg-[#30146D] hover:bg-[#451B9E] rounded flex justify-center items-center text-slate-300 hover:text-white"
        >
          <h1 className="text-sm font-semibold">Sign Up</h1>
        </Link>
        <FaRegUser />
      </section>
    </main>
  );
};

export default NavBar;
