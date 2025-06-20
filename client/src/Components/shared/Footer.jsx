import React from 'react'
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  ArrowUp,
  Heart,
  Zap,
  Shield,
  Star
} from 'lucide-react'
import { Link } from 'react-router-dom'
import Main_logo from '../../assets/Main-logo(1).png'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'

const AwesomeFooter = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const footerLinks = {
    company: [
      { name: 'About Us', href: '#about' },
      { name: 'Our Story', href: '#story' },
      { name: 'Careers', href: '#careers' },
      { name: 'Press', href: '#press' }
    ],
    services: [
      { name: 'Features', href: '#features' },
      { name: 'Pricing', href: '#pricing' },
      { name: 'API', href: '#api' },
      { name: 'Documentation', href: '#docs' }
    ],
    support: [
      { name: 'Help Center', href: '#help' },
      { name: 'Contact Us', href: '#contact' },
      { name: 'Live Chat', href: '#chat' },
      { name: 'Status', href: '#status' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '#privacy' },
      { name: 'Terms of Service', href: '#terms' },
      { name: 'Cookie Policy', href: '#cookies' },
      { name: 'GDPR', href: '#gdpr' }
    ]
  }

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#', color: 'hover:text-blue-600' },
    { name: 'Twitter', icon: Twitter, href: '#', color: 'hover:text-blue-400' },
    { name: 'Instagram', icon: Instagram, href: '#', color: 'hover:text-pink-500' },
    { name: 'LinkedIn', icon: Linkedin, href: '#', color: 'hover:text-blue-700' },
    { name: 'YouTube', icon: Youtube, href: '#', color: 'hover:text-red-500' }
  ]

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#077FBA] via-orange-500 to-[#077FBA]" />
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#077FBA]/10 to-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-orange-500/10 to-[#077FBA]/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 space-y-20">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <Link to="/home" className="relative group">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                  <img src={Main_logo} className="w-[45px] h-[45px]" alt="Logo" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-[#077FBA] rounded-xl blur opacity-30 group-hover:opacity-60 transition" />
              </Link>
              <span className="text-2xl font-bold bg-gradient-to-r from-[#077FBA] to-orange-500 bg-clip-text text-transparent">
                Swap-Circle
              </span>
            </div>

            <p className="text-gray-300 max-w-md">
              Transform your digital presence with cutting-edge solutions. We help businesses build amazing experiences.
            </p>

            <div className="space-y-3 text-gray-300">
              <div className="flex items-center gap-3">
                <Mail className="text-[#077FBA]" />
                <span>india14925@gmail.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-orange-500" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="text-purple-500" />
                <span>India, IN</span>
              </div>
            </div>

            <div className="flex gap-3 pt-4 flex-wrap">
              <Badge icon={<Zap className="text-[#077FBA]" />} text="Fast" />
              <Badge icon={<Shield className="text-orange-500" />} text="Secure" />
              <Badge icon={<Star className="text-purple-500" />} text="Premium" />
            </div>
          </div>

          {/* Link Sections */}
          {['company', 'services', 'support'].map((key) => (
            <div key={key}>
              <h3 className="text-lg font-semibold text-white mb-4">{key.charAt(0).toUpperCase() + key.slice(1)}</h3>
              <ul className="space-y-3 text-gray-300">
                {footerLinks[key].map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center"
                    >
                      <span className="mr-2 w-0 group-hover:w-4 h-0.5 bg-gradient-to-r from-[#077FBA] to-orange-500 transition-all" />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm rounded-2xl">
          <CardContent className="p-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left space-y-1">
              <h3 className="text-2xl font-semibold">Stay Updated</h3>
              <p className="text-gray-300">Get the latest news and updates delivered to your inbox.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 text-white placeholder:text-gray-400 border-white/20 focus-visible:ring-[#077FBA]"
              />
              <Button className="bg-gradient-to-r from-[#077FBA] to-orange-500 text-white hover:scale-105 transition">
                Subscribe
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400 space-y-6 md:space-y-0">
          <div className="flex items-center gap-2">
            <span>© 2025 Brand. Made with</span>
            <Heart className="text-red-500 animate-pulse w-4 h-4" />
            <span>in India</span>
          </div>

          <div className="flex gap-4">
            {socialLinks.map(({ name, icon: Icon, href, color }) => (
              <a
                key={name}
                href={href}
                className={`w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-gray-400 ${color} hover:bg-white/10 hover:scale-110 transition`}
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          <div className="flex gap-6 text-sm">
            {footerLinks.legal.map((link) => (
              <a key={link.name} href={link.href} className="hover:text-white transition">
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll to Top */}
      <Button
        variant="ghost"
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-gradient-to-r from-[#077FBA] to-orange-500 text-white shadow-2xl hover:scale-110 transition z-50"
      >
        <ArrowUp className="w-5 h-5" />
      </Button>
    </footer>
  )
}

const Badge = ({ icon, text }) => (
  <div className="flex items-center space-x-2 px-3 py-1.5 bg-white/10 border border-white/10 rounded-full text-sm text-gray-300">
    {icon}
    <span>{text}</span>
  </div>
)


export default AwesomeFooter
