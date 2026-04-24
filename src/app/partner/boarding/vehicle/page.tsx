"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"

type VehicleForm = {
  type: string
  model: string
  number: string
}

const BoardingPage: React.FC = () => {
  const router = useRouter()

  const [form, setForm] = useState<VehicleForm>({
    type: "",
    model: "",
    number: "",
  })

  const handleNext = () => {
    if (!form.type || !form.model || !form.number) {
      alert("Fill all fields")
      return
    }

    localStorage.setItem("vehicle", JSON.stringify(form))
    router.push("/partner/vehicle/document")
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen flex items-center justify-center bg-gray-50 relative"
    >

      <button
        onClick={() => router.back()}
        className="absolute top-5 left-5 p-2 rounded-full hover:bg-gray-100"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      <div className="card">
        <div className="text-center">
          <p className="step">step 1 of 3</p>
          <h2 className="title">Vehicle Details</h2>
        </div>

        <div className="space-y-4">
          <input
            className="input"
            placeholder="Vehicle Type"
            value={form.type}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, type: e.target.value }))
            }
          />
          <input
            className="input"
            placeholder="Vehicle Model"
            value={form.model}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, model: e.target.value }))
            }
          />
          <input
            className="input"
            placeholder="Vehicle Number"
            value={form.number}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, number: e.target.value }))
            }
          />
        </div>

        <button onClick={handleNext} className="btn">
          Continue
        </button>
      </div>
    </motion.div>
  )
}

export default BoardingPage