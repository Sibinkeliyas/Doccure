import React from 'react'
import SuccesBody from './success/SuccesBody'
import Navbar from '../home/Navbar/Navbar'
import DocNav from '../Billing/Navbar/Navbar'
import Footer from '../home/footer/Footer'

function Success() {
  return (
    <>
        <Navbar />
        <DocNav />
        <SuccesBody />
        <Footer />
    </>
  )
}

export default Success
