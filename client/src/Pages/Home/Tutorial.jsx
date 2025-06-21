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
  Recycle
} from "lucide-react"

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const steps = [
    {
      id: 1,
      icon: <Upload className="w-6 h-6" />,
      title: "List Your Items",
      description: "Upload photos and describe what you want to swap or donate",
      detail: "Share items you no longer need with your trusted community circle",
      color: "orange"

    },
    {
      id: 2,
      icon: <Search className="w-6 h-6" />,
      title: "Browse & Discover",
      description: "Find items you need from your community members",
      detail: "Search through available items or browse by categories",
      color: "purple"
    },
    {
      id: 3,
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Connect & Negotiate",
      description: "Chat with members to arrange fair swaps or donations",
      detail: "Build connections while negotiating mutually beneficial exchanges",
      color: "orange"
    },
    {
      id: 4,
      icon: <HandHeart className="w-6 h-6" />,
      title: "Complete the Swap",
      description: "Meet up safely and complete your sustainable exchange",
      detail: "Enjoy your new items while helping build a circular economy",
      color: "purple"
    }
  ]

  const floatingIcons = [
    { Icon: Gift, position: "top-10 left-10", color: "text-pink-300 dark:text-pink-800" },
    { Icon: Recycle, position: "top-24 right-20", color: "text-green-300 dark:text-green-800" },
    { Icon: Users, position: "bottom-20 left-16", color: "text-blue-300 dark:text-sky-800" },
    { Icon: Sparkles, position: "bottom-10 right-10", color: "text-yellow-300 dark:text-yellow-700" }
  ]

  return (
    <section className="relative py-20 bg-background overflow-hidden">
      {/* Floating Icons */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingIcons.map(({ Icon, position, color }, i) => (
          <div key={i} className={`absolute ${position} opacity-10`}>
            <Icon className={`w-12 h-12 ${color}`} />
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full border text-sm font-medium text-muted-foreground border-muted bg-muted/20 mb-4">
            <Sparkles className="w-4 h-4 mr-2" />
            Simple & Sustainable
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join the circular economy in just four simple steps.{" "}
            <span className="font-semibold text-primary">Transform waste into wealth</span> while
            building community connections.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {steps.map((step, index) => {
            const isActive = activeStep === index
            return (
              <div
                key={step.id}
                className={`group p-6 rounded-xl border border-zinc-400 transition-all duration-300 cursor-pointer relative 
                  ${isActive ? "ring-2 ring-primary bg-muted scale-105" : 
                  "bg-background border-muted hover:ring-1 hover:ring-muted-foreground/30"}`}
                onMouseEnter={() => setActiveStep(index)}
              >
                {/* Colored Icon Container */}
                <div
                  className={`w-12 h-12 rounded-md flex items-center border border-zinc-700 justify-center mb-4 transition-all
                    ${isActive
                      ? `bg-${step.color}-500 dark:bg-${step.color}-600 scale-105`
                      : `bg-${step.color}-100 text-${step.color}-700 dark:bg-${step.color}-900 dark:text-${step.color}-200`
                    }`}
                >
                  {step.icon}
                </div>

                <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{step.description}</p>

                {isActive && (
                  <div className="text-sm text-muted-foreground italic border-l pl-3 border-primary/50">
                    {step.detail}
                  </div>
                )}

                <div className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-muted border border-border flex items-center justify-center shadow-sm text-sm font-medium text-foreground">
                  {isActive ? <CheckCircle className="w-5 h-5 text-primary" /> : step.id}
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <button className="group px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300">
            <span className="flex items-center">
              Ready to Start Swapping?
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
