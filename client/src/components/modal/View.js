import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function View(args) {
  const {viewUser , showViewUser , user} = args
  const navigate = useNavigate()
  const userLogin = useSelector((State) => State.userLogin)
  // const onLogout = () => {
  //   localStorage.removeItem('user')
  //   userLogin.data = false
  //   navigate('/login')
  //   toggle()
  // }
  const toggle = () => showViewUser(!viewUser);

  return (
    <div>
      <Modal isOpen={viewUser} toggle={toggle} {...args}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          {user.name}
        </ModalBody>
        <ModalFooter>
          {/* <Button color="primary" onClick={toggle}>
            Do Something
          </Button>{' '}
          <Button color="secondary" onClick={onLogout}>
            Logout
          </Button> */}
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default View;