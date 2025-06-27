import React, { useState, useEffect } from 'react'
import {
  ArrowRight,
  Play,
  Users,
  Shield,
  Zap,
  Sparkles
} from 'lucide-react'

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })

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

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Instant Swaps',
      desc: 'Experience seamless and fast exchanges.',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Secured Platform',
      desc: 'Built with privacy and trust in mind.',
      color: 'from-blue-400 to-purple-500'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'People Powered',
      desc: 'Driven by community and connection.',
      color: 'from-green-400 to-blue-500'
    }
  ]

  return (
    <section className="relative min-h-[750px] flex items-center justify-center mt-[80px] bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white overflow-hidden">
      {/* Dynamic Background Light */}
      <div
        className="absolute inset-0 transition-all duration-1000 ease-out"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(14,165,233,0.1), transparent 50%)`
        }}
      />

      {/* Content Container */}
      <div className="z-10 max-w-6xl px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center mb-6 mt-5 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-sm font-medium">
          <Sparkles className="w-4 h-4 mr-2 text-yellow-400" />
          A Smarter Way to Swap
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
          Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-orange-400">Swap-Circle</span>
        </h1>
        <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10">
          Connect, exchange, and build stronger communities through effortless sharing.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <button className="flex items-center justify-center gap-2 px-6 py-3 text-white font-semibold rounded-full bg-gradient-to-r from-blue-600 to-orange-600 hover:scale-105 transition-transform">
            Start Swapping
            <ArrowRight className="w-5 h-5" />
          </button>
          <button className="flex items-center gap-3 px-6 py-3 rounded-full border border-white/20 hover:bg-white/10 transition">
            <span className="p-2 bg-white/10 rounded-full">
              <Play className="w-4 h-4 text-white" />
            </span>
            Watch How It Works
          </button>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-4">
          {features.map((f, i) => (
            <div
              key={i}
              className="p-6 flex flex-col items-center justify-center bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm hover:scale-105 transition-transform duration-300"
            >
              <div
                className={`w-12 h-12 flex items-center justify-center mb-4 rounded-lg bg-gradient-to-br ${f.color} text-white`}
              >
                {f.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-white/70">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Gradient Circles */}
      <div className="absolute top-[-200px] right-[-200px] w-[400px] h-[400px] bg-gradient-to-br from-pink-500/20 to-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-[-200px] left-[-200px] w-[400px] h-[400px] bg-gradient-to-br from-cyan-500/20 to-green-500/10 rounded-full blur-3xl" />
    </section>
  )
}

export default HeroSection
