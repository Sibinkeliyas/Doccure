import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

function Room() {
    const { state } = useLocation()
    const navigate = useNavigate()

    const myMeeting = async ( element ) => {
         const appID =  1733039021;
         const serverSecret = "ff2f96bdb8b64e452010de8bec0b3e7a";
         const kitToken =  ZegoUIKitPrebuilt
      .generateKitTokenForTest(
         appID, 
         serverSecret, 
         state.message.room, 
         Date.now().toString(),
         state.name
         );
         const zc = ZegoUIKitPrebuilt.create(kitToken)
         zc.joinRoom({
            container : element ,
            // sharedLinks : [{
            //     name : 'Copy Link' ,
            //     url : `http://localhost:3000/room/${roomid}`
            // }] ,
            scenario : {
                mode : ZegoUIKitPrebuilt.OneONoneCall ,
            } ,
            showPreJoinView : false ,
            showScreenSharingButton : false ,
            showLeavingView : true,
            onYouRemovedFromRoom: () => {
                navigate('/')
            },
            onLeaveRoom : () => {
                navigate('/')
            }
         })

    }
  return (
    <div>
      <div ref={myMeeting}
        className="myCallContainer"
        style={{ width: '100vw', height: '100vh' }}
      />
    </div>
  )
}

export default Room
