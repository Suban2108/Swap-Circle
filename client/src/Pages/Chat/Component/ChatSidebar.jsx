import { Users, MessageCircle, Settings, X } from "lucide-react"
import React, { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import axios from "axios"
import default_user_image from "../../../assets/Default_user_image.jpeg"
import { useAuth } from "@/context/authContext"

const ChatSidebar = ({
  selected,
  onSelect,
  isMobileMenuOpen = false,
  onCloseMobileMenu,
  userId: propUserId,
  apiUrl,
  Userdata, // Optional fallback
}) => {
  const location = useLocation()
  const { PORT, userId: contextUserId, token } = useAuth()

  const [userData, setUserData] = useState(Userdata || null)
  const [loading, setLoading] = useState(true)

  const effectiveUserId = propUserId || contextUserId

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (Userdata) {
          setLoading(false)
          return
        }

        const { data } = await axios.get(`${PORT}/api/users/get-user`,
          {
            headers:{
              Authorization: `Bearer ${token}`,
            }
          }
        )

        if (data && data._id) {
          setUserData(data)
        } else {
          throw new Error("User not found")
        }
      } catch (error) {
        console.error("ChatSidebar Auth Error:", error)
        window.location.href = "/login"
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [PORT, Userdata])

  const avatarSrc =
    userData?.avatar && !userData.avatar.startsWith("http")
      ? `${PORT}${userData.avatar}`
      : userData?.avatar || default_user_image

  return (
    <>
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={onCloseMobileMenu} />
      )}

      <div
        className={`
          fixed md:relative top-0 left-0 z-50 md:z-auto
          h-full w-20 flex-shrink-0
          flex flex-col items-center justify-between 
          bg-gradient-to-b from-orange-100 to-blue-100 
          dark:from-orange-900 dark:to-blue-900 
          py-4 md:py-6 space-y-4 md:space-y-6 
          border-r border-orange-200 dark:border-orange-800
          transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? "translate-x-0 mt-16" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <button
          onClick={onCloseMobileMenu}
          className="md:hidden absolute top-4 right-4 p-2 rounded-full bg-white dark:bg-slate-800 shadow-lg"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="space-y-4 md:space-y-6 mt-12 md:mt-0">
          <div className="w-13 h-13 bg-gradient-to-br from-orange-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
            <Link to="/profile">
              <img
                src={avatarSrc}
                alt="Profile"
                className={`w-11 h-11 rounded-full border-2 border-orange-300 cursor-pointer transition hover:scale-110 ${
                  location.pathname.includes("/dashboard") || location.pathname.includes("/profile")
                    ? "ring-2 ring-blue-500"
                    : ""
                }`}
                onError={(e) => {
                  e.currentTarget.src = default_user_image
                }}
              />
            </Link>
          </div>

          <div className="flex flex-col space-y-3 md:space-y-4">
            <button
              onClick={() => {
                onSelect("groups")
                if (onCloseMobileMenu) onCloseMobileMenu()
              }}
              className={`p-3 rounded-xl transition-all duration-200 hover:scale-110 shadow-md ${
                selected === "groups"
                  ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg"
                  : "bg-white dark:bg-slate-800 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-slate-700"
              }`}
              title="Groups"
            >
              <Users className="w-8 h-8" />
            </button>

            <button
              onClick={() => {
                onSelect("individuals")
                if (onCloseMobileMenu) onCloseMobileMenu()
              }}
              className={`p-3 rounded-xl transition-all duration-200 hover:scale-110 shadow-md ${
                selected === "individuals"
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                  : "bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-700"
              }`}
              title="Direct Messages"
            >
              <MessageCircle className="w-8 h-8" />
            </button>
          </div>
        </div>

        <div className="flex justify-center items-center rounded-full w-10 h-10 hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors">
          <Settings className="w-5 h-5" />
        </div>
      </div>
    </>
  )
}

export default ChatSidebar
