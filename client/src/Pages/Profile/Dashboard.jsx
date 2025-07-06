import React, { useEffect, useState } from "react"
import {
    Users,
    Package,
    TrendingUp,
    Calendar,
    BarChart3,
    Settings,
    Bell,
    Menu,
    X,
} from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import Main_logo from '../../assets/Main-logo(1).png'
import Overview from "./DashComponent/Overview"
import User from "./DashComponent/User"
import Items from "./DashComponent/Items"
import Events from "./DashComponent/Events"
import Analytics from "./DashComponent/Analytics"

import default_user_image from '../../assets/Default_user_image.jpeg'
import { useAuth } from '../../context/authContext'
import toast from 'react-hot-toast'
import axios from "axios"



export default function SwapCircleDashboard() {
    const [activeTab, setActiveTab] = useState("overview")
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);


    const { PORT, userId } = useAuth()
    const location = useLocation();
    const USER_ID = userId


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`${PORT}/api/users/get-user`, {
          withCredentials: true,
        })

        setUserData({
          ...data,
          avatar: data.avatar || default_user_image,
          coverImage: data.coverImage || default_banner_image,
          socialLinks: data.socialLinks || {
            instagram: "",
            twitter: "",
            facebook: "",
          },
        })
      } catch (error) {
        console.error("Error fetching user:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [PORT, userId])


    const navigationItems = [
        { id: "overview", label: "Overview", icon: <BarChart3 className="w-5 h-5" /> },
        { id: "users", label: "Users", icon: <Users className="w-5 h-5" /> },
        { id: "items", label: "Items", icon: <Package className="w-5 h-5" /> },
        { id: "events", label: "Events", icon: <Calendar className="w-5 h-5" /> },
        { id: "analytics", label: "Analytics", icon: <TrendingUp className="w-5 h-5" /> },
        { id: "settings", label: "Settings", icon: <Settings className="w-5 h-5" /> },
    ]

    const renderContent = () => {
        switch (activeTab) {
            case "overview":
                return <Overview />
            case "users":
                return <User />
            case "items":
                return <Items />
            case "events":
                return <Events />
            case "analytics":
                return <Analytics />
            case "settings":
                return (
                    <div className="bg-white rounded-2xl p-8 shadow-lg">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Community Settings</h2>
                        <p className="text-gray-600">Configure your SwapCircle community settings, permissions, and preferences.</p>
                    </div>
                )
            default:
                return <Overview />
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex">
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 lg:hidden" onClick={() => setSidebarOpen(false)} />
            )}

            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 w-64 mt-17 bg-white shadow-xl transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
            >
                <div className="flex items-center justify-between h-16 px-6 border-b border-orange-500">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                            <img src={Main_logo} className="w-9 h-9" alt="Logo" />
                        </div>
                        <span className="text-xl font-bold text-gray-800">Swap-Circle</span>
                    </div>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden text-gray-500 hover:text-gray-700 group transition-all duration-300"
                    >
                        <X className="w-6 h-6 text-orange-500 transform transition-transform duration-300 hover:rotate-90" />
                    </button>

                </div>

                <nav className="mt-8 px-4">
                    <div className="space-y-2">
                        {navigationItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => {
                                    setActiveTab(item.id)
                                    setSidebarOpen(false)
                                }}
                                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-colors ${activeTab === item.id
                                    ? "bg-orange-100 text-orange-700 font-medium"
                                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                                    }`}
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </button>
                        ))}
                    </div>
                </nav>

                {/* User Profile Section */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                            <Link to='/profile'>
                                <img
                                    src={userData ? `${PORT}${userData.avatar}` : default_user_image}
                                    alt="Profile"
                                    className={`w-10 h-10 rounded-full border-2 border-orange-300 cursor-pointer transition hover:scale-105 ${location.pathname.includes('/profile') ? 'ring-2 ring-blue-500' : ''
                                        }`}
                                    onError={(e) => {
                                        e.target.src = default_user_image;
                                    }}
                                /></Link>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-800 truncate">Admin User</p>
                            <p className="text-xs text-gray-500 truncate">admin@swapcircle.com</p>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600">
                            <Settings className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="w-full mt-13">
                {/* Top Header */}
                <header className="bg-white shadow-sm ">
                    <div className="flex items-center justify-between h-20 px-6 py-5">
                        <div className="flex items-center space-x-4">
                            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-500 hover:text-gray-700">
                                <Menu className="w-6 h-6 text-orange-600" />
                            </button>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800 capitalize">{activeTab}</h1>
                                <p className="text-sm text-gray-600">Manage your SwapCircle community</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <button className="relative p-2 text-gray-400 hover:text-gray-600">
                                <Bell className="w-6 h-6" />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>
                            <div className="w-11 h-11 rounded-full flex items-center justify-center">
                                <Link to='/profile'><img
                                    src={userData ? `${PORT}${userData.avatar}` : default_user_image}
                                    alt="Profile"
                                    className={`w-10 h-10 rounded-full border-2 border-orange-300 cursor-pointer transition hover:scale-105 ${location.pathname.includes('/profile') ? 'ring-2 ring-red-500' : ''
                                        }`}
                                    onError={(e) => {
                                        e.target.src = default_user_image;
                                    }}
                                /></Link>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-6">{renderContent()}</main>
            </div>
        </div>
    )
}
