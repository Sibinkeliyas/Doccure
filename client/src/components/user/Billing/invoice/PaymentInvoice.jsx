import React from 'react'
import Body from './invoiceBody/Body'
import Navbar from '../../home/Navbar/Navbar'
import DocNav from './invoiceBody/DocNav'
import Footer from '../../home/footer/Footer'


function Invoice() {
  return (
    <>
        <Navbar />
        <DocNav />
        <Body />
        <Footer />
    </>
  )
}

export default Invoice
