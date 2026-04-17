"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

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

            <Link
              href="/login"
              className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Login
            </Link>
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

          <Link
            href="/login"
            className="block mt-3 bg-blue-600 px-4 py-2 rounded-lg text-center"
            onClick={() => setIsOpen(false)}
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;