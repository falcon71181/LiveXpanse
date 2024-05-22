import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import { siteName } from "../config/WebSite";
import { FaRegUser } from "react-icons/fa";
import { FaClipboardQuestion } from "react-icons/fa6";
import { AiOutlineGlobal } from "react-icons/ai";
import { MdForum } from "react-icons/md";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth";
import { AuthContextType } from "../types/auth";
import avatars from "../assets/avator/avators";

const NavBar = () => {
  const { authUser, setAuthUser } = useContext(AuthContext) as AuthContextType;
  const navigate = useNavigate();
  const location = useLocation();

  const logoutUser = () => {
    localStorage.clear();
    setAuthUser(null);
    navigate("/");
  }

  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(() => {
    const storedAvatar = localStorage.getItem("avatar");
    return storedAvatar !== null ? storedAvatar : null;
  });

  // TODO: try to make a context
  // XXX: not working using event listeners
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "avatar") {
        setSelectedAvatar(event.newValue);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // <section className="flex items-center justify-center h-8">
  //   {/* Make Search Bar Workable */}
  //   <input
  //     type="text"
  //     name="text"
  //     className="input text-[#f7f7f8] mr-[1px] p-[10px] outline-none w-72 h-full bg-[#151E27] transition-all duration-200 ease rounded-l border-[1px] border-white focus:border-[2px] focus:border-[#a970ff] focus:bg-[#0e0e10]"
  //     placeholder="Search"
  //   ></input>
  //   <button className="h-full bg-gray-800 rounded-r-lg flex items-center justify-center w-10 cursor-pointer hover:bg-gray-50">
  //     <svg
  //       xmlns="http://www.w3.org/2000/svg"
  //       viewBox="0 0 24 24"
  //       width="24"
  //       height="22"
  //     >
  //       <path
  //         d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"
  //         fill="#efeff1"
  //       ></path>
  //     </svg>
  //   </button>
  // </section>

  return (
    <main className="px-8 py-3 bg-[#151E27] fixed w-full flex items-center justify-between z-50 border-b border-gray-600">
      <section className="flex items-center gap-3 z-50">
        <Link to="/" className="mr-5 flex items-center gap-3">
          <img src={Logo} className="h-8 w-8" alt="Logo"></img>
          <h1 className="text-lg text-[#8D65DE] font-extrabold tracking-widest">
            {siteName}
          </h1>
        </Link>
        <Link
          to="/chat"
          className={`${location.pathname === "/chat" ? "text-[#a970ff]" : "text-stone-300"
            } mx-4 hover:text-[#a970ff] h-7 w-12 lg:w-14 flex gap-1 justify-center items-center`}
        >
          <div className="flex items-center justify-center gap-2">
            <AiOutlineGlobal />
            <h1 className="text-sm font-semibold">Chat</h1>
          </div>
        </Link>
        <Link
          to="/community/board"
          className={`${location.pathname.includes("/community")
            ? "text-[#a970ff]"
            : "text-stone-300"
            } mx-4 hover:text-[#a970ff] h-7 w-12 lg:w-14 flex gap-1 justify-center items-center`}
        >
          <div className="flex items-center gap-2">
            <MdForum />
            <h1 className="text-sm font-semibold">Community</h1>
          </div>
        </Link>
        <Link
          to="/rules"
          className={`${location.pathname === "/rules" ? "text-[#a970ff]" : "text-stone-300"
            } mx-4 hover:text-[#a970ff] w-12 lg:w-14 flex gap-1 justify-center items-center`}
        >
          <div className="flex items-center justify-center gap-2">
            <FaClipboardQuestion />
            <h1 className="text-sm font-semibold">Rules</h1>
          </div>
        </Link>
        {/* Add More Nav Options here */}
      </section>
      {authUser ? (
        <div className='flex gap-4'>

          <Link
            to="/profile"
            className="text-[#efeff1] hover:text-[#a970ff] flex items-center gap-2"
          >
            <img src={selectedAvatar ? avatars[selectedAvatar.split(",")[0] as string][Number(selectedAvatar.split(",")[1])] : avatars["one-piece"][0]} className="rounded-full size-8" />
            <div className="font-bold tracking-wider">
              {localStorage.getItem("username")}
            </div>
          </Link>
          <button onClick={logoutUser} className='border border-red-300 px-2 py-1 text-sm rounded-md text-white hover:bg-red-950'>
            Logout
          </button>
        </div>
      ) : (
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
          <FaRegUser color="white" />
        </section>
      )}
    </main>
  );
};

export default NavBar;
