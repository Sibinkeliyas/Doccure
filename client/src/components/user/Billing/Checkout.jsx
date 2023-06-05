import React from 'react'
import Billing from './Billing/Billing'
import DocNavbar from '../Billing/Navbar/Navbar'
import Navbar from '../home/Navbar/Navbar'
import Footer from '../home/footer/Footer'

function Checkout() {
  return (
    <>
        <Navbar />
        <DocNavbar />
        <Billing />
        <Footer />
    </>
  )
}

export default Checkout
