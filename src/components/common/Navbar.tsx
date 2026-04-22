"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import UserProfile from "../Home/UserProfile";

type Props = {
  onLogin: () => void;
};

const Navbar = ({ onLogin }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { userData } = useSelector((state: RootState) => state.user);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Vehicles", path: "/vehicles" },
    { name: "Vendors", path: "/vendors" },
    { name: "Bookings", path: "/bookings" },
    { name: "About", path: "/about" },
  ];
  return (
    <nav className="bg-[#0a0f1a] text-white fixed w-full z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Logo"
              width={45}
              height={45}
              className="object-contain"
            />
            <span className="ml-2 text-xl font-bold">
              ChaloDrive
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className="text-gray-300 hover:text-white transition duration-300"
              >
                {item.name}
              </Link>
            ))}

            {!userData ? (
              <button

                className="bg-blue-600 px-4 py-2 rounded-lg"
                onClick={onLogin}
              >
                Login
              </button>
            ) : (
              <div className="mt-3 flex justify-center">
                <UserProfile userData={userData} />
              </div>
            )}
          </div>

          {/* Mobile Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-900 px-4 pb-4">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className="block py-2 border-b border-gray-700 text-gray-300 hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}

          {!userData ? (
            <Link
              href="/login"
              className="bg-blue-600 px-4 py-2 rounded-lg"
              onClick={onLogin}
            >
              Login
            </Link>
          ) : (
            <div className="mt-3 flex justify-center">
              <UserProfile userData={userData} />
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;