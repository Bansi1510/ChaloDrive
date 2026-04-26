"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  User,
  CreditCard,
  Landmark,
  CheckCircle2,
} from "lucide-react"
import { motion } from "framer-motion"

type BankForm = {
  name: string
  account: string
  ifsc: string
}

/* ✅ Move component OUTSIDE */
const InputField = ({
  label,
  value,
  onChange,
  Icon,
  upper = false,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  Icon: React.ElementType
  upper?: boolean
}) => {
  return (
    <div className="relative">
      <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
        {label}
      </label>

      <div className="relative mt-2">
        <Icon className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />

        <input
          value={value}
          onChange={(e) =>
            onChange(upper ? e.target.value.toUpperCase() : e.target.value)
          }
          className={`w-full pl-7 pt-2 pb-2 text-lg font-medium bg-transparent border-b border-neutral-300 focus:border-black focus:outline-none transition ${upper ? "uppercase tracking-widest" : ""
            }`}
        />
      </div>
    </div>
  )
}

export default function BankPage() {
  const router = useRouter()

  const [bank, setBank] = useState<BankForm>({
    name: "",
    account: "",
    ifsc: "",
  })

  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    console.log(bank)
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6f6f3] px-6 py-10">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >

        {/* Back */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 mb-6 text-sm text-neutral-500 hover:text-black"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {!submitted ? (
          <div className="bg-white rounded-3xl shadow-xl border border-neutral-100 px-8 py-8 space-y-8">

            <div>
              <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                Step 3 of 3
              </p>
              <h1 className="text-3xl font-bold text-neutral-900 mt-1">
                Bank Details
              </h1>
            </div>

            <div className="space-y-8">

              <InputField
                label="Account Holder Name"
                value={bank.name}
                onChange={(v) =>
                  setBank((p) => ({ ...p, name: v }))
                }
                Icon={User}
              />

              <InputField
                label="Account Number"
                value={bank.account}
                onChange={(v) =>
                  setBank((p) => ({ ...p, account: v }))
                }
                Icon={CreditCard}
              />

              <InputField
                label="IFSC Code"
                value={bank.ifsc}
                onChange={(v) =>
                  setBank((p) => ({ ...p, ifsc: v }))
                }
                Icon={Landmark}
                upper
              />

            </div>

            <button
              onClick={handleSubmit}
              className="w-full py-4 rounded-2xl bg-black text-white font-semibold text-sm"
            >
              Submit application
            </button>

          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-xl border border-neutral-100 px-10 py-12 text-center">

            <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-500" />
            </div>

            <h2 className="text-2xl font-bold text-neutral-900 mb-2">
              Onboarding Complete
            </h2>

            <button
              onClick={() => setSubmitted(false)}
              className="text-sm text-black underline"
            >
              Edit details
            </button>

          </div>
        )}
      </motion.div>
    </div>
  )
}