"use client"

import React, { useEffect, useState } from "react"
import ChatContainer from "./Component/ChatContainer"
import { useAuth } from "../../context/authContext"
import { Skeleton } from "../../Components/ui/skeleton"
import axios from 'axios'

export default function ChatPage() {
  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState(null) // <-- NEW
  const { PORT, userId } = useAuth()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (userId) {
          console.log("[ChatPage] userId from context:", userId)
          setLoading(false)
          return
        }

        const { data } = await axios.get(`${PORT}/api/users/get-user`)

        console.log("[ChatPage] Data fetched from cookie-based auth:", data.avatar)

        if (data && data._id) {
          setUserData(data)
          setLoading(false)
        } else {
          throw new Error("User not found in response")
        }
      } catch (error) {
        console.error("Auth failed. Redirecting to login...", error)
        window.location.href = "/login"
      }
    }

    fetchUser()
  }, [PORT, userId])

  if (loading || (!userId && !userData)) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-blue-50 dark:from-orange-950 dark:via-slate-900 dark:to-blue-950">
        <div className="w-full max-w-4xl mx-auto p-4">
          <div className="flex h-[600px] bg-white dark:bg-slate-900 rounded-lg shadow-lg overflow-hidden">
            {/* Sidebar Skeleton */}
            <div className="w-16 bg-gradient-to-b from-blue-50 to-orange-50 dark:from-blue-950 dark:to-orange-900 border-r border-blue-200 dark:border-blue-800 p-4 space-y-4">
              <Skeleton className="w-8 h-8 rounded-full" />
              <Skeleton className="w-8 h-8 rounded-full" />
              <Skeleton className="w-8 h-8 rounded-full" />
            </div>

            {/* Chat List Skeleton */}
            <div className="w-80 bg-gradient-to-b from-blue-50 to-orange-50 dark:from-blue-950 dark:to-orange-900 border-r border-blue-200 dark:border-blue-800">
              <div className="p-4 border-b border-blue-200 dark:border-blue-800">
                <Skeleton className="h-6 w-24 mb-3" />
                <Skeleton className="h-10 w-full rounded-lg" />
              </div>
              <div className="p-2 space-y-2">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="p-3 rounded-xl bg-white/50 dark:bg-slate-800/50">
                    <div className="flex items-center space-x-3">
                      <Skeleton className="w-12 h-12 rounded-full" />
                      <div className="flex-1 space-y-2">
                        <div className="flex justify-between">
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-3 w-12" />
                        </div>
                        <Skeleton className="h-3 w-32" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Main Chat Window Skeleton */}
            <div className="flex-1 flex flex-col">
              <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-blue-50 to-orange-50 dark:from-blue-950 dark:to-orange-950">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Skeleton className="w-10 h-10 rounded-full" />
                    <div className="space-y-1">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Skeleton className="w-8 h-8 rounded-full" />
                    <Skeleton className="w-8 h-8 rounded-full" />
                    <Skeleton className="w-8 h-8 rounded-full" />
                  </div>
                </div>
              </div>

              <div className="flex-1 p-4 space-y-4 bg-gradient-to-b from-slate-50 to-white dark:from-slate-800 dark:to-slate-900">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}>
                    <div className="max-w-xs">
                      <Skeleton
                        className={`h-12 rounded-2xl ${i % 2 === 0 ? "rounded-bl-md" : "rounded-br-md"}`}
                        style={{ width: `${120 + Math.random() * 100}px` }}
                      />
                      <Skeleton className="h-3 w-16 mt-1" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-slate-200 dark:border-slate-700">
                <div className="flex items-center space-x-3">
                  <Skeleton className="w-10 h-10 rounded-full" />
                  <Skeleton className="flex-1 h-12 rounded-2xl" />
                  <Skeleton className="w-12 h-12 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <ChatContainer
      userId={userId || userData?._id}
      apiURL={PORT}
      user={userData}
    />
  )
}
