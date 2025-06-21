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

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  const goToSlide = (index) => setCurrentIndex(index)

  const current = testimonials[currentIndex]

  return (
    <section className="relative py-20 bg-background overflow-hidden">
      {/* Floating Icons */}
      <div className="absolute inset-0 pointer-events-none">
        <Heart className="absolute top-20 right-20 w-8 h-8 text-pink-300 dark:text-pink-800 animate-float" />
        <Users className="absolute bottom-32 left-16 w-10 h-10 text-blue-300 dark:text-blue-800 animate-float delay-1000" />
        <Sparkles className="absolute top-40 left-20 w-6 h-6 text-yellow-300 dark:text-yellow-700 animate-float delay-2000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full border text-sm font-medium text-muted-foreground border-muted bg-muted/20 mb-4">
            <Heart className="w-4 h-4 mr-2" />
            Community Love
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
            What Our Community Says
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Real stories from real people who are making a difference through{" "}
            <span className="font-semibold text-primary">sustainable swapping</span>
          </p>
        </div>

        {/* Testimonial Card */}
        <div
          className="relative bg-muted rounded-3xl border border-border shadow-lg overflow-hidden"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className="relative p-8 md:p-12">
            <div className="absolute top-8 right-8 opacity-10">
              <Quote className="w-24 h-24 text-primary" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              {/* Left Column */}
              <div className="text-center lg:text-left">
                <div className="relative inline-block mb-6">
                  <img
                    src={current.image}
                    alt={current.name}
                    className="w-24 h-24 rounded-full object-cover mx-auto lg:mx-0 ring-4 ring-primary shadow-xl"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Heart className="w-4 h-4 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">{current.name}</h3>
                <p className="text-primary font-medium">{current.role}</p>
                <p className="text-muted-foreground text-sm">{current.location}</p>

                <div className="flex justify-center lg:justify-start gap-4 mt-4 text-sm">
                  <div className="bg-primary/10 px-3 py-1 rounded-full text-primary font-medium">
                    {current.swaps} swaps
                  </div>
                  <div className="bg-accent/20 px-3 py-1 rounded-full text-accent-foreground font-medium">
                    {current.saved} saved
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="lg:col-span-2">
                <div className="flex mb-4">
                  {Array.from({ length: current.rating }).map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-xl md:text-2xl font-medium text-foreground leading-relaxed mb-6">
                  “{current.content}”
                </blockquote>
                <div className="flex items-center">
                  <div className="h-px flex-1 mr-4 bg-gradient-to-r from-primary to-accent" />
                  <span className="text-sm text-muted-foreground font-medium">
                    Verified SwapCircle Member
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-background/80 border border-border rounded-full flex items-center justify-center shadow-md text-muted-foreground hover:text-primary transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-background/80 border border-border rounded-full flex items-center justify-center shadow-md text-muted-foreground hover:text-primary transition"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-6 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? 'w-10 h-2 bg-gradient-to-r from-primary to-accent'
                  : 'w-2 h-2 bg-muted-foreground/30'
              }`}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <button className="group px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300">
            <span className="flex items-center">
              Start Your Swapping Journey
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>
      </div>

      {/* Floating Icon Animation */}
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
