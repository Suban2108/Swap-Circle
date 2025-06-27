import React from 'react'

const HeroSection = () => {
  return (
    <section
      className="relative min-h-[400px] md:min-h-[500px] flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/premium-vector/conclusion-trade-partnership-deals-online-banner-flat-vector-isolated_605858-1547.jpg')"
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-75"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-2xl text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg md:text-xl text-white/80">
          We’d love to hear from you! Reach out with questions, feedback, or partnership opportunities.
        </p>
      </div>
    </section>
  )
}

export default HeroSection
