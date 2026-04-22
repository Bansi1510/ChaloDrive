"use client";

import { useState } from "react";
import { Mail, ShieldCheck, BadgeCheck, LogOut, Car } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { IUser } from "@/models/user.model";
import { useDispatch } from "react-redux";
import { setUserData } from "@/redux/Slices/userSlice";
import { signOut } from "next-auth/react";

type Props = {
  userData: IUser;
};

const UserProfile = ({ userData }: Props) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    await signOut({ redirect: false })
    setOpen(false)
    dispatch(setUserData(null))
  }
  if (!userData) {
    return <div className="w-10 h-10 rounded-full bg-gray-300" />;
  }
  return (
    <div className="relative">

      {/* Avatar Button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold border-2 border-white shadow-md hover:bg-blue-600 transition"
      >
        {userData?.name?.charAt(0)?.toUpperCase()}
      </button>

      {/* Dropdown */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className={`
            mt-3 w-full md:w-80
            md:absolute md:right-0 md:top-full md:mt-3
            bg-white rounded-xl border border-gray-200 shadow-lg p-4 z-50
          `}
        >

          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">
                {userData?.name?.charAt(0)?.toUpperCase()}
              </div>

              <div>
                <p className="text-sm font-medium text-gray-800">
                  {userData?.name}
                </p>
                <p className="text-sm text-gray-500 truncate w-40">
                  {userData?.email}
                </p>
              </div>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <div className="border-t border-gray-100 mb-3"></div>

          {/* Info */}
          <div className="space-y-3 text-sm">

            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-green-500" />
              <span className="text-gray-600">Email</span>
              <span className="ml-auto text-gray-800 truncate max-w-[140px]">
                {userData?.email}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <ShieldCheck className="w-4 h-4 text-purple-500" />
              <span className="text-gray-600">Role</span>
              <span className="ml-auto text-gray-800 capitalize">
                {userData?.role}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <BadgeCheck
                className={`w-4 h-4 ${userData?.isEmailVerified
                  ? "text-green-500"
                  : "text-red-500"
                  }`}
              />
              <span className="text-gray-600">Verified</span>
              <span
                className={`ml-auto font-medium ${userData?.isEmailVerified
                  ? "text-green-600"
                  : "text-red-600"
                  }`}
              >
                {userData?.isEmailVerified ? "Yes" : "No"}
              </span>
            </div>

          </div>

          {/* Divider */}
          <div className="border-t border-gray-100 my-3"></div>

          {/* Actions */}
          <div className="space-y-2 text-sm">

            {/* Become Driver */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => router.push("/become-driver")}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-50 transition"
            >
              <Car className="w-4 h-4 text-blue-500" />
              <span className="text-gray-700 font-medium">
                Become a Driver
              </span>
            </motion.button>

            {/* Logout */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50 transition"
            >
              <LogOut className="w-4 h-4 text-red-500" />
              <span className="text-red-600 font-medium">
                Logout
              </span>
            </motion.button>

          </div>
        </motion.div>
      )}
    </div>
  );
};

export default UserProfile;