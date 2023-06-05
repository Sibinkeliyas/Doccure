import React from 'react'
import Body from './ProfileBody/Body'
import Navbar from '../../home/Navbar/Navbar'
import DocNav from './ProfileBody/DocNav'
import Footer from '../../home/footer/Footer'

function  ProfileEdit() {
  return (
    <>
        <Navbar />
        <DocNav />
        <Body />
        <Footer />
    </>
  )
}

export default ProfileEdit
