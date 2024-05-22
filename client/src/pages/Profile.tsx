import { useContext, useState, SyntheticEvent, useEffect } from "react"
import { FaUserCheck, FaUserAlt, FaKey, FaPen } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { AuthContext } from "../context/auth";
import { AuthContextType } from "../types/auth";
import { UpdateFormData } from "../types/formData";
import avatars from "../assets/avator/avators";
import Sukuna from "../assets/bg/sukuna.jpg";

const Profile = () => {
  const SERVER = import.meta.env.VITE_SERVER || "http://localhost:3333";

  const localStorage_email = localStorage.getItem("email") || "";
  const localStorage_username = localStorage.getItem("username") || "";

  const [defaultEmail, setDefaultEmail] = useState(localStorage_email);
  const [defaultUsername, setDefaultUsername] = useState(localStorage_username);
  const [joinedOn, setJoinedOn] = useState("");

  const [openChangePassword, setOpenChangePassword] = useState<boolean>(false);
  const { authUser } = useContext(AuthContext) as AuthContextType;

  const [currentPassword, setCurrentPassword] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState(defaultEmail as string);
  const [updatedUsername, setUpdatedUsername] = useState(defaultUsername as string);
  const [updatedPassword, setUpdatedPassword] = useState("");
  const [updatedConfirmPassword, setUpdatedConfirmPassword] = useState("");

  const [error, setError] = useState("");

  // handle user profile update
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const formData: UpdateFormData = {
        updatedUsername: updatedUsername,
        updatedEmail: updatedEmail,
        currentPassword: currentPassword,
        updatedPassword: updatedPassword,
        updatedConfirmPassword: updatedConfirmPassword,
      };
      const token = localStorage.getItem('token');

      if (!currentPassword) {
        setError("Enter your current password to update profile.");
        return;
      }

      const response = await fetch(`${SERVER}/users/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();

      // Check if the request was successful
      if (response.ok) {
        // Add data to local Storage
        if (result.username) {
          localStorage.setItem("username", result.username);
        }
        if (result.token) {
          localStorage.setItem("token", result.token);
        }
        if (result.email) {
          localStorage.setItem("email", result.email);
        }

        // redirecting to Home page after Login
        window.location.replace("/profile");
      } else {
        // Handle Login failure
        setError(result.error);
        console.error("Profile update failed");
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Error during updating profile:", error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        // TODO: make profile page public
        const response = await fetch(`${SERVER}/users/${localStorage.getItem("username")}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data)
        }

        if (response.ok) {
          setDefaultUsername(data.username);
          setDefaultEmail(data.email);
          const timestamp = parseInt(data.joinedOn);
          const date = new Date(timestamp);
          const messageDateTime = date.toLocaleString();
          setJoinedOn(messageDateTime);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [SERVER]);

  return (
    <main className="relative w-full min-h-[90vh] pt-10 text-zinc-300 flex justify-center overflow-y-auto">
      <ProfileBackground />
      <div className="absolute mt-10 w-9/12 text-zinc-300 z-30">
        <div className="m-3 h-64 text-7xl font-semibold tracking-wider text-neutral-100 flex flex-col gap-4 justify-center items-center">
          <h1>Hi! I'm</h1>
          <h1>{localStorage.getItem("username")}</h1>
          <div className="mt-5 py-1.5 px-4 rounded-2xl bg-[#0365FF] flex tracking-normal gap-2 items-center">
            <FaUserCheck className="text-lg" />
            <span className="text-sm">Verified</span>
          </div>
        </div>
        {authUser && (
          <section className="my-3 py-8 px-5 mx-36 flex flex-col border border-gray-600">
            <div className="px-5 py-3 text-neutral-100 text-4xl flex items-center gap-4">
              <FaUserAlt />
              <h1 className="font-semibold pb-2">Edit Profile</h1>
            </div>
            <div className="px-5 grid grid-cols-7 gap-2">
              <div className="px-5 py-2 col-span-5 flex flex-col gap-2">
                <h1 className="text-start text-xs text-gray-400 uppercase">Email address</h1>
                <input
                  type="email"
                  className="text-neutral-100 bg-slate-900 w-full h-12 rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800 placeholder-neutral-400 mb-2"
                  placeholder="Email"
                  defaultValue={localStorage.getItem("email") || ""}
                  value={updatedEmail}
                  onChange={(e) => setUpdatedEmail(e.target.value)}
                />
                <h1 className="text-start text-xs text-gray-400 uppercase">Username</h1>
                <input
                  type="text"
                  className="text-neutral-100 bg-slate-900 w-full h-12 rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800 placeholder-neutral-400 mb-2"
                  placeholder="Your username"
                  defaultValue={localStorage.getItem("username") || ""}
                  value={updatedUsername}
                  onChange={(e) => setUpdatedUsername(e.target.value)}
                />
                <h1 className="text-start text-xs text-gray-400 uppercase">Joined On</h1>
                <input
                  type="text"
                  className="text-neutral-100 bg-slate-900 w-full h-12 rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800 placeholder-neutral-400 mb-2 cursor-not-allowed"
                  placeholder={joinedOn}
                  readOnly
                />
                <h1 className="text-start text-xs text-gray-400 uppercase">Current Password</h1>
                <input
                  type="password"
                  className="text-neutral-100 bg-slate-900 w-full h-12 rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800 placeholder-neutral-400 mb-2"
                  placeholder="Your Current Password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <div className="flex gap-3 items-center text-gray-400 hover:text-neutral-100 w-fit cursor-pointer"
                  onClick={() => { setOpenChangePassword(!openChangePassword) }}>
                  <FaKey />
                  <h1 className="text-sm pb-1">Change Password</h1>
                </div>
                {openChangePassword && (
                  <div className="flex flex-col gap-2">
                    <h1 className="text-start text-xs text-gray-400 uppercase">New Password</h1>
                    <input
                      type="password"
                      className="text-neutral-100 bg-slate-900 w-full h-12 rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800 placeholder-neutral-400 mb-2"
                      placeholder="Your New Password"
                      value={updatedPassword}
                      onChange={(e) => setUpdatedPassword(e.target.value)}
                    />
                    <h1 className="text-start text-xs text-gray-400 uppercase">Confirm New Password</h1>
                    <input
                      type="password"
                      className="text-neutral-100 bg-slate-900 w-full h-12 rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800 placeholder-neutral-400 mb-2"
                      placeholder="Confirm New Password"
                      value={updatedConfirmPassword}
                      onChange={(e) => setUpdatedConfirmPassword(e.target.value)}
                    />
                  </div>
                )}
                {error && (
                  <div className="text-sm text-red-300">{error}</div>
                )}
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="inline-block cursor-pointer rounded-md bg-gray-700 px-4 py-3.5 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 active:scale-95"
                >
                  Save Changes
                </button>
              </div>
              <ChangeAvator />
            </div>
          </section>
        )}
      </div>
    </main>
  )
}

