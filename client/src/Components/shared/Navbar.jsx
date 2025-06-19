import React, { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import Main_logo from '../../assets/Main-logo(1).png'

const AwesomeNavbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Features', href: '#features' },
    { name: 'Contact', href: '#contact' }
  ]

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-lg shadow-xl border-b border-gray-100' 
        : 'bg-white shadow-lg'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4 ">
        <div className="flex items-center justify-between">
          {/* Logo with enhanced styling */}
          <div className="relative group">
            <a 
              href='/home' 
              className="flex items-center space-x-3 transform hover:scale-105 transition-all duration-300"
            >
              <div className="relative">
                {/* Placeholder for logo - replace with your actual logo */}
                <div className="w-[50px] h-[50px] bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Link to='/home'><img src={Main_logo} className='w-[45px] h-[45px]' alt="" /></Link>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
              </div>
              <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-500 to-orange-500 bg-clip-text text-transparent">
                Swap-Circle
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                className="relative px-6 py-3 text-[#F25201] font-medium text-sm uppercase tracking-wide group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                  {item.name}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#077FBA] to-orange-500 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 origin-center"></div>
                <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-[#077FBA] group-hover:w-full group-hover:left-0 transition-all duration-300"></div>
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="relative px-6 py-3 bg-gradient-to-r from-[#077FBA] to-orange-500 text-white font-semibold rounded-full overflow-hidden group transform hover:scale-105 transition-all duration-300">
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-[#077FBA] translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative p-2 text-[#077FBA] hover:text-orange-500 transition-colors duration-300"
            >
              <div className="w-6 h-6">
                {isOpen ? (
                  <X className="w-6 h-6 transform rotate-0 transition-transform duration-300" />
                ) : (
                  <Menu className="w-6 h-6 transform rotate-0 transition-transform duration-300" />
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden overflow-hidden transition-all duration-500 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-6 space-y-2">
            {navItems.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                className="block px-4 py-3 text-[#F25201] font-medium rounded-lg hover:bg-gradient-to-r hover:from-[#077FBA]/10 hover:to-orange-500/10 hover:text-orange-500 transform hover:translate-x-2 transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="pt-4 px-4">
              <button className="w-full py-3 bg-gradient-to-r from-[#077FBA] to-orange-500 text-white font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#077FBA] via-orange-500 to-[#077FBA] opacity-20"></div>
    </nav>
  )
}

export default AwesomeNavbar