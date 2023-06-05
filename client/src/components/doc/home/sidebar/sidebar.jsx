import React from 'react'
import io from "socket.io-client";
const socket = io.connect("http://localhost:3002");


function Sidebar({option ,setOption , logout , doctor , open , setOpen}) {
  
  return (
    <div className='doc-sidebar ms-5 my-4' style={open === true ? {width:'85%'} :open === false && parseInt(window.innerWidth) <= 678 ? {display:'none'} : {}}>
      <div className='doc-image-data shadow mb-3'>
        <div className="doc-image-roud mt-3">
            <div className="doc-image ">
               <img src={doctor?.picture ? `${process.env.REACT_APP_BACKEND_URL}/${doctor?.picture}` : require('../../../../assets/default Profile.webp') } className='w-100 h-100 ' alt="" />
            </div>
        </div>
        <div className="doc-details mt-3">
            <h5>DR. { doctor?.doctorName }</h5>
            <p>{doctor?.education?.degree}, {doctor?.education?.collage}</p>
        </div>
      </div>
      <div className="doc-options">
        <div className="doc-dashboard doc-option shadow px-4" style={option === 'Dashboard' ? { backgroundColor:'#0ce0ff' , color:'white'} : {}} onClick={() => {
          setOption('Dashboard')
          if(parseInt(window.innerWidth) <= 678) {
            setOpen(false)
          }
        }}>
            <i className="fa-solid fa-table-columns me-2"></i>
            Dashboard
        </div>
        <div className="doc-dashboard doc-option shadow my-4 px-4" style={option === 'My Patients' ? { backgroundColor: '#0ce0ff', color: 'white' } : {}} onClick={() => {
          setOption('My Patients')
           if(parseInt(window.innerWidth) <= 678) {
            setOpen(false)
          }
        }}>
            <i className="me-2 fa-solid fa-hospital-user"></i>
            My Patients
        </div>
        <div className="doc-dashboard doc-option shadow mb-4 px-4" style={option === 'Schedule Time' ? { backgroundColor: '#0ce0ff', color: 'white' } : {}} onClick={() => {
          setOption('Schedule Time')
           if(parseInt(window.innerWidth) <= 678) {
            setOpen(false)
          }
        }}>
            <i className="fa-solid fa-clock me-2"></i>
            Schedule Time
        </div>
        <div className="doc-dashboard doc-option shadow mb-4 px-4" style={option === 'Message' ? { backgroundColor: '#0ce0ff', color: 'white' } : {}} onClick={() => {
          socket.emit("join_room", doctor?._id);
          setOption('Message')
           if(parseInt(window.innerWidth) <= 678) {
            setOpen(false)
          }
        }}>
            <i className="fa-solid fa-message me-2"></i>
            Message
        </div>
        <div className="doc-dashboard doc-option shadow mb-4 px-4" style={option === 'Reviews' ? { backgroundColor: '#0ce0ff', color: 'white' } : {}} onClick={() => {
          setOption('Reviews')
           if(parseInt(window.innerWidth) <= 678) {
            setOpen(false)
          }
        }}>
            <i className="fa-sharp fa-solid fa-users me-2"></i>
            Reviews
        </div>
        <div className="doc-dashboard doc-option shadow mb-4 px-4" style={option === 'Profile Edit' ? { backgroundColor: '#0ce0ff', color: 'white' } : {}} onClick={() => {
          setOption('Profile Edit')
           if(parseInt(window.innerWidth) <= 678) {
            setOpen(false)
          }
        }}>
            <i className="fa-solid fa-user me-2"></i>
            Profile Edit
        </div>
        <div className="doc-dashboard doc-option shadow mb-4 px-4" style={option === 'Change Password' ? { backgroundColor: '#0ce0ff', color: 'white' } : {}} onClick={() => {
          setOption('Change Password')
           if(parseInt(window.innerWidth) <= 678) {
            setOpen(false)
          }
        }}>
            <i className="fa-solid fa-lock me-2"></i>
            Change Password 
        </div>
        <div className="doc-dashboard doc-option shadow mb-4 px-4" onClick={logout}>
            <i className="fa-solid fa-right-from-bracket me-2"></i>
            Logout
        </div>
      </div>
    </div>
  )
}

export default Sidebar
