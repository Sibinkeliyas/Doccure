import React, { useEffect } from 'react'
import Nav from '../../home/Navbar/Navbar'
import SideNav from './Nav'
import { useDispatch, useSelector } from 'react-redux'
import { userdetails } from '../../../../redux/actions/user'
import ChatC from '../chat/body/chat'

function Chat() {
    const userData = useSelector((state) => state.userLogin.data)
    const user = useSelector((state) => state.userDetailsReducer.data)
    console.log(user);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(userdetails(userData._id))
    } , [ ])
  return (
    <div>
      <Nav />
      <SideNav />
      <ChatC 
       userData={user} />
    </div>
  )
}

export default Chat
