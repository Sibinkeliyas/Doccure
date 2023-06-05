import React, { useEffect, useState } from 'react'
import './chat.css'
import { Badge } from 'react-bootstrap'
import ScrollToBottom from 'react-scroll-to-bottom'
import io from "socket.io-client";
import { useDispatch, useSelector } from 'react-redux';
import { find_all_user_message, storeMessage , roomStore, increaseMessageCount } from '../../../../redux/actions/chat2';
import AudioFile from '../../../../assets/ringtone/music.mp3'
import { AudioRecorder } from 'react-audio-voice-recorder';
import VideoCall from '../../../modal/videoCall'
import videoFile from '../../../../assets/ringtone/videocall.mp3'
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
const socket = io.connect("http://localhost:3002");

function Chat({ doctor }) {
  const [menu , setMenu ] = useState()
  const [chat , setChat] = useState('')
  const [filter , setFilter] = useState()
  const [image , setImage] = useState({
    image : '' ,
    preview : ''
  })
  const [allUsers , setAllUser] = useState()
  const all_users = useSelector((state) => state.findAllUserMessages.data)
  const roomData = useSelector((state) => state.Room.data) 
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(find_all_user_message(doctor._id , filter))
  } , [dispatch, doctor._id, filter])

  const menuAdjustment = () => {
    if (parseInt(window.innerWidth) <= 900) {
      setMenu(!menu)
    }
  }
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    if (parseInt(windowWidth) <= 678) {
      setMenu(true)
    } else {
      setMenu(undefined)
    }
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [windowWidth]);

  const selectUser = (user) => {
    user.doctor = 0
    setAllUser(
      allUsers ,
      user
    )
    dispatch(roomStore(user._id , user.userData._id , doctor._id , 'user'))
    setChat(user)
    setMessageList([''])
    if(user.message.length >= 1) {
      setMessageList(user.message)
    }
  }

  const addAudioElement = async (blob) => {
    const formData = new FormData();
    formData.append('file', blob);
    formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET)
    formData.append('resource_type', 'auto');
    fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_ID}/upload`, {
      method: 'POST',
      body: formData,
    }).then((Data) => {
      Data.json().then(async(res) => {
        if (res.secure_url) {
          const messageData = {
            room: chat?._id,
            author: doctor._id,
            audio: res.secure_url,
            messagedAt: new Date(),
            to: chat.userId,
            time:
              new Date(Date.now()).getHours() +
              ":" +
              new Date(Date.now()).getMinutes(),
          };
          await socket.emit("send_message", messageData);
          setMessageList((list) => [...list, messageData]);
          dispatch(increaseMessageCount(doctor._id, chat?.userData?._id))
          dispatch(storeMessage(doctor._id, chat.userId, messageData , 'doctor'))
        }
      }).catch((err) => {
        console.log(err);
      })
    }).catch((err) => {
      console.log(err);
    })
  };


  useEffect(() => {
    setAllUser(all_users)
  } , [ all_users ])


  // socket io

  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    socket.emit("join_room", chat?._id);
  } , [chat?._id])

  const sendMessage = async () => {
    console.log('Send message');
    if (currentMessage !== "" && image.image === '') {
      const messageData = {
        room: chat?._id,
        author: doctor._id,
        message: currentMessage,
        messagedAt : new Date() ,
        to : chat.userId ,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      dispatch(increaseMessageCount(doctor._id, chat?.userData?._id))
      dispatch(storeMessage(doctor._id , chat.userId , messageData , 'doctor'))
      setCurrentMessage("");
    } else if(image.image !== '' && currentMessage === '') {
      const formData = new FormData()
      formData.append('file', image.image)
      formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET)
      if (formData) {
        fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_ID}/image/upload`, {
          method: 'POST',
          body: formData,
        }).then((Data) => {
          Data.json().then(async(data) => {
            const messageData = {
              room: chat?._id,
              author: doctor._id,
              image: data.url,
              messagedAt: new Date(),
              to: chat.userId,
              time:
                new Date(Date.now()).getHours() +
                ":" +
                new Date(Date.now()).getMinutes(),
            };
            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]);
            dispatch(increaseMessageCount(doctor._id, chat?.userData?._id))
            dispatch(storeMessage(doctor._id, chat.userId, messageData , 'doctor'))
            setImage({
              preview: '',
              image: ''
            })
            setCurrentMessage("");
          })
        }).catch((err) => {
          console.log(err);
        })
      } 
    } else if (image.image !== '' && currentMessage !== '') {
      const formData = new FormData()
      formData.append('file', image.image)
      formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET)
      if (formData) {
        fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_ID}/image/upload`, {
          method: 'POST',
          body: formData,
        }).then((Data) => {
          Data.json().then(async (data) => {
            const messageData = {
              room: chat?._id,
              author: doctor._id,
              image: data.url,
              message: currentMessage,
              messagedAt: new Date(),
              to: chat.userId,
              time:
                new Date(Date.now()).getHours() +
                ":" +
                new Date(Date.now()).getMinutes(),
            };
            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]);
            dispatch(increaseMessageCount(doctor._id, chat?.userData?._id))
            dispatch(storeMessage(doctor._id, chat.userId, messageData , 'doctor' ))
            setImage({
              preview : '',
              image: ''
            })
          })
        }).catch((err) => {
          console.log(err);
        })
      }
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      if(data.room.toString() === roomData?.toString()) {
        setMessageList((list) => [...list, data]);
      }
      const audio = new Audio(AudioFile);
      audio.play()
    })
    return () => {
      socket.off('receive_message');
    }
  }, [chat, roomData]);

  // video call
  const [videoCallStatus , setVideoCallStatus] = useState(false)
  const [videoCallData, setVideoCallData] = useState()
  const navigate = useNavigate()
  
   const audioRef = useRef(null);
  const videoCall = () => {
    const video = {
      from: doctor.doctorName,
      fromId: doctor._id,
      to: roomData ,
      user : chat?.userData.name ,
      return: 'user-chat'
    }
    socket.emit('videoCall', video)
  }

  useEffect(() => {
    socket.on("recieve-videoCall", (data) => {
      console.log(data);
      setVideoCallData(data)
      setVideoCallStatus(true)
      audioRef.current.play();
    })
    socket.on('recieved-videoCall-action' , data => {
      console.log(videoCallData);
      navigate('/room' , {state : { message : videoCallData}})
    })
    socket.on('recieved-videoCall-rejection' , data => {
      toast.error('Call rejected')
    })
    return () => {
      socket.off('recieve-videoCall');
      socket.off('recieved-videoCall-action')
      socket.off('recieved-videoCall-rejection')
    }
  }, [ navigate, videoCallData]);
const stopAudio = () => {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
}


  return (
    <div className='w-100 main-chat-window'>
    <ToastContainer />
    <audio ref={audioRef}>
        <source src={require('../../../../assets/ringtone/videocall.mp3')} type="audio/mpeg" />
      </audio>
        <div className="doc-chat-window">

            <div className="chat-left-sidebar p-2 " style={menu === true ? {width : '100%'} : menu === false ?  {display : 'none'} : {}}>
              <div className="chat-header w-100 h mb-3">
                <input type="text" name="" 
                className='w-100 chat-search-user  shadow border-0 rounded-pills' id="" placeholder='Search user' onChange={(e) => {
                  setFilter(e.target.value)
                }} />
              </div>
              <div className="w-100 chat-left-sidebar-users shadow rounded " >

            {
              allUsers?.map((user) => {

                return(
                  <>
                    <div className="doc-sidebar-user p-4 rounded mt-3" onClick={() => {
                        menuAdjustment()
                        selectUser(user)
                      }} style={user.userData._id === chat?.userData?._id ? {backgroundColor: 'rgb(204, 204, 204)'} : {}}>
                    <div className="doc-sidebar-user-image-div" >
                      <img src={user.userData?.picture ? `${user.userData.picture}` : require('../../../../assets/default Profile.webp')} alt="" />
                      <h4 className='m-3 fw-bold'>{user.userData.name}</h4>
                    </div>
                    <div className="doc-sidebar-user-name-div">
                        <Badge bg='success' className='rounded notification-count'>{user.doctor > 0  && user.doctor}</Badge>
                    </div>
                  </div>

                  </>
                )
              })
            }
               </div>

            </div>
            <div className="chat-right-sidebar mt-4" style={menu === true ? {display : 'none'} : menu === false ? {width : '100%'} : {}}>
                {
                  chat ?
                  <>
                <div className="right-chat-message-header shadow w-100">
                  <div className="doc-message-user-image-div ms-5">
                    <img src={chat.userData?.picture ? chat.userData.picture : require('../../../../assets/default Profile.webp')} alt="" />
                    <div className="doc-message-name-data m-3">
                      <h4 className='m-0 fw-bold'>{chat.userData.name}  {chat.userData.lastName}</h4>
                      <small className='m-0'>online</small>
                    </div>
                  </div>
                  <div className="doc-message-header-menu me-5 d-flex">
                    <i className="fa-solid fa-video text-secondary me-3" onClick={videoCall}></i>
                    <i className="fa-solid fa-bars text-secondary" onClick={menuAdjustment}></i>
                  </div>
                </div>
                <div className="chat-right-side-message shadow mt-3 w-100   bg-white" >
                  <div className="chat-right-message pt-4">
                    <ScrollToBottom className='doc-chat-main-div' style={{ overflowX: 'hidden' }}>
                      {
                        messageList.map((message) => {
                          return (
                            <>
                              <div className="message-container ms-4 ">
                                <div className={`message ${doctor._id === message.author ? 'message-me' : ''}`} style={message.image ? {width:'28%'} : {} }>
                                  <div className="message-.message-me'content ">
                                    {
                                      message.message && !message.image ? 
                                        <p className="message-text px-3">{message.message}</p>
                                        :
                                        message.message && message.image ?
                                        
                                       <>
                                          <div className="message-content">
                                            <img src={message.image} alt="fileimage"  />
                                              <div className="caption">
                                                {message.message}
                                              </div>
                                          </div>
                                       </>
                                       : message.image ?
                                          <div className="message-content">
                                            <img src={message.image} alt="fileimage" />
                                          </div>
                                          : 
                                            <>
                                              <audio className='audio' src={message.audio} controls  style={{ color: 'red', fontWeight: 'bold', width: '20px !important' }}/>
                                            </>
                                    }
                                    <span className="message-timestamp">{message.time}</span>
                                  </div>
                                </div>
                              </div>
                            </>

                          )
                        })
                      }

                    </ScrollToBottom>
                    {/* <div className="image-pop ms-5 mb-5 pop-up">

                    </div> */}
                  </div>
                  <div className="chat-message-input mb-5 pb-5">
                    
                      {image.preview && (
                      <div className="image-preview">
                        <img src={image.preview} alt="Preview" />
                        </div>
                      ) }

                  <div id="image-preview"></div>
                    <label for="file-upload" className="file-button btn text-secondary bg-white">
                      <i className="fa-solid fa-paperclip"></i>
                    </label>
                    <input id="file-upload" className='display-none' type="file" style={{display:'none'}} onChange={(e) => {
                      setImage({
                        image : e.target.files[0] ,
                        preview : URL.createObjectURL(e.target.files[0])
                      })
                    }} onKeyPress={(e) => {
                      e.key === 'Enter' && sendMessage()
                    }}/>

                    <input type="text"
                      name="" id=""
                      className='w-75 rounded'
                      placeholder='Send Your message'
                      value={currentMessage}
                      onChange={(e) => {
                        setCurrentMessage(e.target.value)
                      }}
                      onKeyPress={(e) => {
                        e.key === 'Enter' && sendMessage()
                      }}
                    />
                    <div className=" ms-3">
                      <AudioRecorder
                        onRecordingComplete={addAudioElement}
                        audioTrackConstraints={{
                          noiseSuppression: true,
                          echoCancellation: true,
                        }}
                        // downloadOnSavePress={true}
                        downloadFileExtension="mp3"
                        className='ms-2'
                      />
                    </div>
                    <button className='btn ms-3 bg-success text-white send-button' onClick={sendMessage}><i className="fa-solid fa-paper-plane "></i></button>
                  </div>
                </div>
                  </>
                  :
              <div className="landingPage w-100  shadow rounded">
                    <img src={require('../../../../assets/doccure-1669215346-logo.webp')} alt="" />
              </div>
                }
            </div>
        </div>
        {
          videoCallStatus &&
            <VideoCall 
              setVideoCallStatus={ setVideoCallStatus} 
              videoCallStatus ={videoCallStatus}
              videoCallData={videoCallData}
              socket={socket}
              stopAudio={stopAudio}
            />
        }
    </div>
  )
}

export default Chat
