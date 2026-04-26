"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Bike,
  Car,
  Truck,
  Zap,
} from "lucide-react"
import { motion } from "framer-motion"

type VehicleType = "Bike" | "Car" | "Auto" | "Truck" | ""

const vehicleTypes = [
  { id: "Bike", icon: Bike, label: "Bike" },
  { id: "Car", icon: Car, label: "Car" },
  { id: "Auto", icon: Zap, label: "Auto" },
  { id: "Truck", icon: Truck, label: "Truck" },
]

const BoardingPage = () => {
  const router = useRouter()

  const [type, setType] = useState<VehicleType>("")
  const [model, setModel] = useState("")
  const [number, setNumber] = useState("")

  const handleSubmit = () => {
    console.log({ type, model, number })
    router.push("/partner/boarding/document")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6f6f3] px-6 py-10">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"   // ✅ Increased width
      >

        {/* Back */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 mb-6 text-sm text-neutral-500 hover:text-black"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-neutral-100 px-8 py-8 space-y-8">

          {/* Title */}
          <div>
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
              Step 1 of 3
            </p>
            <h1 className="text-3xl font-bold text-neutral-900">
              Vehicle Details
            </h1>
            <p className="text-sm text-neutral-400 mt-1">
              Add your vehicle to continue
            </p>
          </div>

          {/* Vehicle Type */}
          <div>
            <p className="text-xs font-semibold text-neutral-500 mb-3 uppercase tracking-wider">
              Select Vehicle
            </p>

            <div className="grid grid-cols-4 gap-3">
              {vehicleTypes.map((v) => {
                const Icon = v.icon
                const active = type === v.id

                return (
                  <button
                    key={v.id}
                    onClick={() => setType(v.id as VehicleType)}
                    className={`flex flex-col items-center justify-center py-5 rounded-2xl border transition-all duration-200 ${active
                      ? "bg-black text-white border-black scale-[1.05]"
                      : "bg-neutral-50 border-neutral-200 hover:bg-white hover:border-neutral-400"
                      }`}
                  >
                    <Icon className="w-6 h-6 mb-2" />
                    <span className="text-sm font-semibold">
                      {v.label}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Inputs */}
          <div className="space-y-8">

            {/* Model */}
            <div className="relative">
              <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                Vehicle Model
              </label>

              <input
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full pt-3 pb-2 text-lg font-medium bg-transparent border-b border-neutral-300 focus:border-black focus:outline-none transition"
              />
            </div>

            {/* Number */}
            <div className="relative">
              <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                Vehicle Number
              </label>

              <input
                value={number}
                onChange={(e) => setNumber(e.target.value.toUpperCase())}
                className="w-full pt-3 pb-2 text-lg font-medium bg-transparent border-b border-neutral-300 focus:border-black focus:outline-none uppercase tracking-widest transition"
              />
            </div>

          </div>

          {/* Button */}
          <button
            onClick={handleSubmit}
            className="w-full py-4 rounded-2xl bg-black text-white font-semibold text-sm tracking-wide hover:opacity-90 transition"
          >
            Continue
          </button>

        </div>
      </motion.div>
    </div>
  )
}

export default BoardingPage