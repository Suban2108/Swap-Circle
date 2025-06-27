import React, { useState, useEffect } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  Star,
  MessageCircle,
  Zap,
  Shield,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Sparkles
} from 'lucide-react'

const ModernTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [direction, setDirection] = useState(1)

  const testimonials = [
    {
      id: 1,
      name: "Alex Rivera",
      role: "Product Designer",
      company: "TechFlow",
      location: "San Francisco, CA",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      content: "This platform revolutionized how our team collaborates. The intuitive design and powerful features have increased our productivity by 300%. It's simply game-changing.",
      rating: 5,
      metrics: { projects: 45, efficiency: "300%", satisfaction: "98%" },
      tags: ["Design", "Collaboration", "Productivity"]
    },
    {
      id: 2,
      name: "Maya Patel",
      role: "Engineering Manager",
      company: "InnovateCorp",
      location: "Austin, TX",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      content: "The seamless integration and robust security features gave us confidence to migrate our entire workflow. Our development velocity has never been higher.",
      rating: 5,
      metrics: { teams: 12, uptime: "99.9%", deployments: "2x faster" },
      tags: ["Engineering", "Security", "Integration"]
    },
    {
      id: 3,
      name: "Jordan Kim",
      role: "Startup Founder",
      company: "NextGen Solutions",
      location: "New York, NY",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      content: "As a bootstrapped startup, every tool needs to deliver exceptional value. This platform not only met our needs but exceeded expectations at every turn.",
      rating: 5,
      metrics: { growth: "400%", costs: "60% less", time: "50% saved" },
      tags: ["Startup", "Growth", "Value"]
    },
    {
      id: 4,
      name: "Sam Chen",
      role: "Creative Director",
      company: "Design Studio",
      location: "Los Angeles, CA",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      content: "The creative possibilities are endless. The platform's flexibility allows us to bring our wildest ideas to life while maintaining professional quality standards.",
      rating: 5,
      metrics: { campaigns: 28, clients: "95% happy", awards: 8 },
      tags: ["Creative", "Flexibility", "Quality"]
    },
    {
      id: 5,
      name: "Taylor Brooks",
      role: "Operations Lead",
      company: "ScaleUp Inc",
      location: "Seattle, WA",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      content: "Managing complex operations became effortless. The automation features and real-time insights have transformed how we make strategic decisions.",
      rating: 5,
      metrics: { processes: 35, automation: "80%", decisions: "3x faster" },
      tags: ["Operations", "Automation", "Analytics"]
    }
  ]

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setDirection(1)
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
      }, 6000)
      return () => clearInterval(interval)
    }
  }, [isAutoPlaying, testimonials.length])

  const nextSlide = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }
  
  const prevSlide = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }
  
  const goToSlide = (index) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }

  const current = testimonials[currentIndex]

  return (
    <section className="relative py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-r from-pink-400/15 to-yellow-400/15 rounded-full blur-3xl animate-pulse delay-1000" />
        
        {/* Floating Icons */}
        <Sparkles className="absolute top-32 right-32 w-8 h-8 text-blue-400/40 animate-bounce delay-500" />
        <Zap className="absolute bottom-40 left-32 w-10 h-10 text-purple-400/40 animate-bounce delay-1000" />
        <Shield className="absolute top-40 left-40 w-6 h-6 text-green-400/40 animate-bounce delay-1500" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-6 py-2 rounded-full bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-blue-200/50 dark:border-slate-600/50 text-sm font-medium text-slate-600 dark:text-slate-300 mb-6 shadow-lg">
            <MessageCircle className="w-4 h-4 mr-2 text-blue-500" />
            Trusted by 10,000+ teams worldwide
          </div>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
            Loved by creators
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            See how teams around the world are achieving{" "}
            <span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">extraordinary results</span>{" "}
            with our platform
          </p>
        </div>

        {/* Main Testimonial Card */}
        <div
          className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl border border-white/20 dark:border-slate-700/20 shadow-2xl overflow-hidden"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Gradient Border */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl p-[1px]">
            <div className="bg-white dark:bg-slate-800 rounded-3xl h-full w-full" />
          </div>
          
          <div className="relative p-8 md:p-16">
            {/* Quote Icon */}
            <div className="absolute top-8 right-8 opacity-5">
              <MessageCircle className="w-32 h-32 text-blue-500" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
              {/* Left Column - Profile */}
              <div className="lg:col-span-2 text-center lg:text-left">
                <div className="relative inline-block mb-8">
                  <div className="relative">
                    <img
                      src={current.image}
                      alt={current.name}
                      className="w-32 h-32 rounded-3xl object-cover mx-auto lg:mx-0 shadow-2xl"
                    />
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="absolute -top-2 -left-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-ping" />
                </div>

                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{current.name}</h3>
                <p className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1">
                  {current.role}
                </p>
                <p className="text-slate-600 dark:text-slate-300 font-medium mb-1">{current.company}</p>
                <p className="text-slate-500 dark:text-slate-400 text-sm">{current.location}</p>

                {/* Tags */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-2 mt-6">
                  {current.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600 dark:text-blue-400 text-xs font-medium rounded-full border border-blue-200/50 dark:border-blue-400/20">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column - Content */}
              <div className="lg:col-span-3">
                <div className="flex mb-6">
                  {Array.from({ length: current.rating }).map((_, i) => (
                    <Star key={i} className="w-7 h-7 text-yellow-400 fill-current mr-1" />
                  ))}
                </div>

                <blockquote className="text-2xl md:text-3xl font-medium text-slate-900 dark:text-white leading-relaxed mb-8">
                  "{current.content}"
                </blockquote>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-6 mb-8">
                  {Object.entries(current.metrics).map(([key, value], i) => (
                    <div key={i} className="text-center">
                      <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {value}
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400 capitalize font-medium">
                        {key}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center">
                  <div className="h-px flex-1 mr-4 bg-gradient-to-r from-blue-500 to-purple-500" />
                  <span className="text-sm text-slate-500 dark:text-slate-400 font-medium flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
                    Verified Customer
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-white/20 dark:border-slate-700/20 rounded-full flex items-center justify-center shadow-xl text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-white/20 dark:border-slate-700/20 rounded-full flex items-center justify-center shadow-xl text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-8 space-x-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-500 rounded-full ${
                index === currentIndex
                  ? 'w-12 h-3 bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg'
                  : 'w-3 h-3 bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500'
              }`}
            />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20">
          <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-orange-600 text-white font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-orange-900 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative flex items-center text-lg">
              <TrendingUp className="mr-3 w-5 h-5" />
              Join 10,000+ happy customers
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </button>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-4">
            Start your free trial today • No credit card required
          </p>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(2deg); }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 40px rgba(147, 51, 234, 0.4); }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }

        .delay-500 { animation-delay: 0.5s; }
        .delay-1000 { animation-delay: 1s; }
        .delay-1500 { animation-delay: 1.5s; }
      `}</style>
    </section>
  )
}

export default ModernTestimonials