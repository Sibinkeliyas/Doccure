import React  from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function View(args) {
  const {videoCallStatus , setVideoCallStatus , videoCallData , socket , stopAudio} = args
  const navigate = useNavigate()

  const toggle = (status) => {
    stopAudio()
   setVideoCallStatus(!videoCallStatus)
   if(status) {
    socket.emit('videoCallAction' , videoCallData)
    navigate('/room' , {state : { message : videoCallData}})
   } else {
    socket.emit('videoCallReject' , videoCallData)
   }
  }

  return (
    <div>
      <Modal isOpen={videoCallStatus} toggle={toggle} {...args}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          {videoCallData?.from}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => {
            toggle(true)
          }}>
            Accept
          </Button>{' '}
          <Button color="danger" onClick={() => {
            toggle(false)
          }}>
            Reject
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default View;