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


const AwesomeFooter = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

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
        <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#077FBA] via-orange-500 to-[#077FBA]"></div>
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#077FBA]/10 to-orange-500/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-orange-500/10 to-[#077FBA]/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10">
                {/* Main Footer Content */}
                <div className="max-w-7xl mx-auto px-6 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">

                        {/* Brand Section */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="flex items-center space-x-3">
                                <div className="relative group">
                                    <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                                        <Link to='/home'><img src={Main_logo} className='w-[45px] h-[45px]' alt="" /></Link>
                                    </div>
                                    <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-[#077FBA] rounded-xl blur opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
                                </div>
                                <span className="text-2xl font-bold bg-gradient-to-r from-[#077FBA] to-orange-500 bg-clip-text text-transparent">
                                    Swap-Circle
                                </span>
                            </div>

                            <p className="text-gray-300 leading-relaxed max-w-md">
                                Transform your digital presence with our cutting-edge solutions.
                                We help businesses create amazing experiences that drive real results.
                            </p>

                            {/* Contact Info */}
                            <div className="space-y-3">
                                <div className="flex items-center space-x-3 group">
                                    <div className="w-10 h-10 bg-gradient-to-br from-[#077FBA]/20 to-[#077FBA]/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <Mail className="w-5 h-5 text-[#077FBA]" />
                                    </div>
                                    <span className="text-gray-300 group-hover:text-white transition-colors duration-300">india14925@gmail.com</span>
                                </div>

                                <div className="flex items-center space-x-3 group">
                                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500/20 to-orange-500/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <Phone className="w-5 h-5 text-orange-500" />
                                    </div>
                                    <span className="text-gray-300 group-hover:text-white transition-colors duration-300">+91 98765 43210</span>
                                </div>

                                <div className="flex items-center space-x-3 group">
                                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-purple-500/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <MapPin className="w-5 h-5 text-purple-500" />
                                    </div>
                                    <span className="text-gray-300 group-hover:text-white transition-colors duration-300">India, IN</span>
                                </div>
                            </div>

                            {/* Feature Badges */}
                            <div className="flex flex-wrap gap-3 pt-4">
                                <div className="flex items-center space-x-2 px-3 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
                                    <Zap className="w-4 h-4 text-[#077FBA]" />
                                    <span className="text-sm text-gray-300">Fast</span>
                                </div>
                                <div className="flex items-center space-x-2 px-3 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
                                    <Shield className="w-4 h-4 text-orange-500" />
                                    <span className="text-sm text-gray-300">Secure</span>
                                </div>
                                <div className="flex items-center space-x-2 px-3 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
                                    <Star className="w-4 h-4 text-purple-500" />
                                    <span className="text-sm text-gray-300">Premium</span>
                                </div>
                            </div>
                        </div>

                        {/* Links Sections */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-white relative">
                                Company
                                <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-[#077FBA] to-orange-500 mt-2"></div>
                            </h3>
                            <ul className="space-y-3">
                                {footerLinks.company.map((link) => (
                                    <li key={link.name}>
                                        <a
                                            href={link.href}
                                            className="text-gray-300 hover:text-white hover:translate-x-1 transform transition-all duration-300 flex items-center group"
                                        >
                                            <span className="w-0 h-0.5 bg-gradient-to-r from-[#077FBA] to-orange-500 group-hover:w-4 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-white relative">
                                Services
                                <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-[#077FBA] to-orange-500 mt-2"></div>
                            </h3>
                            <ul className="space-y-3">
                                {footerLinks.services.map((link) => (
                                    <li key={link.name}>
                                        <a
                                            href={link.href}
                                            className="text-gray-300 hover:text-white hover:translate-x-1 transform transition-all duration-300 flex items-center group"
                                        >
                                            <span className="w-0 h-0.5 bg-gradient-to-r from-[#077FBA] to-orange-500 group-hover:w-4 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-white relative">
                                Support
                                <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-[#077FBA] to-orange-500 mt-2"></div>
                            </h3>
                            <ul className="space-y-3">
                                {footerLinks.support.map((link) => (
                                    <li key={link.name}>
                                        <a
                                            href={link.href}
                                            className="text-gray-300 hover:text-white hover:translate-x-1 transform transition-all duration-300 flex items-center group"
                                        >
                                            <span className="w-0 h-0.5 bg-gradient-to-r from-[#077FBA] to-orange-500 group-hover:w-4 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Newsletter Section */}
                    <div className="mt-16 p-8 bg-gradient-to-r from-[#077FBA]/10 to-orange-500/10 rounded-2xl border border-white/10 backdrop-blur-sm">
                        <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
                            <div className="text-center md:text-left">
                                <h3 className="text-2xl font-bold text-white mb-2">Stay Updated</h3>
                                <p className="text-gray-300">Get the latest news and updates delivered to your inbox.</p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#077FBA]/50 focus:border-[#077FBA] transition-all duration-300"
                                />
                                <button className="px-8 py-3 bg-gradient-to-r from-[#077FBA] to-orange-500 text-white font-semibold rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300 whitespace-nowrap">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-white/10 bg-black/20 backdrop-blur-sm">
                    <div className="max-w-7xl mx-auto px-6 py-8">
                        <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">

                            {/* Copyright */}
                            <div className="flex items-center space-x-2 text-gray-300">
                                <span>© 2025 Brand. Made with</span>
                                <Heart className="w-4 h-4 text-red-500 animate-pulse" />
                                <span>in India</span>
                            </div>

                            {/* Social Links */}
                            <div className="flex items-center space-x-4">
                                {socialLinks.map((social) => {
                                    const IconComponent = social.icon
                                    return (
                                        <a
                                            key={social.name}
                                            href={social.href}
                                            className={`w-10 h-10 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full flex items-center justify-center text-gray-400 ${social.color} transform hover:scale-110 hover:bg-white/10 transition-all duration-300 group`}
                                        >
                                            <IconComponent className="w-5 h-5" />
                                        </a>
                                    )
                                })}
                            </div>

                            {/* Legal Links */}
                            <div className="flex items-center space-x-6">
                                {footerLinks.legal.map((link) => (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        className="text-sm text-gray-400 hover:text-white transition-colors duration-300"
                                    >
                                        {link.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll to Top Button */}
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-[#077FBA] to-orange-500 text-white rounded-full shadow-2xl hover:shadow-lg transform hover:scale-110 transition-all duration-300 z-50 group"
                >
                    <ArrowUp className="w-6 h-6 mx-auto group-hover:-translate-y-1 transition-transform duration-300" />
                </button>
            </div>
        </footer>
    )
}

export default AwesomeFooter