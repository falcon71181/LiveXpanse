import { useContext, useState, SyntheticEvent, useEffect } from "react"
import { FaUserCheck, FaUserAlt, FaKey } from "react-icons/fa";
import { AuthContext } from "../context/auth";
import { AuthContextType } from "../types/auth";
import { UpdateFormData } from "../types/formData";

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
    <main className="relative w-full min-h-[90vh] pt-10 text-zinc-300 flex justify-center overflow-y-auto border border-red-300">
      <ProfileBackground />
      <div className="absolute mt-10 w-9/12 text-zinc-300 z-30 border border-grny">
        <div className="m-3 h-64 text-7xl font-semibold tracking-wider text-neutral-100 flex flex-col gap-4 justify-center items-center border border-red-300">
          <h1>Hi! I'm</h1>
          <h1>{localStorage.getItem("username")}</h1>
          <div className="mt-5 py-1.5 px-4 rounded-2xl bg-[#0365FF] flex tracking-normal gap-2 items-center">
            <FaUserCheck className="text-lg" />
            <span className="text-sm">Verified</span>
          </div>
        </div>
        {authUser && (
          <section className="my-3 mx-36 flex flex-col border border-cyan-300">
            <div className="text-neutral-100 text-4xl flex items-center gap-4">
              <FaUserAlt />
              <h1 className="font-semibold pb-2">Edit Profile</h1>
            </div>
            <div className="px-5 grid grid-cols-7 gap-2">
              <div className="px-5 py-2 col-span-5 flex flex-col gap-2 border border-green-300">
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
                  <div className="text-sm text-red-300">error</div>
                )}
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="inline-block cursor-pointer rounded-md bg-gray-700 px-4 py-3.5 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 active:scale-95"
                >
                  Save Changes
                </button>
              </div>
              <div className="p-3 col-span-2 border border-red-400">Avator Change option</div>
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
      <span className="absolute top-4 right-0 left-0 z-10 border border-red-300">
        <img src="./bg/sukuna.jpg" className="w-full h-full object-cover object-center brightness-[0.7]" />
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-[#162536]/80 to-[#162536] z-20"
      ></span>
    </div>
  )
}

export default Profile;
