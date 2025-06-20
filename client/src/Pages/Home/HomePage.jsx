// src/pages/Home/HomePage.jsx
import React from 'react'
import HeroSection from './HeroSection'
import MarqueeSection from './marqueeSection'
import HowItWorks from './Tutorial'
import Testimonials from './Testimonial'

const HomePage = () => {
    return (
        <>
            <HeroSection />
            <HowItWorks/>
            <Testimonials/>
            <MarqueeSection/>
        </>
    )
}

export default HomePage
