"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, UploadCloud } from "lucide-react"
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

  const handleNext = () => {
    if (!docs.aadhar || !docs.license || !docs.rc) {
      alert("Upload all documents")
      return
    }

    localStorage.setItem("documents", JSON.stringify(docs))
    router.push("/partner/vehicle/bank")
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
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
          <p className="step">step 2 of 3</p>
          <h2 className="title">Upload Documents</h2>
        </div>

        <div className="space-y-4">

          <div className="flex justify-between items-center border rounded-xl p-4">
            <p>Aadhaar</p>
            <label className="upload-btn">
              <UploadCloud size={18} />
              <input
                type="file"
                hidden
                onChange={(e) =>
                  setDocs((prev) => ({
                    ...prev,
                    aadhar: e.target.files?.[0] ?? null,
                  }))
                }
              />
            </label>
          </div>

          <div className="flex justify-between items-center border rounded-xl p-4">
            <p>License</p>
            <label className="upload-btn">
              <UploadCloud size={18} />
              <input
                type="file"
                hidden
                onChange={(e) =>
                  setDocs((prev) => ({
                    ...prev,
                    license: e.target.files?.[0] ?? null,
                  }))
                }
              />
            </label>
          </div>

          <div className="flex justify-between items-center border rounded-xl p-4">
            <p>RC</p>
            <label className="upload-btn">
              <UploadCloud size={18} />
              <input
                type="file"
                hidden
                onChange={(e) =>
                  setDocs((prev) => ({
                    ...prev,
                    rc: e.target.files?.[0] ?? null,
                  }))
                }
              />
            </label>
          </div>

        </div>

        <button onClick={handleNext} className="btn">
          Continue
        </button>
      </div>
    </motion.div>
  )
}

export default Document;