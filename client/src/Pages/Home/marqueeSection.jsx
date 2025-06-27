import React from 'react'
import { Button } from '../../Components/ui/button'
import './style/marqueeStyle.css'

const logos = [
  'https://content.jdmagicbox.com/v2/comp/delhi/w6/011pxx11.xx11.181130165602.e9w6/catalogue/barter-mantra-delhi-barter-service-companies-0rnnj3valk.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHRL7sak0EV9Tf1uLPIROpfy49RIinA0l-M8ktLORxoBhTQ8jU-ZTvBhmnUDaJtrvtKU4&usqp=CAU',
  'https://lh3.googleusercontent.com/proxy/sFpn_Ai0NmDdqTPLD8UxJEoAW60HcBwQHFohAtdywOnSrBs0dmUExQKnQZsCwPqlh2oRVLLX_rDDvHw7VlVmQHbF',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUirQoGKRxsjjbWS6sIZ3ZoC_CNisdm-bmb5cbzNyY0-yRLUIcERka06NJwZV8oqHyXq0&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBBJIZkM6J-WFRoh-L5h1KTof-Wh9GEvlKFnDH1YJAWrb8K5Rqf4lsTfMynOIH4vNja7U&usqp=CAU',
  'https://www.shutterstock.com/image-vector/professional-letter-b-logo-barter-600nw-2081128639.jpg',
  'https://content.jdmagicbox.com/v2/comp/delhi/w6/011pxx11.xx11.181130165602.e9w6/catalogue/barter-mantra-delhi-barter-service-companies-0rnnj3valk.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHRL7sak0EV9Tf1uLPIROpfy49RIinA0l-M8ktLORxoBhTQ8jU-ZTvBhmnUDaJtrvtKU4&usqp=CAU',
  'https://lh3.googleusercontent.com/proxy/sFpn_Ai0NmDdqTPLD8UxJEoAW60HcBwQHFohAtdywOnSrBs0dmUExQKnQZsCwPqlh2oRVLLX_rDDvHw7VlVmQHbF',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUirQoGKRxsjjbWS6sIZ3ZoC_CNisdm-bmb5cbzNyY0-yRLUIcERka06NJwZV8oqHyXq0&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBBJIZkM6J-WFRoh-L5h1KTof-Wh9GEvlKFnDH1YJAWrb8K5Rqf4lsTfMynOIH4vNja7U&usqp=CAU',
]

const MarqueeColumn = ({ reverse = false, columnIndex }) => (
  <div className="marquee-column mx-2 h-[47%] p-5">
    <div className={`marquee-track ${reverse ? 'reverse' : ''} `}>
      {[...logos, ...logos].map((src, i) => (
        <img
          key={`${columnIndex}-${i}`}
          src={src}
          alt={`logo-${i}`}
          className="w-20 h-20 object-contain transition logo-hover rounded-[20%]"
        />
      ))}
    </div>
  </div>
)

const MarqueeSection = () => {
  return (
    <section className="w-full flex items-center justify-center py-16 bg-background">
      <div className="w-full max-w-7xl h-[400px] flex flex-col md:flex-row overflow-hidden rounded-2xl shadow-lg border border-muted bg-card">
        
        {/* Left Content */}
        <div className="md:w-3/5 w-full p-10 flex flex-col justify-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
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
        <div className="md:w-2/5 w-full animate-gradient bg-gradient-to-r from-blue-800 to-red-900 bg-[length:200%_200%] border-l border-muted rounded-r-2xl">
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
