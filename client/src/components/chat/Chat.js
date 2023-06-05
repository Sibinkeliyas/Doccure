// import React, { useEffect, useState } from 'react'
// import './chat.css'
// import ScrollToBottom from 'react-scroll-to-bottom'
// // import { Badge } from 'reactstrap';
// // import "bootstrap/dist/css/bootstrap.min.css";
// import { useDispatch, useSelector } from 'react-redux';
// import { getMessage, message,  usernotification , viewNotification } from '../../redux/actions/chat';
// import { user , userDoctors } from '../../redux/actions/user';
// import ViewUser from '../modal/View.js'
// import io from "socket.io-client";
// import AudioFile from '../../assets/ringtone/music.mp3'
// import { useNavigate } from 'react-router-dom';
// import VideoCallModal from '../modal/videoCall.js'
// import { Badge } from 'rsuite';
// // import { onMessageListener } from '../../firebaseinit';
// // import Notifications from '../notification/Notification';

// // const socket = io(('http://localhost:3002'))


// function Chat() {

//   const [showSidebar , setShowSidebar ] = useState(true)
//   const [currentMessage , setCurrentMessage] = useState('')
//   const [messageList , setMessageList ] = useState([])
//   const [viewUser , showViewUser] = useState(false)
//   const [selectedUser , setSelectedUser] = useState() 
//   const [typing , setTyping ] = useState(false)
//   const [videoCall ,setVideoCall ] = useState(false)
//   const [ , setVideoCallStatus] = useState(false)
//   const [videoCallUser , setVideoCallUser] = useState()
//   const [notStatus , setNotStatus] = useState(true)
//   const navigate = useNavigate()

  
//   // const [show, setShow] = useState(false);
//   // const [notification, setNotification]=useState({title:"",body:""});
//   const [notificationCount , setCount] = useState(false)
//   const dispatch = useDispatch()
//   const userLogin = useSelector((state) => state.userLogin.data)
//   const userData = useSelector((state) => state.user.data)
//   const doctorData = useSelector((state) => state.userDoctor.doctor?.data?.data)
//   const userMessage = useSelector(state => state.message.data)
//   const w = window.innerWidth;
//   // useEffect
//   useEffect(() => {
//     dispatch(userDoctors())
//   } , [dispatch, userLogin._id])

//   // useEffects

//     useEffect(() => {
//     socket.on("receive_message", (data) => {
//       if(data.room === userMessage._id) {
//         setMessageList((list) => [...list, data]);
//       }
//     });
//     socket.on('recieve_notification' , async(data) => {
//         dispatch(userDoctors())
//         if( data && doctorData?.length ) {
//           dispatch(usernotification(userLogin._id , data.from))
//           for(let i=0;i<doctorData.length;i++) {
//             if(data.from === doctorData[i]._id) {
//               doctorData[i].messageCount = parseInt(doctorData[i].messageCount) + 1
//             //   setCount({
//             //   ...notificationCount ,
//             //   [userList[i]._id] : userList[i].messageCount + 1
//             // })
//             setNotStatus(false)
//             }
//           }
//           const audio = new Audio(AudioFile);
//           audio.play()
//         }
//     })
//     socket.on('recieve_type_info' , data => {
//       setTyping(data)
//     })

//     socket.on('send_video_notification' , data => {
//       setVideoCall(true)
//       setVideoCallUser(data)
//     })
//    return () => {
//      socket.off('receive_message');
//      socket.off('recieve_notification')
//      socket.off('recieve_type_info')
//      socket.off('send_video_notification')
//    }
//   }, [dispatch, doctorData?.length, userLogin._id, userMessage]);
//    useEffect(() => {
//      socket.emit("join_room", userLogin);
//      dispatch(user(userLogin._id))
//   } , [dispatch, userLogin])

//   useEffect(() => {
//     if(!doctorData) {
//       dispatch(userDoctors())
//     }
//   } , [dispatch, doctorData, userLogin._id])

//   useEffect(() => {
//     if (userMessage) {
//       setMessageList('')
//       setMessageList((list) => [...list, ...userMessage.message]);
//       socket.emit("join_room", userMessage);
//     }
//   }, [ userMessage ])

//   useEffect(() => {
//    if(userData?.message && doctorData && notStatus === true) {
//      for(let i=0 ; i<doctorData?.length ; i++) {
//          userData.message.findIndex((item) => {
//           if(item.id === doctorData[i]._id) {
//             doctorData[i].messageCount = item.count
//             setCount({
//               ...notificationCount ,
//               [doctorData[i]._id] : item.count
//             })
//           }
//          })
//       }
//           setCount(notificationCount + 1)
//     }

//   } , [doctorData , userData ])

//   // functions
//   const menu = (val) => {
//       setShowSidebar(val) 
//   }
//   // send message
//   const sendMessage = async() => {
//     if(currentMessage !== '') {
//       const messageData = {
//       user1: userMessage.user1,
//       user2: userMessage.user2,
//       to: selectedUser._id,
//       from : userLogin._id ,
//       message: {
//         room: userMessage._id,
//         author: userLogin._id,
//         message: currentMessage,
//         time:
//           new Date(Date.now()).getHours() +
//           ":" +
//           new Date(Date.now()).getMinutes(),
//       }
//     };
//       await socket.emit("send_message", messageData);
//       await socket.emit("send_notification", messageData);
//       setMessageList((list) => [...list, messageData.message]);
//       dispatch(message(messageData.user1 , messageData.user2 , messageData.message))
//       setCurrentMessage("");
//     }
//   }
//   const sendTypinginfo = (typing) => {
//     const data = {
//       typing ,
//       to : userMessage._id
//     }
//     socket.emit("send_type_info", data );
//   }

