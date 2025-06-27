import React, { useEffect, useState } from "react"
import {
  Upload,
  Search,
  MessageCircle,
  HandHeart,
  ArrowRight,
  Sparkles,
  CheckCircle,
  Gift,
  Users,
  Recycle,
  Zap,
  Shield,
  Rocket,
  Play
} from "lucide-react"

const ModernHowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [hoveredStep, setHoveredStep] = useState(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const steps = [
    {
      id: 1,
      icon: <Upload className="w-6 h-5" />,
      title: "Create & Upload",
      subtitle: "Share your treasures",
      description: "Snap photos and craft compelling descriptions of items you're ready to part with",
      detail: "Our AI-powered tools help optimize your listings for maximum visibility and engagement",
      gradient: "from-blue-500 to-indigo-600",
      bgGradient: "from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950",
      iconBg: "bg-blue-500",
      benefits: ["AI-powered descriptions", "Smart categorization", "Photo enhancement"]
    },
    {
      id: 2,
      icon: <Search className="w-6 h-5" />,
      title: "Discover & Match",
      subtitle: "Find your perfect items",
      description: "Explore curated collections and get personalized recommendations from your network",
      detail: "Advanced algorithms match you with items based on your preferences and swap history",
      gradient: "from-purple-500 to-pink-600",
      bgGradient: "from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950",
      iconBg: "bg-purple-500",
      benefits: ["Smart recommendations", "Advanced filtering", "Wishlist tracking"]
    },
    {
      id: 3,
      icon: <MessageCircle className="w-6 h-5" />,
      title: "Connect & Chat",
      subtitle: "Build meaningful connections",
      description: "Engage in real-time conversations with verified community members",
      detail: "Built-in video calls, secure messaging, and reputation system ensure safe interactions",
      gradient: "from-emerald-500 to-teal-600",
      bgGradient: "from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950",
      iconBg: "bg-emerald-500",
      benefits: ["Video chat integration", "Secure messaging", "Reputation system"]
    },
    {
      id: 4,
      icon: <HandHeart className="w-6 h-5" />,
      title: "Exchange & Celebrate",
      subtitle: "Complete the magic",
      description: "Meet safely at verified locations and celebrate your sustainable choice",
      detail: "Track your environmental impact and earn rewards for every successful exchange",
      gradient: "from-orange-500 to-red-600",
      bgGradient: "from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950",
      iconBg: "bg-orange-500",
      benefits: ["Safe meetup spots", "Impact tracking", "Reward system"]
    }
  ]

  const floatingElements = [
    { Icon: Gift, position: "top-20 left-20", color: "text-pink-400/30", delay: "0s" },
    { Icon: Recycle, position: "top-32 right-32", color: "text-green-400/30", delay: "1s" },
    { Icon: Users, position: "bottom-32 left-32", color: "text-blue-400/30", delay: "2s" },
    { Icon: Sparkles, position: "bottom-20 right-20", color: "text-yellow-400/30", delay: "3s" },
    { Icon: Zap, position: "top-1/2 left-10", color: "text-purple-400/30", delay: "4s" },
    { Icon: Shield, position: "top-1/3 right-10", color: "text-indigo-400/30", delay: "5s" }
  ]

  return (
    <section className="relative py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-gradient-to-r from-pink-400/15 to-yellow-400/15 rounded-full blur-3xl animate-pulse delay-1000" />
        {floatingElements.map(({ Icon, position, color, delay }, i) => (
          <div key={i} className={`absolute ${position}`} style={{ animationDelay: delay }}>
            <Icon className={`w-6 h-5 ${color} animate-bounce`} />
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-5 py-2 rounded-full bg-white/70 dark:bg-slate-800/70 text-xs font-medium text-slate-600 dark:text-slate-300 mb-6 shadow-md border border-blue-200/50 dark:border-slate-600/50">
            <Rocket className="w-4 h-4 mr-2 text-blue-500" />
            Revolutionary Process • Proven Results
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Experience the future of sustainable exchange with our{" "}
            <span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI-powered platform
            </span>{" "}
            that makes sharing effortless and rewarding.
          </p>
        </div>

        <div className="flex space-x-4 overflow-x-auto p-8 mb-12">
          {steps.map((step, index) => {
            const isActive = activeStep === index
            const isHovered = hoveredStep === index
            const isHighlighted = isActive || isHovered

            return (
              <div
                key={step.id}
                className={`group relative p-5 rounded-2xl border transition-all duration-500 cursor-pointer overflow-hidden w-[300px] ${
                  isHighlighted 
                    ? "scale-105 shadow-xl border-white/50 dark:border-slate-600/50" 
                    : "shadow-sm border-white/30 dark:border-slate-700/30 hover:scale-102"
                } bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm`}
                onMouseEnter={() => setHoveredStep(index)}
                onMouseLeave={() => setHoveredStep(null)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${step.bgGradient} opacity-0 transition-opacity duration-500 ${
                  isHighlighted ? "opacity-100" : "group-hover:opacity-50"
                }`} />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-10 h-10 rounded-xl ${step.iconBg} flex items-center justify-center text-white shadow-sm ${
                      isHighlighted ? "scale-110 shadow-sm" : ""
                    }`}>
                      {step.icon}
                    </div>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs transition-all ${
                      isHighlighted 
                        ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm scale-110" 
                        : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                    }`}>
                      {isHighlighted ? <CheckCircle className="w-4 h-4 text-green-500" /> : step.id}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                        {step.title}
                      </h3>
                      <p className={`text-xs font-medium bg-gradient-to-r ${step.gradient} bg-clip-text text-transparent`}>
                        {step.subtitle}
                      </p>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      {step.description}
                    </p>

                    <div className={`transition-all duration-500 overflow-hidden ${
                      isHighlighted ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}>
                      <div className="pt-3 border-t border-slate-200/50 dark:border-slate-600/50">
                        <p className="text-xs text-slate-500 dark:text-slate-400 italic mb-3">
                          {step.detail}
                        </p>
                        <div className="space-y-1">
                          {step.benefits.map((benefit, i) => (
                            <div key={i} className="flex items-center text-xs text-slate-600 dark:text-slate-300">
                              <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                              {benefit}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${step.gradient} p-[1px] opacity-0 transition-opacity duration-500 ${
                  isHighlighted ? "opacity-100" : ""
                }`}>
                  <div className="bg-white dark:bg-slate-800 rounded-2xl h-full w-full" />
                </div>
              </div>
            )
          })}
        </div>

        <div className="flex justify-center mb-10">
          <div className="flex space-x-2">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === activeStep
                    ? 'w-8 h-2 bg-gradient-to-r from-blue-500 to-purple-500 shadow-sm'
                    : 'w-2 h-2 bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="text-center">
          <div className="mb-6">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs font-medium mb-3">
              <CheckCircle className="w-3 h-3 mr-2" />
              Join 50,000+ active swappers
            </div>
          </div>

          <button className="group relative px-6 py-3 bg-gradient-to-r from-blue-600 to-orange-600 text-white font-semibold text-base rounded-xl shadow-sm hover:shadow-sm transition-all duration-300 transform hover:scale-105 overflow-hidden mb-3">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-orange-900 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative flex items-center">
              <Play className="mr-2 w-4 h-4" />
              Start Your Journey Today
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </button>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Free to join • No hidden fees • Instant approval
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(3deg); }
        }

        @keyframes glow {
          0%, 100% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 60px rgba(147, 51, 234, 0.4); }
        }

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }

        .animate-glow {
          animation: glow 4s ease-in-out infinite;
        }

        .hover\\:scale-102:hover {
          transform: scale(1.02);
        }

        .delay-1000 { animation-delay: 1s; }
        .delay-2000 { animation-delay: 2s; }
        .delay-3000 { animation-delay: 3s; }
      `}</style>
    </section>
  )
}

export default ModernHowItWorks
