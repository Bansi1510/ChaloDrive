"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";

type Props = {
  open: boolean;
  onClose: () => void;
};

type AuthState = "login" | "signup" | "otp";

const Auth = ({ open, onClose }: Props) => {
  const [state, setState] = useState<AuthState>("login");

  if (!open) return null;

  const handleGoogleLogin = () => {
    console.log("Google Login Clicked");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-[90%] max-w-md">

        <div className="bg-white/90 backdrop-blur-xl border border-gray-200 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.25)] p-8">

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-gray-400 hover:text-black transition"
          >
            <X size={24} />
          </button>

          {/* Heading */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {state === "login" && "Welcome Back 👋"}
              {state === "signup" && "Create Account 🚗"}
              {state === "otp" && "Verify OTP 🔐"}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {state === "login" && "Login to continue your journey"}
              {state === "signup" && "Join multi-vendor vehicle booking"}
              {state === "otp" && "Enter the code sent to your email"}
            </p>
          </div>

          {/* LOGIN */}
          {state === "login" && (
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Email address"
                className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition">
                Login
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-gray-300" />
                <span className="text-sm text-gray-400">or</span>
                <div className="flex-1 h-px bg-gray-300" />
              </div>

              {/* Google Button */}
              <button
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-xl hover:bg-gray-100 transition"
              >
                <Image
                  src="/google.png" // put google icon in public/google.png
                  alt="google"
                  width={20}
                  height={20}
                />
                <span className="font-medium text-gray-700">
                  Continue with Google
                </span>
              </button>

              <p className="text-sm text-center text-gray-500">
                Don’t have an account?{" "}
                <span
                  className="text-blue-600 cursor-pointer font-medium"
                  onClick={() => setState("signup")}
                >
                  Sign up
                </span>
              </p>
            </div>
          )}

          {/* SIGNUP */}
          {state === "signup" && (
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                type="email"
                placeholder="Email address"
                className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <button
                onClick={() => setState("otp")}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
              >
                Sign Up
              </button>

              <p className="text-sm text-center text-gray-500">
                Already have an account?{" "}
                <span
                  className="text-blue-600 cursor-pointer font-medium"
                  onClick={() => setState("login")}
                >
                  Login
                </span>
              </p>
            </div>
          )}

          {/* OTP */}
          {state === "otp" && (
            <div className="space-y-5 text-center">
              <input
                type="text"
                maxLength={6}
                placeholder="••••••"
                className="w-full p-4 text-center tracking-[10px] text-xl rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <button className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition">
                Verify OTP
              </button>

              <p className="text-sm text-gray-500">
                Didn’t receive code?{" "}
                <span className="text-blue-600 cursor-pointer font-medium">
                  Resend
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;