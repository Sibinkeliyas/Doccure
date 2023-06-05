import React  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './review.css'
import { useEffect } from 'react';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { adminAddSpeciality, adminEditSpeciality } from '../../redux/actions/admin';

function View(args) {
    const { showModel, setShowModel,  filter  } = args
    const dispatch = useDispatch()
    const [error , setError] = useState()
    const toggle = (status = false , user) => {
        setShowModel({
            ...showModel ,
            status : false ,
        })
    }
    const updateMessage = useSelector((state) => state.adminEditSpeciality)
    const addMessage = useSelector((state) => state.adminAddSpeciality)
    console.log(addMessage);
    useEffect(() => {
      if(updateMessage?.data){
        toast.success('Speciality Updated')
        updateMessage.data = false
      } else if(updateMessage?.error) {
        toast.error(updateMessage?.error)
        updateMessage.error = false
      }
    } , [updateMessage?.error , updateMessage?.data])

        useEffect(() => {
      if(addMessage?.data){
        toast.success('Speciality Added')
        addMessage.data = false
      } else if(addMessage?.error) {
        toast.error(addMessage?.error)
        addMessage.error = false
      }
    } , [addMessage?.error , addMessage?.data])
    const addSpecility = () => {
      if(!showModel.speciality) {
        setError({
          ...error ,
          speciality : 'Fill the field'
        })
      } else if(showModel.action === 'edit') {
        dispatch(adminEditSpeciality(showModel.speciality , showModel.specialityId , filter))
        setShowModel({
          ...showModel ,
          status : false
        })
      } else {
        dispatch(adminAddSpeciality(showModel.speciality , filter))
      }
      setShowModel({
        ...showModel , 
        speciality : ''
      })
    }
  return (
    <div>
    <ToastContainer />
      <Modal isOpen={showModel.status} toggle={() => {
              toggle(false)
      }} {...args} className='w-100'>
              <ModalHeader toggle={() => {
                  toggle(false)
              }}>{showModel.action === 'edit' ? 'Edit Speciality' : 'Add Speciality'}</ModalHeader>
        <ModalBody>
          <div className="admin-add-doctor-div col-12 row">
            <div className="form-input col-12 my-2">
                <label htmlFor="">Speciality</label>
                <input type="text" name="" id="" className="form-control" placeholder='Speciality' value={showModel.speciality} onChange={(e) => {
                    setShowModel({
                        ...showModel ,
                        speciality : e.target.value
                    })
                    setError({
                        ...error ,
                        speciality : ''
                    })
                }}/>
                {
                    error?.speciality && <small className='text-danger'>{error?.speciality}</small>
                }
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="info" className='w-100 text-white fw-bold' onClick={addSpecility}>
           Submit
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default View;