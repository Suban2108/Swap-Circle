import React from 'react'
import { Button } from '../../Components/ui/button'
import './style/marqueeStyle.css'

const logos = [
  'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
  'https://upload.wikimedia.org/wikipedia/commons/d/db/Npm-logo.svg',
  'https://upload.wikimedia.org/wikipedia/commons/4/4b/Typescript_logo_2020.svg',
  'https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png',
  'https://upload.wikimedia.org/wikipedia/commons/9/96/Sass_Logo_Color.svg',
  'https://upload.wikimedia.org/wikipedia/commons/4/47/Nextjs-logo.svg'
]

const MarqueeColumn = ({ reverse = false, columnIndex }) => (
  <div className="marquee-column">
    <div className={`marquee-track ${reverse ? 'reverse' : ''}`}>
      {[...logos, ...logos].map((src, i) => (
        <img
          key={`${columnIndex}-${i}`}
          src={src}
          alt={`logo-${i}`}
          className="w-16 h-16 object-contain opacity-70 hover:opacity-100 transition"
        />
      ))}
    </div>
  </div>
)

const MarqueeSection = () => {
  return (
    <section className="w-full flex items-center justify-center py-16 bg-background">
      <div className="w-full max-w-7xl h-[400px] border border-red-900 flex flex-col md:flex-row overflow-hidden rounded-2xl shadow-lg border border-muted bg-card">
        
        {/* Left Content */}
        <div className="md:w-3/5 w-full p-10 flex flex-col justify-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
            Trusted by the World's Leading Teams
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl">
            Join companies around the globe that use our platform to build, innovate, and lead. Our solutions are powering real impact every day.
          </p>
          <Button className="w-fit" variant="default">
            See Customer Stories
          </Button>
        </div>

        {/* Right Content - Marquee */}
        <div className="md:w-2/5 w-full bg-muted/50 border-l border-muted rounded-r-2xl">
          <div className="marquee-columns">
            <MarqueeColumn columnIndex={1} />
            <MarqueeColumn reverse columnIndex={2} />
            <MarqueeColumn columnIndex={3} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default MarqueeSection
