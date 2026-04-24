"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"

type BankForm = {
  name: string
  account: string
  ifsc: string
}

const BankPage: React.FC = () => {
  const router = useRouter()

  const [bank, setBank] = useState<BankForm>({
    name: "",
    account: "",
    ifsc: "",
  })

  useEffect(() => {
    if (!localStorage.getItem("documents")) {
      router.push("/partner/boarding/document")
    }
  }, [router])

  const handleSubmit = () => {
    if (!bank.name || !bank.account || !bank.ifsc) {
      alert("Fill all fields")
      return
    }

    alert("Submitted Successfully ✅")
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen flex items-center justify-center bg-gray-50 relative"
    >

      {/* Back Arrow */}
      <button
        onClick={() => router.back()}
        className="absolute top-5 left-5 p-2 rounded-full hover:bg-gray-100"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      <div className="card">
        <div className="text-center">
          <p className="step">step 3 of 3</p>
          <h2 className="title">Bank Details</h2>
        </div>

        <div className="space-y-4">
          <input
            className="input"
            placeholder="Account Holder"
            value={bank.name}
            onChange={(e) =>
              setBank((prev) => ({ ...prev, name: e.target.value }))
            }
          />
          <input
            className="input"
            placeholder="Account Number"
            value={bank.account}
            onChange={(e) =>
              setBank((prev) => ({ ...prev, account: e.target.value }))
            }
          />
          <input
            className="input"
            placeholder="IFSC"
            value={bank.ifsc}
            onChange={(e) =>
              setBank((prev) => ({ ...prev, ifsc: e.target.value }))
            }
          />
        </div>

        <button onClick={handleSubmit} className="btn">
          Submit
        </button>
      </div>
    </motion.div>
  )
}

export default BankPage