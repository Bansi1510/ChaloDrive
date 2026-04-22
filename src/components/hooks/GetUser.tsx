"use client"
import useGetUserData from '@/app/hooks/useGetUserData';
import { useSession } from 'next-auth/react'
import React from 'react'

const GetUser = () => {
  const { status } = useSession();
  useGetUserData(status == "authenticated")
  return null;
}

export default GetUser;