const ProfileBackground = () => {
  return (
    <div className="absolute h-[80vh] w-full blur-sm overflow-hidden">
      <span className="absolute top-4 right-0 left-0 z-10">
        <img src={Sukuna} className="w-full h-full object-cover object-center brightness-[0.7]" />
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-[#162536]/80 to-[#162536] z-20"
      ></span>
    </div>
  )
}

const ChangeAvator = () => {
  let currentAvatar;
  if (localStorage.getItem("avatar")) {
    currentAvatar = localStorage.getItem("avatar");
  } else {
    currentAvatar = null;
  }
  const [toggleAvatorMenu, setToggleAvatorMenu] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("one-piece");
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(currentAvatar);

  const handleToggle = () => {
    setToggleAvatorMenu(!toggleAvatorMenu);
  }

  const handleChangeAvatar = (key: number) => {
    const localStorageFormat = `${selectedCategory},${key}`;
    setSelectedAvatar(localStorageFormat);
    localStorage.setItem("avatar", localStorageFormat);
  }

  return (
    <div className="w-full p-3 pt-10 col-span-2 flex flex-col gap-10 items-center">
      <img src={selectedAvatar ? avatars[selectedAvatar.split(",")[0] as string][Number(selectedAvatar.split(",")[1])] : avatars["one-piece"][0]} className="rounded-full size-36" />
      <div onClick={handleToggle} className="px-5 py-3 rounded-2xl cursor-pointer flex items-center gap-3 bg-blue-700 hover:bg-blue-900 transition-all duration-200">
        <FaPen />
        <h1 className="font-semibold">Change Avator</h1>
      </div>
      {toggleAvatorMenu && (
        <section className="absolute flex items-center justify-center inset-0  z-50 w-full">
          <div className="relative p-5 min-h-[25rem] max-h-[60rem] max-w-[30rem] flex-grow items-center bg-[#162536] opacity-95 flex flex-col gap-5 rounded-xl border border-zinc-500">
            <IoMdClose onClick={handleToggle} className="absolute right-2 top-2 text-4xl cursor-pointer hover:scale-110 transform-gpu duration-500" />
            <div className="mr-8 mt-5 h-1/5 flex flex-wrap items-center justify-center gap-3">
              {Object.keys(avatars).map((anime) => (
                <span className={`${selectedCategory === anime ? "text-[#8D65DE] underline underline-offset-2" : "text-zinc-300 hover:text-[#8D65DE] hover:underline hover:underline-offset-2"} cursor-pointer text-sm`} onClick={() => setSelectedCategory(anime)}>#{anime}</span>
              ))}
            </div>
            <div className="h-4/5 p-5 flex gap-5 flex-wrap justify-center items-center">
              {selectedCategory ? (
                avatars[selectedCategory as string].map((animeImg: string, index) => (
                  <img key={index} src={animeImg} onClick={() => handleChangeAvatar(index)} className={`${Number(selectedAvatar?.split(",")[1]) === index && selectedCategory === selectedAvatar?.split(",")[0] ? 'scale-125 opacity-100' : 'opacity-50 hover:opacity-100 hover:scale-125'} rounded-full cursor-pointer size-16 transform-gpu duration-200`} />
                ))
              ) : (
                // TODO: find a way to get specific field (anime name)
                Object.values(avatars).flat().map((animeImg: string, index) => (
                  <img key={index} src={animeImg} />
                ))
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default Profile;
