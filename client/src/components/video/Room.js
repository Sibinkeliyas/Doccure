import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

function Room() {
    const { state } = useLocation()
    const navigate = useNavigate()
    console.log(state);
    const myMeeting = async ( element ) => {
         const appID =  parseInt(process.env.REACT_APP_VIDEOCALL_APPID)
         const serverSecret = process.env.REACT_APP_VIDEOCALL_SERVERSECRET;
         const kitToken =  ZegoUIKitPrebuilt
      .generateKitTokenForTest(
         appID, 
         serverSecret, 
         state.message.to, 
         Date.now().toString(),
         state.message.user
         );
         const zc = ZegoUIKitPrebuilt.create(kitToken)
         zc.joinRoom({
            container : element ,
            scenario : {
                mode : ZegoUIKitPrebuilt.OneONoneCall ,
            } ,
            showPreJoinView : false ,
            showScreenSharingButton : false ,
            showLeavingView : true,
            onYouRemovedFromRoom: () => {
                navigate(`/${state.message.return}`)
            },
            onLeaveRoom : () => {
                navigate(`/${state.message.return}`)
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
