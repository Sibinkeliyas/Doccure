import React  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './review.css'
import SelectTag from 'react-select';
import { useEffect } from 'react';
import { useState } from 'react';
import { adminAddDoctors } from '../../redux/actions/admin';
import { ToastContainer, toast } from 'react-toastify';
import { loginValidation } from '../../helpers/validation';

function View(args) {
    const { addDoctorModelStatus, showaddDoctorModelStatus, speciality, genderOptions, filter } = args
    const [specialities , setSpeciality] = useState()
    const [gender , setGender] = useState()
    const [doctorData , setDoctorData] = useState()
    const dispatch = useDispatch()
    const [error , setError] = useState()
    const addMessage = useSelector((state) => state.adminAddDoctors)
    const toggle = (status = false , user) => {
        showaddDoctorModelStatus({
            ...addDoctorModelStatus,
            status: false
        })
    }
    const handleSpeciality = (value) => {
        setSpeciality(value)
        setDoctorData({
            ...doctorData ,
            speciality : value.value,
            specialityId : value._id
        })
        setError({
            ...error ,
            speciality : ''
        })
    }
    const hadleGender = (value) => {
        setGender(value)
        setDoctorData({
            ...doctorData ,
            gender : value.value
        })
        setError({
            ...error,
            gender: ''
        })
    }
    const addDoctor = () => {
        const regexPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!doctorData?.doctorName || !doctorData?.email || !doctorData?.password || !doctorData?.speciality || !regexPattern.test(doctorData?.email)) {
            loginValidation(doctorData , setError)
        } else {
            dispatch(adminAddDoctors(doctorData, filter))
            setDoctorData({
                doctorName : '' ,
                email : '' ,
                password : '' ,
                phone : '' ,
                gender : '' ,
                speciality : '' ,
                specialityId : ''
            })
            setGender('')
            setSpeciality('')
        }
    }
    useEffect(() => {
        if(addMessage?.data) {
            toast.success('Doctor Added succesfully 🎉🎉')
            addMessage.data = false
        } else if(addMessage.error){
            toast.error(addMessage.error)
            addMessage.error = false
        }
    } , [ addMessage ])
  return (
    <div>
    <ToastContainer />
      <Modal isOpen={addDoctorModelStatus.status} toggle={() => {
              toggle(false)
      }} {...args} className='w-100'>
              <ModalHeader toggle={() => {
                  toggle(false)
              }}>Add Doctor</ModalHeader>
        <ModalBody>
          <div className="admin-add-doctor-div col-12 row">
            <div className="form-input col-6 my-2">
                <label htmlFor="">Doctor Name</label>
                <input type="text" name="" id="" className="form-control" placeholder='Name' value={doctorData?.doctorName} onChange={(e) => {
                    setDoctorData({
                        ...doctorData ,
                        doctorName : e.target.value
                    })
                    setError({
                        ...error ,
                        doctorName : ''
                    })
                }}/>
                {
                    error?.doctorName && <small className='text-danger'>{error?.doctorName}</small>
                }
            </div>
            <div className="form-input col-6 my-2">
                <label htmlFor="">Email</label>
                <input type="text" name="" id="" className="form-control " placeholder='Email' value={doctorData?.email} onChange={(e) => {
                    setDoctorData({
                        ...doctorData,
                        email: e.target.value
                    })
                    setError({
                        ...error , 
                        email : ''
                    })
                }} />
                {
                    error?.email && <small className='text-danger'>{error?.email}</small>
                }                
            </div>
            <div className="form-input col-6 my-2">
                <label htmlFor="">Password</label>
                <input type="text" name="" id="" className="form-control " placeholder='Password' value={doctorData?.password} onChange={(e) => {
                    setDoctorData({
                        ...doctorData,
                        password: e.target.value
                    })
                    setError({
                        ...error ,
                        password : ''
                    })
                }} 
                />
                {
                    error?.password && <small className='text-danger'>{error?.password}</small>
                }
            </div>
            <div className="form-input col-6 my-2">
                <label htmlFor="">Phone</label>
                <input type="text" name="" id="" className="form-control " placeholder='Phone' value={doctorData?.phone} onChange={(e) => {
                    setDoctorData({
                        ...doctorData ,
                        phone : e.target.value
                    })
                    setError({
                        ...error ,
                        phone : ''
                    })
                }}/>
                {
                    error?.phone && <small className='text-danger'>{error?.phone}</small>
                }
            </div>
            <div className="form-input col-4 col-sm-6 col-12 mt-3">
                <SelectTag
                    className="basic-single  border-0 col-12"
                    classNamePrefix="Speiciality"
                    isSearchable
                    name="Speiciality"
                    options={speciality}
                    onChange={handleSpeciality}
                    value={specialities}
                    placeholder='Speciality'
                />
                {
                    error?.speciality && <small className='text-danger'>{error?.speciality}</small>
                }
             </div>
            <div className="form-input col-4 col-sm-6 col-12 mt-3 border-0">
                <SelectTag
                    className="basic-single col-12"
                    classNamePrefix="Speiciality"
                    isSearchable
                    name="Speiciality"
                    options={genderOptions}
                    onChange={hadleGender}
                    value={gender}
                    placeholder='Gender'
                />
                {
                    error?.gender && <small className='text-danger'>{error?.gender}</small>
                }
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="info" className='w-100 text-white fw-bold' onClick={addDoctor}>
            Add Doctor
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default View;