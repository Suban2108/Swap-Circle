import React, { useState, useEffect } from 'react'
import {
  Menu, X, Home, Info, Users, ChevronDown,
  LayoutListIcon, ListTodo, CalendarClock,
  UserRoundPen, BadgeInfoIcon,
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
import { useAuth } from '../../context/authContext'
import toast from 'react-hot-toast'

const AwesomeNavbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [profileImage, setProfileImage] = useState(null)

  const { token } = useAuth()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsLoggedIn(!!token)
  }, [token])

  useEffect(() => {
    const img = localStorage.getItem('profileImage')
    if (img) setProfileImage(img)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('profileImage')
    localStorage.removeItem('userId')

    toast.success('Logged Out successful! Redirecting...')
    setTimeout(() => {
      setIsLoggedIn(false)
      window.location.href = '/'
    }, 1500)
  }

  const isPathMatch = (paths) =>
    Array.isArray(paths) ? paths.includes(location.pathname) : location.pathname === paths

  const AnimatedNavLink = ({ to, icon: Icon, label }) => {
    const isActive = location.pathname === to
    return (
      <Link
        to={to}
        className={`relative flex items-center gap-1 px-2 py-1 text-sm font-medium transition-colors duration-300 ${
          isActive ? 'text-blue-600' : 'text-orange-600 hover:text-orange-800'
        } group`}
      >
        {Icon && <Icon className="w-4 h-4" />}
        {label}
        <span
          className={`absolute left-0 -bottom-[2px] h-[2px] bg-current transition-all duration-300 ${
            isActive ? 'w-full' : 'w-0 group-hover:w-full'
          }`}
        />
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
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent">
              Swap-Circle
            </span>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-4">
            <AnimatedNavLink to="/" icon={Home} label="Home" />
            <AnimatedNavLink to="/groups" icon={Users} label="Groups" />

            {/* Explore Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={`relative flex items-center gap-1 px-2 py-1 text-sm font-medium transition-colors duration-300 group ${
                    isPathMatch(['/items', '/events']) ? 'text-blue-600' : 'text-orange-600 hover:text-orange-800'
                  }`}
                >
                  <LayoutListIcon className="w-4 h-4" />
                  Explore
                  <ChevronDown className="w-4 h-4" />
                  <span
                    className={`absolute left-0 -bottom-[2px] h-[2px] bg-current transition-all duration-300 ${
                      isPathMatch(['/items', '/events']) ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
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

            {/* Info Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={`relative flex items-center gap-1 px-2 py-1 text-sm font-medium transition-colors duration-300 group ${
                    isPathMatch(['/about', '/contact']) ? 'text-blue-600' : 'text-orange-600 hover:text-orange-800'
                  }`}
                >
                  <Info className="w-4 h-4" />
                  Info
                  <ChevronDown className="w-4 h-4" />
                  <span
                    className={`absolute left-0 -bottom-[2px] h-[2px] bg-current transition-all duration-300 ${
                      isPathMatch(['/about', '/contact']) ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
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
                    src={profileImage || default_user_image}
                    alt="Profile"
                    className={`w-10 h-10 rounded-full border-2 border-orange-300 cursor-pointer transition hover:scale-105 ${
                      location.pathname.includes('/dashboard') || location.pathname.includes('/profile') ? 'ring-2 ring-blue-500' : ''
                    }`}
                    onError={(e) => {
                      e.target.src = '/fallback.png'
                    }}
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-44 z-200">
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login?mode=signin">
                <Button
                  variant="default"
                  className={`bg-gradient-to-r from-[#077FBA] to-orange-500 text-white ${location.pathname === '/login' && location.search.includes('signup') ? 'ring-2 ring-offset-2 ring-blue-400' : ''}`}
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

        {/* Mobile nav */}
        {isOpen && (
          <div className="mt-4 md:hidden space-y-2">
            <Link to="/" onClick={() => setIsOpen(false)} className="flex px-4 py-2 text-sm font-medium text-orange-600 hover:underline">
              <Home className="w-4 h-4 mr-2" />
              Home
            </Link>

            <Link to="/groups" onClick={() => setIsOpen(false)} className="flex px-4 py-2 text-sm font-medium text-orange-600 hover:underline">
              <Users className="w-4 h-4 mr-2" />
              Groups
            </Link>

            <div className="px-4">
              <p className="text-sm font-semibold text-muted-foreground">Explore</p>
              <Link to="/items" onClick={() => setIsOpen(false)} className="block py-1 pl-6 text-sm text-orange-600 hover:underline">
                Items
              </Link>
              <Link to="/events" onClick={() => setIsOpen(false)} className="block py-1 pl-6 text-sm text-orange-600 hover:underline">
                Events
              </Link>
            </div>

            <div className="px-4">
              <p className="text-sm font-semibold text-muted-foreground">Info</p>
              <Link to="/about" onClick={() => setIsOpen(false)} className="block py-1 pl-6 text-sm text-orange-600 hover:underline">
                About
              </Link>
              <Link to="/contact" onClick={() => setIsOpen(false)} className="block py-1 pl-6 text-sm text-orange-600 hover:underline">
                Contact
              </Link>
            </div>

            <div className="px-4 pt-3">
              {isLoggedIn ? (
                <div className="space-y-1 text-sm mt-2">
                  <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block text-muted-foreground hover:text-primary">
                    Dashboard
                  </Link>
                  <Link to="/profile" onClick={() => setIsOpen(false)} className="block text-muted-foreground hover:text-primary">
                    Profile
                  </Link>
                  <button onClick={handleLogout} className="text-red-500 hover:underline">
                    Sign out
                  </button>
                </div>
              ) : (
                <Link to="/login?mode=signin">
                  <Button className="bg-gradient-to-r from-[#077FBA] to-orange-500 text-white w-full mt-2">
                    Sign up
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default AwesomeNavbar
