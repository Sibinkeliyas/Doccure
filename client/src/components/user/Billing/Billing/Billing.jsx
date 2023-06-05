import React, {  useState } from 'react'
import './Billing.css'
import { AiFillStar } from 'react-icons/ai';
import Button from 'react-bootstrap/Button';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { user_checkout } from '../../../../redux/actions/user';
import { dateFormat } from '../../../../helpers/date';
import { ToastContainer, toast } from 'react-toastify';
// import { url }


// checkout 

function Billing() {
  const location = useLocation()
  const dispatch = useDispatch()
  const doctor = location.state.time
  const user = useSelector((state) => state.userLogin.data)
  const billingStatus = useSelector((state) => state.userCheckout)


  const [userData , setUserData] = useState({
    firstName : '',
    lastName : '' ,
    email : '',
    phone : '' ,
    paymentMethod : '',
    totalAmount : doctor.videoCallStatus ? parseInt(doctor.doctor.consultingFee) + 10 + 50 + 0.00: parseInt(doctor.doctor.consultingFee) + 10 + 0.00 ,
    doctorId : doctor.doctor?._id ,
    userId : user._id,
    appointmentStatus : 'pending' ,
    orderDate : dateFormat(new Date()) ,
    videoCall : false ,
    time : doctor.time

  })
  const [errorSatus , setErrorStatus] = useState(false)
  const [errorData , setError] = useState({})
  // const navigate = useNavigate()
  const errorChange = () => {
    const error = {}
      if(errorSatus) {
        if(userData.firstName === '' || userData.firstName === undefined) {
          error.firstName = "Fill the First name"
        } else {
          error.firstName = ""
        }
        if(userData.lastName === '' || userData.lastName === undefined) {
          error.lastName = "Fill the last name"
        } else {
          error.lastName = ""
        }
        if(userData.email === '' || userData.email === undefined) {
          error.email = "Fill the email name"
        } else {
          error.email = ""
        }
        if(userData.phone === '' || userData.phone === undefined) {
          error.phone = "Fill the phone name"
        } else {
          error.phone = ""
        }
        setError(error)
      }
  }
  const confirmAndPay = () => {
    const error = {}
    if(userData.firstName === '' || userData.firstName === undefined ||
      userData.lastName === '' || userData.lastName === undefined ||
      userData.email === '' || userData.email === undefined ||
      userData.phone === '' || userData.phone === undefined) {
        if(userData.firstName === '' || userData.firstName === undefined) {
          error.firstName = "Fill the First name"
        } else {
          error.firstName = ""
        }
        if(userData.lastName === '' || userData.lastName === undefined) {
          error.lastName = "Fill the last name"
        } else {
          error.lastName = ''
        }
        if(userData.email === '' || userData.email === undefined) {
          error.email = "Fill the email name"
        } else {
          error.email = ''
        }
        if(userData.phone === '' || userData.phone === undefined) {
          error.phone = "Fill the phone name"
        } else {
          error.phone = ''
        }
        setError(error)
        setErrorStatus(true)
    } else {
      let token = JSON.parse(localStorage.getItem('userInfo'))
      const config = {
          headers : {
              Authorization: "Bearer " + token.token,
              "content-type" : "application/json",
          }
      }
       if(userData.paymentMethod === 'card') {
          axios.post(`${process.env.REACT_APP_BACKEND_URL}/create-checkout-session` , { userData } , config).then((res) => {
          dispatch(user_checkout(userData))
          if(res.data.url) {
            window.location.href = res.data.url 
          }
        }).catch((err) => {
          console.log(err);
        })
       } else {
        dispatch(user_checkout(userData))
        if(billingStatus.error) {
          toast.error(billingStatus.error)
          billingStatus.error = false
        } else {
          window.location.href = `http://localhost:3000/doctor-appointment-success` 
        }
       }
        
      }
  }
  return (
   <>
    <div className="checkout_container">

    <ToastContainer />

      {/* from  */}
            <div className="checkout_form  mt-5 mb-5  shadow rounded">
              <div className="heading-of-personal-information ms-4 mb-4 mt-5 ">
                <h4 className='heading-1'>Personal Information</h4>
              </div>
              <hr />
                  <div className="form-arrangement ">
                    <div className="col-md-5 ms-4 me-3 mb-3 card-label ">
                        <label htmlFor="">First Name</label>
                        <input type="text" name="firstName" id="" className="form-control" 
                        value={userData.firstName}
                          onChange={(e) => {
                            setUserData({
                              ...userData ,
                              firstName : e.target.value
                            })
                            errorChange()
                          }}
                        />
                        {
                          errorData?.firstName ? <small className='m-2 mt-3' style={{color:'red'}}>{errorData.firstName}</small> : ''
                        }
                    </div>
                    <div className="col-md-5 ms-4 me-3 mb-3 card-label ">
                        <label htmlFor="">Last Name</label>
                        <input type="text" name="lastName" id="" className="form-control" 
                        value={userData.lastName}
                             onChange={(e) => {
                            setUserData({
                              ...userData ,
                              lastName : e.target.value
                            })
                            errorChange()
                          }}
                        />
                         {
                          errorData?.lastName  ? <small className='m-2 mt-3' style={{color:'red'}}>{errorData.lastName}</small> : ''
                        }
                    </div>
                  </div>
                  <div className="form-arrangement ">
                    <div className="col-md-5 ms-4 me-3 mb-3 card-label ">
                        <label htmlFor="">Email</label>
                        <input type="email" name="email" id="" className="form-control" 
                        value={userData.email}
                             onChange={(e) => {
                            setUserData({
                              ...userData ,
                              email : e.target.value
                            })
                            errorChange()
                          }}
                        />
                         {
                          errorData?.email  ? <small className='m-2 mt-3' style={{color:'red'}}>{errorData.email}</small> : ''
                        }
                    </div>
                    <div className=" col-md-5 me-3 ms-4 mb-3 card-label ">
                        <label htmlFor="">Phone</label>
                        <input type="number" name="phone" id="" className="form-control" 
                        value={userData.phone}
                             onChange={(e) => {
                            setUserData({
                              ...userData ,
                              phone : e.target.value
                            })
                            errorChange()
                          }}
                        />
                         {
                          errorData?.phone ? <small className='m-2 mt-3' style={{color:'red'}}>{errorData.phone}</small> : ''
                        }
                    </div>
                  </div>
                  <hr className='ms-5 me-5 mt-5 mb-3'/>


                  <div className="heading-of-personal-information ms-4 mb-4 ">
                      <h4>Payment Method</h4>
                      <div className="payment-method ms-5 mt-4">
            
                          <div className="for-paypal-razorpay mt-2">
                                <div className="paypal col-md-6">
                                  <label htmlFor="myRadioId1" className='radio'>
                                    <input type="radio" name="myradioField" id="myRadioId1" className='radio__input' 
                                    onChange={(e) => {
                                      if(e.target.value) {
                                        setUserData({
                                          ...userData ,
                                          paymentMethod : 'card'
                                        })
                                      }
                                    }}/>
                                    <div className="radio__radio">
                                      {/* virtual elemtenyt */}
                                    </div>
                                     Card
                                  </label>
                                </div>
                            
                                
                          </div>
                          <div className="for-wallet-direct mt-3">
                              <div className="wallet col-md-6">
                                <label htmlFor="myRadioId3" className='radio'>
                                  <input type="radio" name="myradioField" id="myRadioId3" className='radio__input' 
                                      onChange={(e) => {
                                        if(e.target.value) {
                                        setUserData({
                                          ...userData ,
                                          paymentMethod : 'wallet'
                                        })
                                      }
                                      }}
                                  />
                                  <div className="radio__radio">
                                    {/* virtual elemtenyt */}
                                  </div>
                                  Wallet
                                </label>
                              </div>
                            

                            <div className="directly col-md-6">
                            <label htmlFor="myRadioId4" className='radio'>
                                <input type="radio" name="myradioField" id="myRadioId4" className='radio__input' 
                                      onChange={(e) => {
                                        if(e.target.value) {
                                        setUserData({
                                          ...userData ,
                                          paymentMethod : 'direct'
                                        })
                                      }
                                      }}
                                />
                                <div className="radio__radio">
                                  {/* virtual elemtenyt */}
                                </div>
                                Directly
                            </label>
                            </div>
                          </div>
                    
                    </div>
            </div>

              <hr className='ms-3 me-3' />
              <div className="book-now-div ms-5 mb-5">
                <Button  className="me-5 book-now-button mb-3" onClick={confirmAndPay} type="submit" >Confirm and Pay</Button>
              </div>
            </div>
            {/* from  */}


      {/* this is for payment details and summury */}


      <div className="booksummary ms-4 mt-5 me-3 mb-3 mb-5 shadow rounded">
        <div className="headerOfBilling">
          <h3 className='ms-3 mt-4'>Booking Summury</h3>
        </div>
        <hr className='mt-2'/>
        <div className="booking-details">
            <div className="doctor-details-image">
              <div className="doctor-image">
                <img src={doctor.doctor.picture ? `${process.env.REACT_APP_BACKEND_URL}/${doctor.doctor?.picture}` : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' } className='profile-imge ms-3' alt="doctorImage" />
              </div>
              <div className="doctor-details">
                <h4 className='ms-2 doctor-name'>Dr. {doctor.doctor?.doctorName}</h4>
                        <AiFillStar className='star ms-1 ' style={doctor.doctor.rating >=1 ? {color : 'gold'} : {color:'black'}}/>
                        <AiFillStar className='star'  style={doctor.doctor.rating >=2 ? {color : 'gold'} : {color:'black'}} />
                        <AiFillStar className='star' style={doctor.doctor.rating >=3 ? {color : 'gold'} : {color:'black'}}/>
                        <AiFillStar className='star' style={doctor.doctor.rating >=4 ? {color : 'gold'} : {color:'black'}}/>
                        <AiFillStar className='star' style={doctor.doctor.rating >=5 ? {color : 'gold'} : {color:'black'}}/>
                <p className="location ms-2 mt-2">
                  <i className="fa-solid fa-location-dot me-2"></i> Newyork, USA
                </p>
              </div>
            </div>
            <div className="payment-details">
              <div className="date">
                <p className="payment-item ms-4 mt-3">Date</p>
                <p className="payment-fee mt-3 me-4">{doctor.date}</p>
              </div>
              <div className="date">
                <p className="payment-item ms-4 mt-1">Time</p>
                <p className="payment-fee mt-1 me-4">{doctor.time.startingTime + ' - ' + doctor.time.endingTime}</p>
              </div>
              <div className="date">
                <p className="payment-item ms-4 mt-1">Consulting Fee</p>
                <p className="payment-fee mt-1 me-4">$ {doctor.doctor.consultingFee}</p>
              </div>
              <div className="date">
                <p className="payment-item ms-4 mt-1">Booking Fee</p>
                <p className="payment-fee mt-1 me-4">$10</p>
              </div>
              <div className="date">
                <p className="payment-item ms-4 mt-1">Video Call</p>
                <p className="payment-fee mt-1 me-4">{doctor.videoCallStatus ? '$ 50' : '$0'}</p>
              </div>
              <hr className='ms-5' />
              <div className="total-payment date">
                <h4 className='ms-4 mb-3 me-4'>Total</h4><h3 className='mb-5 me-4'>${doctor.videoCallStatus ? parseInt(doctor.doctor.consultingFee) + 10 + 50: parseInt(doctor.doctor.consultingFee) + 10}</h3>
              </div>
            </div>
        </div>
      </div>
    </div>
   </>
  )
}

export default Billing
