"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, UploadCloud, CheckCircle2 } from "lucide-react"
import { motion } from "framer-motion"

type DocumentState = {
  aadhar: File | null
  license: File | null
  rc: File | null
}

const Document: React.FC = () => {
  const router = useRouter()

  const [docs, setDocs] = useState<DocumentState>({
    aadhar: null,
    license: null,
    rc: null,
  })

  useEffect(() => {
    if (!localStorage.getItem("vehicle")) {
      router.push("/partner/boarding/vehicle")
    }
  }, [router])

  const handleSubmit = () => {
    console.log(docs)
    router.push("/partner/boarding/bank")
  }

  const uploadBox = (
    label: string,
    key: keyof DocumentState
  ) => {
    const file = docs[key]

    return (
      <div className="border border-neutral-200 rounded-2xl p-5 flex items-center justify-between hover:border-neutral-400 transition">

        {/* Left */}
        <div>
          <p className="text-sm font-semibold text-neutral-800">
            {label}
          </p>
          <p className="text-xs text-neutral-400 mt-1">
            {file ? file.name : "Upload document"}
          </p>
        </div>

        {/* Right */}
        <label className="cursor-pointer flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-black transition">
          {file ? (
            <CheckCircle2 className="w-5 h-5 text-green-500" />
          ) : (
            <UploadCloud className="w-5 h-5" />
          )}

          <span>{file ? "Uploaded" : "Upload"}</span>

          <input
            type="file"
            hidden
            onChange={(e) =>
              setDocs((prev) => ({
                ...prev,
                [key]: e.target.files?.[0] ?? null,
              }))
            }
          />
        </label>
      </div>
    )
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

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-neutral-100 px-8 py-8 space-y-8">

          {/* Header */}
          <div>
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
              Step 2 of 3
            </p>
            <h1 className="text-3xl font-bold text-neutral-900 mt-1">
              Upload Documents
            </h1>
            <p className="text-sm text-neutral-400 mt-1">
              Add required documents to continue
            </p>
          </div>

          {/* Upload Sections */}
          <div className="space-y-4">
            {uploadBox("Aadhaar Card", "aadhar")}
            {uploadBox("Driving License", "license")}
            {uploadBox("RC (Registration Certificate)", "rc")}
          </div>

          {/* CTA */}
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

export default Document