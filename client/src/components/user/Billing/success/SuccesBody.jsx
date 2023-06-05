import React from 'react'
import './succes.css'
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function SuccesBody() {

const navigate = useNavigate()
const bookAction = useSelector((state) => state.bookAction)
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
console.log(urlParams.get('billingData'));

  const viewProfile = () => {
    localStorage.removeItem('bookAction')
    bookAction.data = false
    navigate('/')
  }
  return (
    <>
      <div className="succes-container">
        <div className="succes-body mt-3 ms-3 mb-3 me-3">
            <div className="tick-mark mb-5 ms-3 me-3">
              <i className="fa-solid fa-check"></i>
            </div>
            <h3 className="heading-2 heading-2-content">
              Appointment booked <p className="succesfully heading-2">Successfully!</p>
            </h3>
            {/* <p className="content ms-3 me-3">
            Appointment booked with <span className="doctor-name-time">Dr. Darren Elder</span><br />
            on <span className="doctor-name-time">12 Nov 2019 5:00PM to 6:00PM</span>
            </p> */}
            <Button  className=" book-now-button ms-3 me-3 mb-4"  type="submit" onClick={viewProfile}>Back to Home</Button>
        </div>
      </div>
    </>
  )
}

export default SuccesBody
