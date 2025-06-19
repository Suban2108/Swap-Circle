import React from 'react'
import {
  Sparkles,
  Star,
  ArrowRight,
  Play,
  Zap,
  Shield
} from 'lucide-react' // Or another icon library you’re using

const HeroSection = () => {
    return (
        <div>
            {/* Hero Section */}
            <section className="relative h-[850px] flex items-center justify-center overflow-hidden">
                {/* Beautiful Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-orange-200 to-indigo-400"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-[#077FBA]/5 via-transparent to-orange-500/10"></div>

                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-300/20 to-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-[#077FBA]/20 to-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-300/10 to-pink-300/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
                </div>

                {/* Floating Elements */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-30 left-40 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}>
                        <div className="w-15 h-15 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full opacity-80"></div>
                    </div>
                    <div className="absolute top-40 right-22 animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}>
                        <div className="w-15 h-15 bg-gradient-to-br from-[#077FBA] to-blue-600 rounded-full opacity-80"></div>
                    </div>
                    <div className="absolute bottom-32 left-20 animate-bounce" style={{ animationDelay: '2s', animationDuration: '5s' }}>
                        <div className="w-15 h-15 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-80"></div>
                    </div>
                    <div className="absolute bottom-20 right-20 animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '3.5s' }}>
                        <Sparkles className="w-15 h-15 text-orange-400 opacity-80" />
                    </div>
                </div>

                {/* Main Content */}
                <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 text-center">
                    <div className="space-y-8">
                        {/* Badge */}
                        <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-white/20">
                            <Star className="w-4 h-4 text-orange-500 mr-2" />
                            <span className="text-sm font-medium text-gray-700">Trusted by 10,000+ users</span>
                        </div>

                        {/* Main Heading */}
                        <div className="space-y-4">
                            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                                <span className="bg-gradient-to-r from-[#077FBA] via-purple-600 to-orange-500 bg-clip-text text-transparent">
                                    Build Amazing
                                </span>
                                <br />
                                <span className="text-gray-800">
                                    Experiences
                                </span>
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                                Create stunning digital solutions that captivate your audience and drive results.
                                <span className="text-[#077FBA] font-semibold"> Transform your vision into reality</span> with our cutting-edge platform.
                            </p>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
                            <button className="group relative px-8 py-4 bg-gradient-to-r from-[#077FBA] to-orange-500 text-white font-semibold rounded-full shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-300">
                                <span className="relative z-10 flex items-center">
                                    Get Started Free
                                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-[#077FBA] translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                            </button>

                            <button className="group flex items-center px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-700 font-semibold rounded-full shadow-lg border border-white/30 hover:bg-white/90 transform hover:scale-105 transition-all duration-300">
                                <div className="w-12 h-8 bg-gradient-to-r from-[#077FBA] to-orange-500 rounded-full flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                                    <Play className="w-5 h-5 text-white ml-1" />
                                </div>
                                Watch Demo
                            </button>
                        </div>

                        {/* Feature Icons */}
                        <div className="flex justify-center items-center space-x-8 pt-12">
                            <div className="flex flex-col items-center space-y-2 group">
                                <div className="w-12 h-12 bg-gradient-to-br from-[#077FBA]/20 to-[#077FBA]/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <Zap className="w-6 h-6 text-[#077FBA]" />
                                </div>
                                <span className="text-sm font-medium text-gray-600">Lightning Fast</span>
                            </div>

                            <div className="flex flex-col items-center space-y-2 group">
                                <div className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-orange-500/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <Shield className="w-6 h-6 text-orange-500" />
                                </div>
                                <span className="text-sm font-medium text-gray-600">Secure</span>
                            </div>

                            <div className="flex flex-col items-center space-y-2 group">
                                <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-purple-500/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <Star className="w-6 h-6 text-purple-500" />
                                </div>
                                <span className="text-sm font-medium text-gray-600">Premium</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Wave */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1200 120" className="w-[100%] h-20 fill-white">
                        <path d="M0,60 C300,120 600,0 900,60 C1050,90 1150,30 1200,60 L1200,120 L0,120 Z" />
                    </svg>
                </div>
            </section>
        </div>
    )
}

export default HeroSection