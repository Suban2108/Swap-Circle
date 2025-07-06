import React, { useState, useEffect } from 'react'
import {
  Menu, X, Home, Info, Users, ChevronDown,
  LayoutListIcon, ListTodo, CalendarClock,
  UserRoundPen, BadgeInfoIcon,
  LayoutDashboard, CircleUser,
  LogOutIcon
} from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import Main_logo from '../../assets/Main-logo(1).png'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '../ui/dropdown-menu'

import default_user_image from '../../assets/Default_user_image.jpeg'
import default_banner_image from '../../assets/default_cover_banner_image.webp'
import { useAuth } from '../../context/authContext'
import toast from 'react-hot-toast'
import axios from 'axios'
import Cookies from 'js-cookie'

const AwesomeNavbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userData, setUserData] = useState(null)

  const { PORT, userId } = useAuth()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (userId) {
      setIsLoggedIn(true)
      fetchUser(userId)
    } else {
      setIsLoggedIn(false)
    }
  }, [userId])

  const fetchUser = async (userId) => {
    try {
      console.log("Fetching user info for ID:", userId)
      const { data } = await axios.get(`${PORT}/api/users/get-user`, { withCredentials: true })

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
      console.error("Failed to fetch user data:", error)
    }
  }

  const handleLogout = async () => {
    try {
      console.log("Logging out user...")
      await axios.post(`${PORT}/api/auth/logout`, {}, { withCredentials: true })

      Cookies.remove('token')
      Cookies.remove('userId')

      toast.success("Logged out successfully!")
      setIsLoggedIn(false)

      setTimeout(() => {
        window.location.href = "/"
      }, 1000)
    } catch (err) {
      toast.error("Logout failed")
      console.error("Logout error:", err)
    }
  }

  const isPathMatch = (paths) =>
    Array.isArray(paths) ? paths.includes(location.pathname) : location.pathname === paths

  const AnimatedNavLink = ({ to, icon: Icon, label }) => {
    const isActive = location.pathname === to
    return (
      <Link
        to={to}
        className={`relative flex items-center gap-1 px-2 py-1 text-sm font-medium transition-colors duration-300 ${isActive ? 'text-blue-600' : 'text-orange-600 hover:text-orange-800'} group`}
      >
        {Icon && <Icon className="w-4 h-4" />}
        {label}
        <span className={`absolute left-0 -bottom-[2px] h-[2px] bg-current transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
      </Link>
    )
  }

  return (
    <nav className={`fixed top-0 w-full z-100 border-b-3 border-orange-600 transition-all duration-500 ${scrolled ? 'bg-transparent backdrop-blur-md' : 'bg-background'}`}>
      <div className="max-w-[95%] mx-auto py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link to="/" className="relative group">
              <div className="w-[40px] h-[40px] bg-gradient-to-br from-orange-400 to-orange-600 rounded-[10px] flex items-center justify-center shadow-lg">
                <img src={Main_logo} className="w-[35px] h-[35px]" alt="Logo" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-[#077FBA] rounded-sm blur opacity-30 group-hover:opacity-60 transition" />
            </Link>
            <span className="text-2xl font-bold font-montserrat bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent">
              Swap-Circle
            </span>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-4">
            <AnimatedNavLink to="/" icon={Home} label="Home" />
            <AnimatedNavLink to="/groups" icon={Users} label="Groups" />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className={`relative flex items-center gap-1 px-2 py-1 text-sm font-medium transition-colors duration-300 group ${isPathMatch(['/items', '/events']) ? 'text-blue-600' : 'text-orange-600 hover:text-orange-800'}`}>
                  <LayoutListIcon className="w-4 h-4" />
                  Explore
                  <ChevronDown className="w-4 h-4" />
                  <span className={`absolute left-0 -bottom-[2px] h-[2px] bg-current transition-all duration-300 ${isPathMatch(['/items', '/events']) ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="z-200">
                <DropdownMenuItem asChild>
                  <Link to="/items"><ListTodo className="mr-2" />Items</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/events"><CalendarClock className="mr-2" />Events</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className={`relative flex items-center gap-1 px-2 py-1 text-sm font-medium transition-colors duration-300 group ${isPathMatch(['/about', '/contact']) ? 'text-blue-600' : 'text-orange-600 hover:text-orange-800'}`}>
                  <Info className="w-4 h-4" />
                  Info
                  <ChevronDown className="w-4 h-4" />
                  <span className={`absolute left-0 -bottom-[2px] h-[2px] bg-current transition-all duration-300 ${isPathMatch(['/about', '/contact']) ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="z-200">
                <DropdownMenuItem asChild>
                  <Link to="/about"><BadgeInfoIcon className="mr-2" />About</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/contact"><UserRoundPen className="mr-2" />Contact</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <img
                    src={`${PORT}${userData?.avatar}` || default_user_image}
                    alt="Profile"
                    className="w-10 h-10 rounded-full border-2 border-orange-300 cursor-pointer transition hover:scale-105"
                    onError={(e) => {
                      e.target.src = default_user_image
                    }}
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-30 z-100">
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard"><LayoutDashboard /> Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/profile"><CircleUser /> Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                    <LogOutIcon className='text-red-500' /> Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login?mode=signin">
                <Button
                  variant="default"
                  className="bg-gradient-to-r from-[#077FBA] to-orange-500 text-white"
                >
                  Sign up
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile toggle */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6 text-orange-600" /> : <Menu className="h-6 w-6 text-orange-600" />}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default AwesomeNavbar
