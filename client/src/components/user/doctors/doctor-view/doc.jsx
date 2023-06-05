import React from 'react'
import DocNav from './doc-nav/docNav'
import Navbar from '../../home/Navbar/Navbar'
import Profile from './doctor-profile-body/Profile'
import Footer from '../../home/footer/Footer'

function Doc() {
  return (
    <>
        <Navbar />
        <DocNav />
        <Profile />
        <Footer />
    </>
  )
}

export default Doc
