import React from 'react'
import Body from './body/Body'
import Clinic from './clinicSpeciality/Clinic'
import Footer from './footer/Footer'
import Navbar from './Navbar/Navbar'

function Home() {
  return (
    <div>
      <Navbar />
      <Body />
      <Clinic />
      <Footer />
    </div>
  )
}

export default Home
