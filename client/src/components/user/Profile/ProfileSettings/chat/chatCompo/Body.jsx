import React from 'react'
import './body.css'

function Body() {
  return (
    <>
        <div className="user-main-chat-div">
            <div className="user-chat-header">
                <div className="user-chat-header-left-part user-chat-header-part">
                    <h3 className="user-chat-title ms-3 ">Chats</h3>
                    <i class="fa-solid fa-circle-plus me-2 "></i>
                </div>
                <div className="user-chat-header-right-part user-chat-header-part">
                    <div className="user-doctor-image-and-details">
                        <img src={require('../../../../../assets/img/doctors/doctor-01.jpg')} alt="" className='user-chat-doctor-image ms-2'/>
                        <div className="user-chat-doctor-details ms-4">
                            <p className='docor-user-chat-doctor-name '>Dr. Darren Elder</p>
                            <p>Online</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Body
