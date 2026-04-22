"use client"
import { setUserData } from '@/redux/Slices/userSlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetUserData = (status: boolean) => {
  const dispatch = useDispatch();
  return (
    useEffect(() => {
      if (!status) {
        return;
      }
      const getData = async () => {
        try {
          const { data } = await axios.get("/api/user/data");
          dispatch(setUserData(data));
        } catch (error) {
          console.log(error)
        }
      }
      getData();
    }, [status])
  )
}

export default useGetUserData;