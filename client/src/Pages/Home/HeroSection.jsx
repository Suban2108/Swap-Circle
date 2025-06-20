import React, { useState, useEffect } from 'react'
import {
  Sparkles,
  Star,
  ArrowRight,
  Play,
  Zap,
  Shield,
  RefreshCw,
  Heart,
  Users,
  Recycle,
  Gift,
  ArrowUpRight
} from 'lucide-react'

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const floatingItems = [
    { icon: Gift, color: 'text-pink-500', size: 'w-8 h-8', delay: '0s' },
    { icon: Recycle, color: 'text-green-500', size: 'w-6 h-6', delay: '1s' },
    { icon: Heart, color: 'text-red-500', size: 'w-7 h-7', delay: '2s' },
    { icon: Users, color: 'text-blue-500', size: 'w-8 h-8', delay: '0.5s' },
    { icon: Star, color: 'text-yellow-500', size: 'w-6 h-6', delay: '1.5s' },
    { icon: Sparkles, color: 'text-purple-500', size: 'w-7 h-7', delay: '2.5s' }
  ]

  return (
    <div className="relative min-h-screen py-[20px] overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Animated Mesh Gradient */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, #077FBA 0%, transparent 50%),
                         radial-gradient(circle at ${100 - mousePosition.x}% ${100 - mousePosition.y}%, #F97316 0%, transparent 50%)`
          }}
        />

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />

        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-[#077FBA]/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-orange-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {floatingItems.map((item, i) => {
          const Icon = item.icon
          return (
            <div
              key={i}
              className={`absolute animate-float`}
              style={{
                left: `${15 + (i * 12)}%`,
                top: `${20 + (i * 8)}%`,
                animationDelay: item.delay,
                animationDuration: `${3 + (i * 0.5)}s`
              }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-white/10 rounded-full blur-sm animate-ping" />
                <Icon className={`${item.size} ${item.color} relative z-10`} />
              </div>
            </div>
          )
        })}
      </div>

      {/* Main Content */}
      <div className="relative z-20 flex items-center justify-center min-h-screen px-6">
        <div className="max-w-6xl mx-auto text-center">

          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 mr-2 text-yellow-400" />
            The Future of Community Sharing
            <ArrowUpRight className="w-4 h-4 ml-2" />
          </div>

          {/* Main Heading with Staggered Animation */}
          <div className="space-y-6 mb-8">
            <h1 className="text-4xl md:text-6xl font-black leading-none tracking-tight">
              <div className='flex justify-center'>
                <div className="overflow-hidden">
                  <span className="block bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent animate-slide-up">
                    SWAP -
                  </span>
                </div>
                <div className="overflow-hidden">
                  <span className="block bg-gradient-to-r from-[#077FBA] via-orange-400 to-purple-500 bg-clip-text text-transparent animate-slide-up delay-200">
                    &nbsp;CIRCLE
                  </span>
                </div>
              </div>
            </h1>

            <div className="relative">
              <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed animate-fade-in delay-500">
                Transform your community into a thriving ecosystem of sharing, swapping, and sustainability.
                <span className="block mt-2 text-gradient font-semibold bg-gradient-to-r from-[#077FBA] to-orange-400 bg-clip-text text-transparent">
                  Where every exchange builds connections.
                </span>
              </p>
            </div>
          </div>

          {/* Interactive CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <button
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="group relative px-8 py-4 bg-gradient-to-r from-[#077FBA] to-orange-500 rounded-full font-bold text-white text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex items-center">
                <RefreshCw className={`w-5 h-5 mr-3 transition-transform duration-500 ${isHovered ? 'rotate-180' : ''}`} />
                Start Swapping Now
                <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
              </div>
              <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </button>

            <button className="group px-8 py-4 bg-white/10 backdrop-blur-sm rounded-full font-semibold text-white border border-white/30 hover:bg-white/20 transition-all duration-300">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-[#077FBA] to-orange-500 rounded-full flex items-center justify-center mr-3 group-hover:rotate-12 transition-transform duration-300">
                  <Play className="w-4 h-4 text-white ml-0.5" />
                </div>
                See the Magic
              </div>
            </button>
          </div>

          {/* Animated Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: <Zap className="w-8 h-8" />,
                title: 'Lightning Fast',
                desc: 'Instant swaps in seconds',
                color: 'from-yellow-400 to-orange-500'
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: 'Fort Knox Secure',
                desc: 'Your privacy is sacred',
                color: 'from-blue-400 to-purple-500'
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: 'Community First',
                desc: 'Built by neighbors, for neighbors',
                color: 'from-green-400 to-blue-500'
              }
            ].map((feature, i) => (
              <div
                key={i}
                className="group relative p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:-translate-y-2"
                style={{ animationDelay: `${i * 200}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center text-white mb-4 ml-[80px] border border-white group-hover:rotate-12 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-white/70">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes slide-up {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .delay-200 { animation-delay: 0.2s; }
        .delay-500 { animation-delay: 0.5s; }
      `}</style>
    </div>
  )
}

export default HeroSection