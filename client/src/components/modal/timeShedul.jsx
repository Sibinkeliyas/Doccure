import React, { useState }  from 'react';
// import { useDispatch } from 'react-redux';
import {  Modal, ModalHeader, ModalBody } from 'reactstrap';
import './review.css'
import { useEffect } from 'react';
import { toast , ToastContainer } from 'react-toastify'
import { useSelector } from 'react-redux';

function TimeShedule(args) {
  const { timeSchedule, showTimeScheduleStatus,  setTime, scheduleTime, addTime,   setAddTime , timeState } = args
  const [showAdd , setShowAdd ] = useState(false)
  let error = useSelector((state) => state.addTime)
  const toggle = () => {
        showTimeScheduleStatus({
            ...timeSchedule,
            status: false
        })
  }
  useEffect(( ) => {
    if(error.err) {
      toast.error(error.err)
      error.err = undefined
    }
  } , [ error ])

  const timeFucntion = (time) => {
    addTime(time)
    
    setAddTime(!timeState)
    
  }


  return (
    <div>
      <Modal isOpen={timeSchedule.status} toggle={() => {
              toggle(false)
      }} {...args}>
              <ModalHeader toggle={() => {
                  toggle(false)
        }} ><h5 style={{fontWeight:'bold'}}>Add Time</h5> </ModalHeader>
        <ModalBody>
        <ToastContainer />
          <div className="ratingstar d-flex justify-content-center w-100 p-3 " >
              <div className="row col-12">
                    <div className='row col-12'>
                    </div>
                          <div className="doc-time-add col-12 w-100">
                              <button className='btn ' onClick={() => {
                                  setShowAdd(true)
                              }}>Add<i className="fa-solid fa-add ms-2"></i></button>
                          </div>
                          <div className='row col-12'>
                             {
                                showAdd &&
                                <>
                                      <div className="form-group col-5 mb-2">
                                          <label htmlFor="staticEmail2" className="text-secondary" >Starting Time</label>
                                          <input type="text" className="form-control" id="staticEmail2" value={scheduleTime.starting}  onChange={(e) => {
                                              setTime({
                                                ...scheduleTime ,
                                                starting : e.target.value
                                            })
                                          }}/>
                                      </div>
                                      <div className="form-group col-5 mx-sm-2 mb-2">
                                          <label htmlFor="inputPassword2" className="text-secondary" >Ending Time</label>
                                          <input type="text" className="form-control" id="inputPassword2" value={scheduleTime.ending}  onChange={(e) => {
                                              setTime({
                                                  ...scheduleTime,
                                                  ending: e.target.value
                                              })
                                          }} />
                                      </div>
                                     
                                      <div className="form-group col-1  mx-sm-2 mb-2">
                                          <label htmlFor="inputPassword2" className="text-secondary" ></label>
                                          <button className='btn btn-success' onClick={() => {
                                            timeFucntion(scheduleTime)
                                          }}><i className="fa-solid fa-add"></i></button>
                                      </div>
                                      
                                </>
                             } 
                          </div>
                         
              </div>
              
          </div>
        </ModalBody>
        
      </Modal>
    </div>
  );
}

export default TimeShedule;