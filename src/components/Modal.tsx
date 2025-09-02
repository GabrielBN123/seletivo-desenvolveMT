"use client"

import type React from "react"

import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect } from "react"

export default function Modal({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [])

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        navigate(-1)
      }
    }
    document.addEventListener("keydown", handleEsc)
    return () => document.removeEventListener("keydown", handleEsc)
  }, [navigate])

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => navigate(-1)}
      >
        <motion.div
          className="bg-gray-100 dark:bg-gray-800 bg-background border border-border rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto relative"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-muted hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all duration-200 flex items-center justify-center group"
            onClick={() => navigate(-1)}
            aria-label="Fechar modal"
          >
            <svg
              className="w-5 h-5 group-hover:scale-110 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
