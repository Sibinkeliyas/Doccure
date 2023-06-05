import React, { useState } from 'react'
import  './body_book.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { AiFillStar } from 'react-icons/ai';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { dateFormat } from '../../../../../helpers/date';
import { useDispatch } from 'react-redux';
import { bookAction } from '../../../../../redux/actions/user';


// doctor booking time 


function Body() {
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const doctor = location.state.doctor
    const [bookingTime , setBookingTime] = useState()
    const [day , setDay] = useState('Monday')
    const book_appointment = async() =>{
        let date = await dateFormat(new Date())
        const data = {
            day ,
            time: bookingTime ,
            doctor ,
            date ,
            videoCallStatus : false
        }
        if(!bookingTime) {
            toast.error("Select time")
        } else {
            dispatch(bookAction(data))
            navigate('/doctor-appointment-checkout', { state: { time: data } })
        }
    }
    const bookDate = (date) => {
        setBookingTime(date)
    }
    const errorToast = (message) => {
        toast.error(message)
    }
  return (
    <>
         <div className="doctor-book">
            <ToastContainer />
            <div className="doctor-profile card  mt-4 mb-5 shadow rounded">
                <div className="doctor-image-div ms-4 mt-4 ">
                    <img src={doctor.picture ? `${process.env.REACT_APP_BACKEND_URL}/${doctor?.picture}` : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' } alt="" className='doctor-image'/>
                </div>
                <div className="doctorname-and-star ms-4 mt-4 ">
                    <h4 className="doctor-name ms-4 ">
                        Dr. {doctor.doctorName}
                    </h4>
                    <div className="star mt-2">
                        <AiFillStar className='star ms-4 ' style={doctor.rating >=1 ? {color : 'gold'} : {color:'black'}} />
                        <AiFillStar className='star' style={doctor.rating >=2 ? {color : 'gold'} : {color:'black'}} />
                        <AiFillStar className='star' style={doctor.rating >=3 ? {color : 'gold'} : {color:'black'}}/>
                        <AiFillStar className='star' style={doctor.rating >=4 ? {color : 'gold'} : {color:'black'}}/>
                        <AiFillStar className='star' style={doctor.rating >=5 ? {color : 'gold'} : {color:'black'}}/>
                    </div>
                    <p className="doc-location ms-4 mt-2">
                        <i className="fa-solid fa-location-dot mt-1"></i>
                        <p className='ms-3 '>{location.state.doctor.location ? location.state.doctor.location : 'Not given' }</p>
                    </p>
                </div>
            </div>
            <div className="booking-date-and-time mb-5 shadow rounded">
                  <div className="date-adjustment d-flex justify-content-between">
                   
                      <div className="days m-3 mt-4 ms-5 d-flex justify-content-between align-items-center">
                          <div className="day d-flex align-items-center mx-3 px-3 py-2" 
                              style={day === 'Monday' ? { backgroundColor: '#09e5ab' } : {}}
                              onClick={() => {
                                  setDay('Monday')
                              }}>
                            Monday
                        </div>
                          <div className="day d-flex align-items-center mx-3 px-3 py-2"
                              style={day === 'Tuesday' ? { backgroundColor: '#09e5ab' } : {}}
                              onClick={() => {
                                  setDay('Tuesday')
                              }}>
                              Tuesday
                          </div>
                          <div className="day d-flex align-items-center mx-3 px-3 py-2"
                              style={day === 'Wednesday' ? { backgroundColor: '#09e5ab' } : {}}
                              onClick={() => {
                                  setDay('Wednesday')
                              }}>
                              Wednesday
                          </div>
                          <div className="day d-flex align-items-center mx-3 px-3 py-2"
                              style={day === 'Thursday' ? { backgroundColor: '#09e5ab' } : {}}
                              onClick={() => {
                                  setDay('Thursday')
                              }}>
                              Thursday
                          </div>
                          <div className="day d-flex align-items-center mx-3 px-3 py-2"
                              style={day === 'Friday' ? { backgroundColor: '#09e5ab' } : {}}
                              onClick={() => {
                                  setDay('Friday')
                              }}>
                              Friday
                          </div>
                          <div className="day d-flex align-items-center mx-3 px-3 py-2"
                              style={day === 'Saturday' ? { backgroundColor: '#09e5ab' } : {}}
                              onClick={() => {
                                  setDay('Saturday')
                              }}>
                              Saturday
                          </div>
                    </div>
                      {/* <div className="filter m-3 mt-4"> */}
                          {/* <input type="date" name="booking-date" id="" className='booking-date me-5' /> */}
                      {/* </div> */}
                </div>
                <hr />
                <div className="time-adjustment">
       
                    <div className="row time-row m-2">
                    {
                       doctor.timeSchedule?.map((time) => {
                        if(time.day === day) {
                            return (
                                <>
                                    {
                                        time.status !== true ?
                                            <div className="card time me-3 mt-4"
                                                key={time.startingTime}
                                                style={
                                                    bookingTime === time ? { backgroundColor: '#09e5ab' } : { color: ' rgb(116, 115, 115)' , textAlign:'center'}
                                                } onClick={() => {
                                                    bookDate(time)
                                                }}><p className='time-in-time-box mt-3' key={time.endingTime}>{time.startingTime + ' - ' + time.endingTime}</p>
                                            </div>
                                            :
                                            <div className="card time me-3 mt-4 " 
                                                key={time.startingTime}
                                                style={
                                                     { backgroundColor: '#d9534f' , color:'white' , textAlign:'center' }
                                                } onClick={() => {
                                                    errorToast('Already booked')
                                                }}><p className='time-in-time-box mt-3' style={{color:'white'}} key={time.endingTime}>{time.startingTime + ' - ' + time.endingTime}</p>
                                            </div>
                                    }
                                </>
                            )
                        } else {
                            return(
                                <>

                                </>
                            )
                        }
                       })
                    }

                    </div>
                </div>
            </div>
            <div className="pay-button-div mb-5  ">
                <Button size='lg' className="proceed-to-pay shadow rounded" type="submit" onClick={book_appointment}><p className="proceed-button-name">Proceed to pay</p></Button>
            </div>
         </div>
    </>
  )
}

export default Body
