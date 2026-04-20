import axios, { AxiosError } from "axios";
import { signIn } from "next-auth/react";

export const singupAPI = async (name: string, email: string, password: string): Promise<void> => {
  try {
    const { data } = await axios.post("/api/auth/register", { name, email, password });
    console.log(data);
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message ?? error.message);
    }
    throw new Error("Signup failed: An unexpected error occurred");
  }
}

export const loginAPI = async (email: string, password: string): Promise<void> => {
  try {
    const data = await signIn("credentials", { email, password, redirect: false });
    console.log(data);
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message ?? error.message);
    }
    throw new Error("login failed: An unexpected error occurred");
  }
}

export const verifyEmailAPI = async (email: string, otp: string): Promise<boolean> => {
  try {
    const { data } = await axios.post("/api/auth/verify-email", { email, otp });
    console.log(data);
    return true;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message ?? error.message);
    }
    throw new Error("login failed: An unexpected error occurred");
  }
}