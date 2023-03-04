import React, { useState } from 'react'
import  './body_book.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { AiFillStar } from 'react-icons/ai';
import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux';

function Body() {
    const location = useLocation()
    const navigate = useNavigate()
    const time = '0:00'
    const [bookingTime , setBookingTime] = useState()
    const book_appointment = () =>{
        navigate('/doctor-appointment-checkout')
    }
    const bookDate = (date) => {
        setBookingTime(date)
    }
  return (
    <>
         <div className="doctor-book">
            <div className="doctor-profile card  mt-4 mb-5">
                <div className="doctor-image-div ms-4 mt-4 ">
                    <img src={require('../../../../assets/img/doctors/doctor-01.jpg')} alt="" className='doctor-image'/>
                </div>
                <div className="doctorname-and-star ms-4 mt-4 ">
                    <h4 className="doctor-name ms-4 ">
                        Dr. {location.state.doctor.doctorName}
                    </h4>
                    <div className="star mt-2">
                        <AiFillStar className='star ms-4 'style={{color:'gold'}} />
                        <AiFillStar className='star'style={{color:'gold'}} />
                        <AiFillStar className='star' />
                        <AiFillStar className='star' />
                        <AiFillStar className='star' />
                    </div>
                    <p className="doc-location ms-4 mt-2">
                        <i class="fa-solid fa-location-dot mt-1"></i>
                        <p className='ms-3 '>{location.state.doctor.location ? location.state.doctor.location : 'Not given' }</p>
                    </p>
                </div>
            </div>
            <div className="booking-date-and-time mb-5">
                <div className="date-adjustment">
                    <input type="date" name="booking-date" id="" className='booking-date me-5' />
                </div>
                <hr />
                <div className="time-adjustment">
                    <div className="row time-row">
                       
                        <div className="card time me-3 mt-4"
                        style={
                            bookingTime === time ? {backgroundColor:'#09e5ab'} : {color:' rgb(116, 115, 115);'}
                        }onClick={() => {
                            bookDate(time)
                        }}><p className='time-in-time-box mt-3' >{time}</p></div>


                        <div className="card time me-3 mt-4"style={
                            bookingTime === '1:00' ? {backgroundColor:'#09e5ab'} :  {color:' rgb(116, 115, 115);'}
                        } onClick={() => {
                            bookDate('1:00')
                        }}><p className='time-in-time-box mt-3'>1:00</p></div>


                        <div className="card time me-3 mt-4"style={
                            bookingTime === '2:00' ? {backgroundColor:'#09e5ab'} :  {color:' rgb(116, 115, 115);'}
                        }><p className='time-in-time-box mt-3'>2:00</p></div>


                        <div className="card time me-3 mt-4"style={
                            bookingTime === '0:01' ? {backgroundColor:'#09e5ab'} :  {color:' rgb(116, 115, 115);'}
                        }><p className='time-in-time-box mt-3'>0:01</p></div>


                        <div className="card time me-3 mt-4"style={
                            bookingTime === '0:02' ? {backgroundColor:'#09e5ab'} :  {color:' rgb(116, 115, 115);'}
                        }><p className='time-in-time-box mt-3'>0:02</p></div>


                        <div className="card time me-3 mt-4"style={
                            bookingTime === '0:03' ? {backgroundColor:'#09e5ab'} :  {color:' rgb(116, 115, 115);'}
                        }><p className='time-in-time-box mt-3'>0:03</p></div>


                        <div className="card time me-3 mt-4"style={
                            bookingTime === '0:04' ? {backgroundColor:'#09e5ab'} :  {color:' rgb(116, 115, 115);'}
                        }><p className='time-in-time-box mt-3'>0:04</p></div>


                        <div className="card time me-3 mt-4"style={
                            bookingTime === '0:05' ? {backgroundColor:'#09e5ab'} :  {color:' rgb(116, 115, 115);'}
                        }><p className='time-in-time-box mt-3'>0:05</p></div>


                        <div className="card time me-3 mt-4"style={
                            bookingTime === '0:06' ? {backgroundColor:'#09e5ab'} :  {color:' rgb(116, 115, 115);'}
                        }><p className='time-in-time-box mt-3'>0:06</p></div>

                        
                        <div className="card time me-3 mt-4"style={
                            bookingTime === '0:07' ? {backgroundColor:'#09e5ab'} : {color:' rgb(116, 115, 115);'}
                        }><p className='time-in-time-box mt-3'>0:07</p></div>

                        
                        <div className="card time me-3 mt-4"style={
                            bookingTime === '0:08' ? {backgroundColor:'#09e5ab'} :  {color:' rgb(116, 115, 115);'}
                        }><p className='time-in-time-box mt-3'>0:08</p></div>


                        <div className="card time me-3 mt-4"style={
                            bookingTime === '0:09' ? {backgroundColor:'#09e5ab'} :  {color:' rgb(116, 115, 115);'}
                        }><p className='time-in-time-box mt-3'>0:09</p></div>


                        <div className="card time me-3 mt-4"style={
                            bookingTime === '0:10' ? {backgroundColor:'#09e5ab'} :  {color:' rgb(116, 115, 115);'}
                        }><p className='time-in-time-box mt-3'>0:10</p></div>


                        <div className="card time me-3 mt-4"style={
                            bookingTime === '0:20' ? {backgroundColor:'#09e5ab'} :  {color:' rgb(116, 115, 115);'}
                        }><p className='time-in-time-box mt-3'>0:20</p></div>


                        <div className="card time me-3 mt-4"style={
                            bookingTime === '0:30' ? {backgroundColor:'#09e5ab'} : {color:' rgb(116, 115, 115);'}
                        }><p className='time-in-time-box mt-3'>0:30</p></div>


                        <div className="card time me-3 mt-4"style={
                            bookingTime === '0:40' ? {backgroundColor:'#09e5ab'} :  {color:' rgb(116, 115, 115);'}
                        }><p className='time-in-time-box mt-3'>0:40</p></div>


                        <div className="card time me-3 mt-4"style={
                            bookingTime === '0:50' ? {backgroundColor:'#09e5ab'} :  {color:' rgb(116, 115, 115);'}
                        }><p className='time-in-time-box mt-3'>0:50</p></div>


                        <div className="card time me-3 mt-4"style={
                            bookingTime == '0:60' ? {backgroundColor:'#09e5ab'} : {color:' rgb(116, 115, 115);'}
                        }><p id='0:60' className='time-in-time-box mt-3'>0:60</p></div>


                    </div>
                </div>
            </div>
            <div className="pay-button-div mb-5  ">
                <Button size='lg' className="proceed-to-pay" type="submit" onClick={book_appointment}><p className="proceed-button-name">Proceed to pay</p></Button>
            </div>
         </div>
    </>
  )
}

export default Body
