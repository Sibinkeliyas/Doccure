import React, { useEffect, useRef, useState } from 'react'
import './chat.css'
import { Badge } from 'react-bootstrap'
import ScrollToBottom from 'react-scroll-to-bottom'
import io from "socket.io-client";
import { useDispatch, useSelector } from 'react-redux';
import { createMessage, decreaseMessageCount, find_all_doctor_message, roomStore, storeMessage } from '../../../../../redux/actions/chat2';
import AudioFile from '../../../../../assets/ringtone/music.mp3'
import VideoCall from '../../../../modal/videoCall'
import { AudioRecorder } from 'react-audio-voice-recorder';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const socket = io.connect("http://localhost:3002");

function  Chat({userData}) {
  const [menu , setMenu ] = useState()
  const [chat , setChat] = useState(false)
  const [videoCallStatus , setVideoCallStatus] = useState(false)
  const [filter , setFilter] = useState()
    const [image , setImage] = useState({
    image : '' ,
    preview : ''
  })
  const [allUsers , setAllUsers] = useState()
  const all_doctors = useSelector((state) => state.findAllUserMessages.data)
  const createdMessage = useSelector((state) => state.createMessage.data)

  useEffect(() => {
    setAllUsers(all_doctors)
  } , [ all_doctors])

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(find_all_doctor_message(userData?._id , filter))
  } , [dispatch, userData?._id, filter])

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
    for(let i=0;i<user?.count.length;i++) {
      if(user.count[i].id === userData._id) {
        user.count[i].count = 0
        break;
      }
    }
    setMessageList([])
    setAllUsers(
      allUsers ,
      user
    )
    dispatch(decreaseMessageCount(user?._id , userData?._id))
    dispatch(createMessage(user._id , userData._id ,))
    dispatch(roomStore(user._id , userData._id , user._id , 'doctor'))
    setChat(user)
  }

  useEffect(() => {
    if(createdMessage?.message.length >= 1) {
      setMessageList(createdMessage?.message)
    }
  } , [ createdMessage ])

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
            room: createdMessage?._id,
              author: userData?._id,
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
          dispatch(storeMessage(chat._id , userData?._id , messageData , 'user'))
        }
      }).catch((err) => {
        console.log(err);
      })
    }).catch((err) => {
      console.log(err);
    })
  };

  // socket io

  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    socket.emit("join_room", createdMessage?._id);
  } , [createdMessage?._id])

  const sendMessage = async () => {
    if (currentMessage !== "" && image.image === '') {
      const messageData = {
        room: createdMessage?._id,
        author: userData?._id,
        message: currentMessage,
        messagedAt : new Date() ,
        to : chat._id ,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      dispatch(storeMessage(chat._id , userData?._id , messageData , 'user'))
      
      setCurrentMessage("");
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
              room: createdMessage?._id,
              author: userData?._id,
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
            dispatch(storeMessage(chat._id , userData?._id , messageData , 'user'))
            setImage({
              preview : '',
              image: '' 
            })
            setCurrentMessage("");
          })
        }).catch((err) => {
          console.log(err);
        })
      }
    } else if (image.image !== '' && currentMessage === '') {
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
              room: createdMessage?._id,
              author: userData?._id,
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
            dispatch(storeMessage(chat._id , userData?._id , messageData , 'user'))
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
      setMessageList((list) => [...list, data]);
      const audio = new Audio(AudioFile);
      audio.play()
    })
    return () => {
      socket.off('receive_message');
    }
  }, []);


  // video call
const [videoCallData , setVideoCallData] = useState()
const navigate = useNavigate()
 const audioRef = useRef(null);
  const videoCall = () => {
    const video = {
      from : userData.name ,
      fromId : userData._id ,
      to : createdMessage?._id ,
      user : chat.doctorName ,
      return : 'doctor/'
    }
    console.log(video);
    socket.emit('videoCall', video )
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
        <source src={require('../../../../../assets/ringtone/videocall.mp3')} type="audio/mpeg" />
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
              allUsers?.map((doctor) => {
                return(
                  <>
                    <div className="doc-sidebar-user p-4 rounded mt-3" onClick={() => {
                        menuAdjustment()
                        selectUser(doctor)
                      }} style={doctor._id === chat?._id ? {backgroundColor: 'rgb(204, 204, 204)'} : {}}>
                    <div className="doc-sidebar-user-image-div" >
                      <img src={doctor?.picture ? `${process.env.REACT_APP_BACKEND_URL}/${doctor.picture}` : require('../../../../../assets/default Profile.webp')} alt="doctor" style={{width:'60px' , height:'55px'}}/>
                      <h4 className='m-3 fw-bold'>{doctor.doctorName}</h4>
                    </div>
                    <div className="doc-sidebar-user-name-div">
                        {
                          doctor.count?.map((count) => {
                            if(count?.id === userData?._id && count?.count > 0) {
                             return(
                              <>
                                <Badge bg='success' className='rounded notification-count'>{count.count}</Badge>
                              </>
                            )
                            } else return <></>
                            
                          })
                        }
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
                    <img src={chat?.picture ? `${process.env.REACT_APP_BACKEND_URL}/${chat.picture}` : require('../../../../../assets/default Profile.webp')} alt="doctor" style={{width:'60px' , height:'55px'}} />
                    <div className="doc-message-name-data m-3">
                      <h4 className='m-0 fw-bold'>{chat.doctorName}</h4>
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
                        messageList?.map((message) => {
                          return (
                            <>
                              <div className="message-container ms-4 ">
                                <div className={`message ${userData._id === message.author ? 'message-me' : ''}`} style={message.image ? {width:'28%'} : {}}>
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
                                       :
                                         message.image ?
                                          <div className="message-content">
                                            <img src={message.image} alt="fileimage" />
                                          </div>
                                          : 
                                            <>
                                              <audio className='audio' src='https://res.cloudinary.com/dv8hkgi1z/video/upload/v1685723537/nstd5yc6klldjyc8kk4j.webm' controls  />
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
                  </div>
                  <div className="chat-message-input mb-5 pb-5">
                    {image.preview && (
                      <div className="image-preview">
                        <img src={image.preview} alt="Preview" />
                        </div>
                      ) }
                  <label for="file-upload" className="file-button btn text-secondary bg-white ms-3">
                      <i className="fa-solid fa-paperclip"></i>
                    </label>
                    <input id="file-upload" className='display-none' type="file" style={{display:'none'}} onChange={(e) => {
                      setImage({
                        image : e.target.files[0] ,
                        preview : URL.createObjectURL(e.target.files[0])
                      })
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
                    <button className='btn ms-3 me-2 bg-success text-white send-button' onClick={sendMessage}><i className="fa-solid fa-paper-plane "></i></button>
                  </div>
                </div>
                  </>
                  :
              <div className="landingPage w-100  shadow rounded">
                    <img src={require('../../../../../assets/doccure-1669215346-logo.webp')} alt="" />
              </div>
                }
            </div>
        </div>
        {
          videoCallStatus &&
          <VideoCall 
            setVideoCallStatus={setVideoCallStatus}
            videoCallStatus={videoCallStatus}
            videoCallData={videoCallData}
            socket={socket}
            stopAudio={stopAudio}
            />
        }
    </div>
  )
}

export default Chat
