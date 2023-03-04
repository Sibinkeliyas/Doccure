import React from 'react'
import Doctornavbar from './doctor-navabr/Doctor_navbar'
import Navbar from '../home/Navbar/Navbar'
import Doctorbody from './doctor-Body/Doctor_body'
import Footer from '../home/footer/Footer'


function Doctor() {
  return (
    <>
        <Navbar />
        <Doctornavbar />
        <Doctorbody />
        <Footer />
    </>
  )
}

export default Doctor
