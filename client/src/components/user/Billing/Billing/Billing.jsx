import React from 'react'
import './Billing.css'
import { AiFillStar } from 'react-icons/ai';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function Billing() {

  const navigate = useNavigate()
  const confirmAndPay = () => {
    navigate('/doctor-appointment-success')
  }
  return (
   <>
    <div className="checkout_container">


      {/* from  */}
            <div className="checkout_form  mt-5 mb-5">
              <div className="heading-of-personal-information ms-4 mb-4 mt-5">
                <h4 className='heading-1'>Personal Information</h4>
              </div>
              <hr />
                  <div className="form-arrangement ">
                    <div className="col-md-5 ms-4 me-3 mb-3 card-label ">
                        <label htmlFor="">First Name</label>
                        <input type="text" name="firstName" id="" className="form-control" />
                    </div>
                    <div className="col-md-5 ms-4 me-3 mb-3 card-label ">
                        <label htmlFor="">Last Name</label>
                        <input type="text" name="lastName" id="" className="form-control" />
                    </div>
                  </div>
                  <div className="form-arrangement ">
                    <div className="col-md-5 ms-4 me-3 mb-3 card-label ">
                        <label htmlFor="">Email</label>
                        <input type="email" name="email" id="" className="form-control" />
                    </div>
                    <div className=" col-md-5 me-3 ms-4 mb-3 card-label ">
                        <label htmlFor="">Phone</label>
                        <input type="number" name="phone" id="" className="form-control" />
                    </div>
                  </div>
                  <hr className='ms-5 me-5 mt-5 mb-3'/>


                  <div className="heading-of-personal-information ms-4 mb-4 ">
                      <h4>Payment Method</h4>
                      <div className="payment-method ms-5 mt-4">
            
                          <div className="for-paypal-razorpay mt-2">
                                <div className="paypal col-md-6">
                                  <label htmlFor="myRadioId1" className='radio'>
                                    <input type="radio" name="myradioField" id="myRadioId1" className='radio__input' />
                                    <div className="radio__radio">
                                      {/* virtual elemtenyt */}
                                    </div>
                                     PayPal
                                  </label>
                                </div>
                            
                                <div className="razorpay col-md-6">
                                    <label htmlFor="myRadioId2" className='radio'>
                                      <input type="radio" name="myradioField" id="myRadioId2" className='radio__input' />
                                      <div className="radio__radio">
                                        {/* virtual elemtenyt */}
                                      </div>
                                      Razer Pay
                                    </label>
                                </div>
                          </div>
                          <div className="for-wallet-direct mt-3">
                              <div className="wallet col-md-6">
                                <label htmlFor="myRadioId3" className='radio'>
                                  <input type="radio" name="myradioField" id="myRadioId3" className='radio__input' />
                                  <div className="radio__radio">
                                    {/* virtual elemtenyt */}
                                  </div>
                                  Wallet
                                </label>
                              </div>
                            

                            <div className="directly col-md-6">
                            <label htmlFor="myRadioId4" className='radio'>
                                <input type="radio" name="myradioField" id="myRadioId4" className='radio__input' />
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
                <Button  className="me-5 book-now-button" onClick={confirmAndPay} type="submit" >Confirm and Pay</Button>
              </div>
            </div>
            {/* from  */}


      {/* this is for payment details and summury */}


      <div className="booksummary ms-4 mt-5 me-3 mb-3 mb-4">
        <div className="headerOfBilling">
          <h3 className='ms-3 mt-4'>Booking Summury</h3>
        </div>
        <hr className='mt-2'/>
        <div className="booking-details">
            <div className="doctor-details-image">
              <div className="doctor-image">
                <img src={require('../../../assets/img/doctors/doctor-01.jpg')} className='profile-imge ms-3' alt="doctor image" />
              </div>
              <div className="doctor-details">
                <h4 className='ms-2 doctor-name'>Dr. Darren Elder</h4>
                        <AiFillStar className='star ms-1 'style={{color:'gold'}} />
                        <AiFillStar className='star'style={{color:'gold'}} />
                        <AiFillStar className='star' />
                        <AiFillStar className='star' />
                        <AiFillStar className='star' />
                <p className="location ms-2 mt-2">
                  <i class="fa-solid fa-location-dot me-2"></i> Newyork, USA
                </p>
              </div>
            </div>
            <div className="payment-details">
              <div className="date">
                <p className="payment-item ms-4 mt-3">Date</p>
                <p className="payment-fee mt-3 me-4">16 Nov 2022</p>
              </div>
              <div className="date">
                <p className="payment-item ms-4 mt-1">Time</p>
                <p className="payment-fee mt-1 me-4">10:00 AM</p>
              </div>
              <div className="date">
                <p className="payment-item ms-4 mt-1">Consulting Fee</p>
                <p className="payment-fee mt-1 me-4">$100</p>
              </div>
              <div className="date">
                <p className="payment-item ms-4 mt-1">Booking Fee</p>
                <p className="payment-fee mt-1 me-4">$10</p>
              </div>
              <div className="date">
                <p className="payment-item ms-4 mt-1">Video Call</p>
                <p className="payment-fee mt-1 me-4">16 Nov 2022</p>
              </div>
              <hr className='ms-5' />
              <div className="total-payment date">
                <h4 className='ms-4 mb-3 me-4'>Total</h4><h3 className='mb-5 me-4'>$110</h3>
              </div>
            </div>
        </div>
      </div>
    </div>
   </>
  )
}

export default Billing