//   const userSettings = (user => {
//       if (w <= 826) menu(false)
//       dispatch(viewNotification(userLogin._id , user._id))
//       user.messageCount = 0
//       dispatch(message(userLogin._id , user._id))
//       dispatch(getMessage(user._id, userLogin._id))
//       setSelectedUser(user)
//   })
// const video_call = () => {
//    const messageData = {
//       user1: userMessage.user1,
//       user2: userMessage.user2,
//       to: selectedUser._id,
//       from : userLogin._id ,
//       showPreJoinView : false ,
//       name : userLogin.name ,
//       message: {
//         room: userMessage._id,
//         author: userLogin._id,
//         message: currentMessage,
//         time:
//           new Date(Date.now()).getHours() +
//           ":" +
//           new Date(Date.now()).getMinutes(),
//       }
//     };
//     socket.emit('send_video_notification' , messageData)
//     navigate('/room' , {state : messageData})
// }



//   // FIREBASE NOTIFICATION

// // useEffect(() => {
// //   onMessageListener()
// //    .then((payload) => {
// //       setShow(true);
// //       setNotification({
// //         title: payload.notification.title,
// //         body: payload.notification.body,
// //       });
// //       console.log(payload);
// //    })
// // .catch((err) => console.log("failed: ", err));
// // } , [])



//   return (
//     <>
//     	<div className="chat-window">
//       {/* <Notifications /> */}
//         <div className="left-sidebar" style={showSidebar ? {display:'block'} : {display : 'none'}}>
//           <div className="left-bar-nav">

//             <div className="header">
//               <h3>Chat</h3>
//             </div>
//             <div className="options" >
//               <img 
//               src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg" 
//               alt="" 
//               className='Profile-image' 
//                 onClick={() => {
//                   showViewUser(!viewUser)
//                 }}
//               />  
//             </div>
//           </div>
//             {
//               viewUser && <ViewUser 
//               showViewUser={showViewUser} 
//               viewUser={viewUser} 
//               user={userLogin}/>
//             }
//             {
//               videoCall && <VideoCallModal 
//               showViewUser={setVideoCall} 
//               viewUser={videoCall} 
//               user={userLogin}
//               from = {videoCallUser}
//               setVideoCallStatus = {setVideoCallStatus}
//               />
//             }

//           <div className="search-bar">
//             <input type="text" name="search" id="" />
//           </div>

//           <div className='chat-users border border-light'>

//             {
              
//               doctorData?.map((user , index) => {
//                 return(
//                   <div className="users-list" onClick={async() => {
//                     userSettings(user)
//                   }}>
//                     <div className="user-data " key={index}>
//                       <img src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg" alt="" className='Profile-image' />
//                       <div className="user-name-data">
//                         <p className='fw-25 text-dark user-name'>Dr. {user.doctorName}</p>
//                         <p>Hey How are you</p>
//                       </div>
//                     </div>
//                     <div className="number-of-notification">
                    
//                      {
//                       user.messageCount > 0 &&   <Badge color="" className='notification-badge text-white bg-success-light bg-success rounded-circle'>{user.messageCount}</Badge> 
//                      } 
//                     </div>
//                   </div>
//                 )
//               })

//             }

//           </div>
//         </div>

//         <div className="right-sidebar" style={showSidebar ? {} : {width:'100%' , display:'block'}}>

//           {
//             userMessage === undefined || userMessage.message === undefined
//             ?
//             <img src={require('../../assets/loading-screen-image.webp')} alt='img' className='whatsapploadingimage'/>
//             :
//             <>
//               <div className="right-bar-nav p-3">

//             <div className="header">
//                <div>
//                 <img src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg" alt="" className='Profile-image' />
//                </div>
//               <div className="user-name-data">
//                 <p className='fw-25 text-dark user-name'>{selectedUser?.name}</p>
//                 {/* <Badge color="" className='notification-badge text-success bg-success-light bg-success rounded-circle'>.</Badge> */}
//                 <p style={{fontSize:'11px'}}>{typing === false ? 'Online' : 'Typing...'}</p>
//               </div>
//             </div>

//             <div className="right-options me-5 menubar-icon">
//               <i className="fa-solid fa-phone m-3 menubar-icon"></i>
//               <i className="fa-solid fa-video m-3 menubar-icon" onClick={video_call}></i>
//               <i className="fa-solid fa-bars m-3 menubar-icon" onClick={() =>{
//                 menu(!showSidebar)
//               }}></i>
//             </div>
//           </div>

//           <ScrollToBottom className='chat-window h-75 p-5'>
//             <div className="chat-container p-3">
//             {
//               messageList?.map((message , index) => {
//                 return(
//                   <>
//                     <div key={index} className={`chat-message my-2 p-2 mb-4 ${userLogin._id === message.author ? 'chat-message-me float' : 'chat-message-you'}`}>
//                       <p className='chat-time mr-2 '>{message?.time}</p>
//                       <p className='chat-message-user'>{message?.message}</p>
//                     </div>
//                   </>
//                 )
//               })
//             }
//             </div >
//           </ScrollToBottom>
//           <div className="chat-input-box">
//             <input type="text" name="chat" id="" 
//             value={currentMessage}
//             onKeyPress={(event) => {
//               event.key === "Enter" && sendMessage();
//             }} 
//               onChange={(e) => {
//                 setCurrentMessage(e.target.value)
//                 sendTypinginfo("Typing")
//               }}
//             onKeyUp={() => {
//               setTimeout(() => {
//                 sendTypinginfo(false)
//               } , 1000)
//             }}
//             />
//             <i className ="fa-sharp fa-solid fa-paper-plane-top"></i>
//           </div>
//             </>
//           }
//         </div>
//       </div>
//     </>
//   )
// }

// export default Chat
