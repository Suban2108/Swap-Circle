import React, { useState, useEffect } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Quote,
  Heart,
  Sparkles,
  Users,
  ArrowRight
} from 'lucide-react'

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Community Leader",
      location: "San Francisco, CA",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      content: "SwapCircle transformed our neighborhood! I've swapped everything from books to kitchen appliances. It's amazing how much waste we've prevented while building real friendships.",
      rating: 5,
      swaps: 47,
      saved: "$850"
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      role: "Sustainability Advocate",
      location: "Austin, TX",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      content: "As someone passionate about the environment, SwapCircle aligns perfectly with my values. The platform makes it so easy to give items a second life instead of throwing them away.",
      rating: 5,
      swaps: 32,
      saved: "$620"
    },
    {
      id: 3,
      name: "Emily Thompson",
      role: "Busy Mom of 3",
      location: "Portland, OR",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      content: "With three kids, we outgrow clothes and toys constantly. SwapCircle lets me easily exchange items with other parents. It's a lifesaver for our budget and the planet!",
      rating: 5,
      swaps: 68,
      saved: "$1,200"
    },
    {
      id: 4,
      name: "David Park",
      role: "College Student",
      location: "Boston, MA",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      content: "Being a student on a tight budget, SwapCircle has been incredible. I've gotten textbooks, furniture, and even electronics through swaps. The community is so welcoming!",
      rating: 5,
      swaps: 23,
      saved: "$480"
    },
    {
      id: 5,
      name: "Lisa Johnson",
      role: "Urban Gardener",
      location: "Seattle, WA",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      content: "I love how SwapCircle connects like-minded people in my area. I've traded gardening supplies, tools, and even plant cuttings. It's created a true sense of community!",
      rating: 5,
      swaps: 41,
      saved: "$720"
    },
    {
      id: 6,
      name: "Alex Kim",
      role: "Tech Professional",
      location: "New York, NY",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      content: "The platform is incredibly user-friendly and secure. I've swapped tech gadgets, books, and home decor. It's satisfying to know that every swap prevents waste and builds community.",
      rating: 5,
      swaps: 35,
      saved: "$910"
    }
  ]

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [isAutoPlaying, testimonials.length])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-20 h-20 bg-[#077FBA]/5 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-orange-500/5 rounded-full blur-xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-r from-[#077FBA]/10 to-orange-500/10 rounded-full blur-lg animate-pulse delay-2000" />
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Heart className="absolute top-20 right-20 w-8 h-8 text-orange-300/30 animate-float" />
        <Users className="absolute bottom-32 left-16 w-10 h-10 text-[#077FBA]/20 animate-float delay-1000" />
        <Sparkles className="absolute top-40 left-20 w-6 h-6 text-orange-400/40 animate-float delay-2000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[#077FBA]/10 to-orange-500/10 border border-[#077FBA]/20 text-[#077FBA] text-sm font-medium mb-6">
            <Heart className="w-4 h-4 mr-2" />
            Community Love
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[#077FBA] via-orange-500 to-[#077FBA] bg-clip-text text-transparent">
              What Our Community Says
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real stories from real people who are making a difference through 
            <span className="text-[#077FBA] font-semibold"> sustainable swapping</span>
          </p>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Main Testimonial */}
          <div className="relative p-8 md:p-12">
            {/* Quote Icon */}
            <div className="absolute top-8 right-8 opacity-10">
              <Quote className="w-24 h-24 text-[#077FBA]" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              {/* User Info */}
              <div className="text-center lg:text-left">
                <div className="relative inline-block mb-6">
                  <img
                    src={currentTestimonial.image}
                    alt={currentTestimonial.name}
                    className="w-24 h-24 rounded-full object-cover mx-auto lg:mx-0 ring-4 ring-gradient-to-r from-[#077FBA] to-orange-500 shadow-xl"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-[#077FBA] to-orange-500 rounded-full flex items-center justify-center">
                    <Heart className="w-4 h-4 text-white" />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {currentTestimonial.name}
                </h3>
                <p className="text-[#077FBA] font-semibold mb-1">
                  {currentTestimonial.role}
                </p>
                <p className="text-gray-500 text-sm mb-4">
                  {currentTestimonial.location}
                </p>
                
                {/* Stats */}
                <div className="flex justify-center lg:justify-start space-x-4 text-sm">
                  <div className="bg-blue-50 px-3 py-1 rounded-full">
                    <span className="text-[#077FBA] font-semibold">{currentTestimonial.swaps}</span>
                    <span className="text-gray-600 ml-1">swaps</span>
                  </div>
                  <div className="bg-orange-50 px-3 py-1 rounded-full">
                    <span className="text-orange-500 font-semibold">{currentTestimonial.saved}</span>
                    <span className="text-gray-600 ml-1">saved</span>
                  </div>
                </div>
              </div>

              {/* Testimonial Content */}
              <div className="lg:col-span-2 relative">
                <div className="flex mb-4">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <blockquote className="text-xl md:text-2xl leading-relaxed text-gray-700 font-medium mb-6 relative">
                  "{currentTestimonial.content}"
                </blockquote>
                
                <div className="flex items-center">
                  <div className="h-px bg-gradient-to-r from-[#077FBA] to-orange-500 flex-1 mr-4" />
                  <span className="text-sm text-gray-400 font-medium">Verified SwapCircle Member</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-[#077FBA] hover:bg-white transition-all duration-300 group"
          >
            <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-[#077FBA] hover:bg-white transition-all duration-300 group"
          >
            <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center mt-8 space-x-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? 'w-12 h-3 bg-gradient-to-r from-[#077FBA] to-orange-500'
                  : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 mb-6">
            Ready to join our amazing community?
          </p>
          <button className="group relative px-8 py-4 bg-gradient-to-r from-[#077FBA] to-orange-500 text-white font-bold rounded-full text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-[#077FBA] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative flex items-center">
              Start Your Swapping Journey
              <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
            </div>
          </button>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(3deg); }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .delay-1000 { animation-delay: 1s; }
        .delay-2000 { animation-delay: 2s; }
      `}</style>
    </section>
  )
}

export default Testimonials