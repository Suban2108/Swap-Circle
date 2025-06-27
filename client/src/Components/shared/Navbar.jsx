import React, { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
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

const AwesomeNavbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(true)

  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Features', href: '/features' },
    { name: 'Contact', href: '/contact' },
  ]

  const isActive = (href) => location.pathname === href || location.hash === href

  return (
    <nav
      className={`fixed top-0 w-full z-20 border-b-3 border-orange-600 transition-all duration-500 ${scrolled ? 'bg-transparent backdrop-blur-md' : 'bg-background'
        }`}
    >
      <div className="max-w-7xl mx-auto py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link to="/" className="relative group">
              <div className="w-[50px] h-[50px] bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                <img src={Main_logo} className="w-[45px] h-[45px]" alt="Logo" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-[#077FBA] rounded-xl blur opacity-30 group-hover:opacity-60 transition" />
            </Link>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent">
              Swap-Circle
            </span>
          </div>


          {/* Right Controls */}
          <div className="hidden md:flex items-center gap-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`group relative text-sm font-medium px-2 py-1 cursor-pointer transition-colors duration-300 ${isActive(item.href) ? 'text-blue-600 font-semibold' : 'text-orange-600 hover:text-orange-800'
                  }`}
              >
                {item.name}
                <span
                  className={`absolute left-0 -bottom-0.5 h-[2px] w-full transition-all duration-500 transform scale-x-0 group-hover:scale-x-100 origin-left ${isActive(item.href)
                    ? 'scale-x-100 bg-blue-500'
                    : 'bg-orange-600 group-hover:bg-orange-800'
                    }`}
                />
              </Link>
            ))}

            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <img
                    src="https://i.pravatar.cc/150?img=5"
                    alt="Profile"
                    className={`w-12 h-12 rounded-full border-2 ${location.pathname.includes('dashboard') || location.pathname.includes('profile')
                      ? 'border-orange-500 ring-2 ring-blue-400 ring-offset-2'
                      : 'border-orange-300'
                      } cursor-pointer transition hover:scale-105`}
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-44">
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setIsLoggedIn(false)} className="text-red-500">
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login?mode=signin">
                  <Button
                    variant="ghost"
                    className={`hover:text-orange-800 ${location.pathname === '/login' && location.search.includes('signin')
                      ? 'text-blue-600 underline underline-offset-4'
                      : 'text-orange-600'
                      }`}
                  >
                    Sign in
                  </Button>
                </Link>
                <Link to="/login?mode=signup">
                  <Button
                    variant="default"
                    className={`bg-gradient-to-r from-[#077FBA] to-orange-500 text-white ${location.pathname === '/login' && location.search.includes('signup')
                      ? 'ring-2 ring-offset-2 ring-blue-400'
                      : ''
                      }`}
                  >
                    Sign up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6 text-orange-600" /> : <Menu className="h-6 w-6 text-orange-600" />}
            </Button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="mt-4 md:hidden space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2 rounded-md text-sm font-medium transition ${isActive(item.href)
                  ? 'text-orange-600 underline underline-offset-4 font-semibold'
                  : 'text-muted-foreground hover:text-orange-600'
                  }`}
              >
                {item.name}
              </Link>
            ))}

            <div className="px-4 pt-3 flex items-center justify-between">
              {!isLoggedIn ? (
                <div className="flex gap-2">
                  <Link to="/login?mode=signup">
                    <Button className="bg-gradient-to-r from-[#077FBA] to-orange-500 text-white">
                      Sign up
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-1 text-sm mt-2">
                  <Link to="/dashboard" className="block text-muted-foreground hover:text-primary">
                    Dashboard
                  </Link>
                  <Link to="/profile" className="block text-muted-foreground hover:text-primary">
                    Profile
                  </Link>
                  <button
                    onClick={() => setIsLoggedIn(false)}
                    className="text-red-500 hover:underline"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default AwesomeNavbar
