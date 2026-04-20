"use client";

import React, { useRef, useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { loginAPI, singupAPI, verifyEmailAPI } from "@/services/auth.api";

type Props = {
  open: boolean;
  onClose: () => void;
};

type AuthState = "login" | "signup" | "otp";

const Auth = ({ open, onClose }: Props) => {
  const [state, setState] = useState<AuthState>("login");


  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const { data } = useSession();
  console.log(data);
  const handleSignup = async () => {
    try {
      setLoading(true);
      await singupAPI(name, email, password);
      setState("otp")
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) setError(error.response?.data.message || "sign up error");
      else setError("Something went to wrong")
    } finally {
      setLoading(false);
    }
  }
  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };
  const handleVerifyEmail = async () => {
    setLoading(true);
    const otpstr = otp.join("");
    const isTrue = await verifyEmailAPI(email, otpstr);
    if (isTrue) setState("login")
    setOtp(["", "", "", "", "", ""]);
    setLoading(false);
  }

  const hangleLogin = async () => {
    setLoading(true);
    await loginAPI(email, password);
    setLoading(false);
  }
  if (!open) return null;

  const handleGoogleLogin = async () => {
    await signIn("google");
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
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={(e) => setPassword(e.target.value)}

              />

              <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition" onClick={hangleLogin} disabled={loading} >
                {!loading ? "Login" : "Logging"}
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
                  src="/google.png"
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
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email address"
                className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <p className="text-red-600">{error} </p>}
              <button
                onClick={handleSignup}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
                disabled={loading}
              >
                {!loading ? "send OTP" : " OTP sending..."}
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

              {/* OTP BOXES */}
              <div
                className="flex justify-center gap-3"
              >
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      inputsRef.current[index] = el;
                    }}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-12 h-14 text-center text-xl font-semibold rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                ))}
              </div>

              <button
                className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition"
                onClick={handleVerifyEmail}
              >
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
    </div >
  );
};

export default Auth;