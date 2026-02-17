import React from 'react'
import HeroBanner from './HeroBanner.js'
import ScrollingLogos from './ScrollingLogos.js'
import WhyChooseUs from './WhyChooseUs.js'
import FeaturedProducts from './FeaturedProducts.js'
import Newsletter from './Newsletter.js'
import Categories from './Categories.js'
import AlibabaTrustSection from './AlibabaTrustSection.js'
import Navbar from '../layout/Navbar.js'
import Footer from '../layout/Footer.js'

export default function HomePage() {
  return (
     <>
     <Navbar />
      <HeroBanner />
      <ScrollingLogos />
      <WhyChooseUs />
      <Categories />
      <FeaturedProducts />
           <AlibabaTrustSection /> 
           <Footer />
  
    </>
  )
}
