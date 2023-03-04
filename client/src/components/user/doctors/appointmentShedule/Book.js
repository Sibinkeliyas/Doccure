import React from 'react'
import Docnavbar from './Navbar/Navbar'
import Navbar from '../../home/Navbar/Navbar'
import Body from './appointmentbody/Body'
import Footer from '../../home/footer/Footer'

function Book() {
  return (
    <>
        <Navbar />
        <Docnavbar/>
        <Body />
        <Footer />
    </>
  )
}

export default Book
