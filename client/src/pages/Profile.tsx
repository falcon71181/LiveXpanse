import { useContext, useState } from "react"
import { FaUserCheck, FaUserAlt, FaKey } from "react-icons/fa";

const Profile = () => {
  const [openChangePassword, setOpenChangePassword] = useState<boolean>(false);

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
                className="text-neutral-100 bg-slate-900 w-full h-12 rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800 placeholder-neutral-100 mb-2"
                placeholder="Email"
              />
              <h1 className="text-start text-xs text-gray-400 uppercase">Username</h1>
              <input
                type="text"
                className="text-neutral-100 bg-slate-900 w-full h-12 rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800 placeholder-neutral-100 mb-2"
                placeholder={localStorage.getItem("username") || "Anon"}
              />
              <h1 className="text-start text-xs text-gray-400 uppercase">Joined On</h1>
              <input
                type="text"
                className="text-neutral-100 bg-slate-900 w-full h-12 rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800 placeholder-neutral-400 mb-2 cursor-not-allowed"
                placeholder={Date.now().toString()}
                readOnly
              />
              <h1 className="text-start text-xs text-gray-400 uppercase">Current Password</h1>
              <input
                type="password"
                className="text-neutral-100 bg-slate-900 w-full h-12 rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800 placeholder-neutral-400 mb-2"
                placeholder="Your Current Password"
                required
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
                    required
                  />
                  <h1 className="text-start text-xs text-gray-400 uppercase">Confirm New Password</h1>
                  <input
                    type="password"
                    className="text-neutral-100 bg-slate-900 w-full h-12 rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800 placeholder-neutral-400 mb-2"
                    placeholder="Confirm New Password"
                    required
                  />
                </div>
              )}
              <button
                type="button"
                className="inline-block cursor-pointer rounded-md bg-gray-700 px-4 py-3.5 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 active:scale-95"
              >
                Save Changes
              </button>
            </div>
            <div className="p-3 col-span-2 border border-red-400">Avator Change option</div>
          </div>
        </section>
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
