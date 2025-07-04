"use client"

import { useState, useEffect } from "react"
import { X, CheckCircle, AlertCircle, Info } from "lucide-react"

const toasts = []
let toastId = 0

export const useToast = () => {
  const [, forceUpdate] = useState({})

  const toast = ({ title, description, variant = "default" }) => {
    const id = toastId++
    const newToast = { id, title, description, variant }
    toasts.push(newToast)

    forceUpdate({})

    setTimeout(() => {
      const index = toasts.findIndex((t) => t.id === id)
      if (index > -1) {
        toasts.splice(index, 1)
        forceUpdate({})
      }
    }, 5000)
  }

  return { toast }
}

export const Toaster = () => {
  const [, forceUpdate] = useState({})

  useEffect(() => {
    const interval = setInterval(() => forceUpdate({}), 100)
    return () => clearInterval(interval)
  }, [])

  const getToastIcon = (variant) => {
    switch (variant) {
      case "destructive":
        return <AlertCircle className="h-5 w-5" />
      case "success":
        return <CheckCircle className="h-5 w-5" />
      default:
        return <Info className="h-5 w-5" />
    }
  }

  const getToastStyles = (variant) => {
    switch (variant) {
      case "destructive":
        return "bg-gradient-to-r from-red-500 to-rose-500 text-white border-red-600"
      case "success":
        return "bg-gradient-to-r from-green-500 to-emerald-500 text-white border-green-600"
      default:
        return "bg-gradient-to-r from-orange-500 to-amber-500 text-white border-orange-600"
    }
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`p-4 rounded-xl shadow-2xl max-w-sm border backdrop-blur-sm animate-in slide-in-from-right-full ${getToastStyles(toast.variant)}`}
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">{getToastIcon(toast.variant)}</div>
            <div className="flex-1 min-w-0">
              {toast.title && <div className="font-semibold mb-1 text-sm">{toast.title}</div>}
              {toast.description && <div className="text-sm opacity-90 leading-relaxed">{toast.description}</div>}
            </div>
            <button
              onClick={() => {
                const index = toasts.findIndex((t) => t.id === toast.id)
                if (index > -1) {
                  toasts.splice(index, 1)
                  forceUpdate({})
                }
              }}
              className="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
