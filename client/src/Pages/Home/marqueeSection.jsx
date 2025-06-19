import React from 'react'
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
          className="w-20 h-20 object-contain opacity-70 hover:opacity-100 transition"
        />
      ))}
    </div>
  </div>
)

const MarqueeSection = () => {
  return (
    <section className="w-full flex items-center justify-center my-16">
      <div className="w-full max-w-7xl h-[500px] flex flex-col md:flex-row overflow-hidden bg-white">
        
        {/* Left Content */}
        <div className="md:w-3/5 w-full p-10 flex flex-col justify-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Trusted by the World's Leading Teams
          </h2>
          <p className="text-lg text-gray-600 max-w-xl">
            Join companies around the globe that use our platform to build, innovate, and lead. Our solutions are powering real impact every day.
          </p>
          <button className="px-6 py-3 bg-[#077FBA] hover:bg-[#066fa5] text-white rounded-full font-semibold shadow-lg w-fit transition">
            See Customer Stories
          </button>
        </div>

        {/* Right Content - 3 vertical marquee columns side-by-side */}
        <div className="md:w-2/5 w-full bg-gradient-to-br from-orange-100 to-blue-100 border-l border-gray-100 rounded-[20px]">
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
