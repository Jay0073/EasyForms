import React from 'react'
import Hero from '../Components/Hero'
import RecentsForms from '../Components/RecentForms'
import FeaturesSection from '../Components/FeaturesSection'
import Footer from '../Components/Footer'

const HomePage = () => {
  return (
    <div>
      <Hero />
      <FeaturesSection />
      <RecentsForms /> 
      <Footer />
    </div>
  );
}

export default HomePage
