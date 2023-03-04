import React , {useEffect, useState} from 'react'
import './Body.css'
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { userLogoutAction, user_favorite_doctor } from '../../../../../redux/actions/user';

// google logout
import { googleLogout, } from '@react-oauth/google';




function Body() {
    
    const [option , setOption] = useState('Dash Board')
    const [appointORbilling , setAppointORbilling] = useState('appointment')
    const userData = useSelector((state) => state.userLogin.data)
    console.log(userData);

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const view_navigate = () => {
        navigate('/view-invoice')
    }
    const view_doc_or_book = (url) => {
        navigate(url)
    }

    const view_book = (url , doctor) => {
        navigate(url , {state : {doctor}})
    }

    const change_Option = (option) => {
        setOption(option)
    }
     // google
     const logOut = () => {
        googleLogout();
        dispatch(userLogoutAction())
        navigate('/')
    };
    // google
    // favorite doctors
    useEffect(() => {
        dispatch(user_favorite_doctor(userData._id))
    } , [])
    const favDoc = useSelector((state) => state.userFavDocReducer.favDoc)

   
  return (
   <>
   <div className="profile-settings-container" >

            {/* profile side bar */}
            <div className="profile-contents  mb-5">
                <div className="profle-image-user">
                    <div className="round-for-image">
                        <img src={userData ? userData?.picture ? userData.picture : require('../../../../assets/img/patients/patient.jpg') :require('../../../../assets/img/patients/patient.jpg')} alt="user image" className='user-image' />
                    </div>
                </div>
                <div className="user-details mt-4">
                    <div className="user-header">
                        <h4 className="user-name">
                            {userData.name}
                        </h4>
                    </div>
                    <div className="other-details">
                        <span> 
                        {userData.email}</span>
                        <span> <i className="fa-solid fa-location-dot me-2 mt-2"></i>NewYork , USA</span>
                    </div>
                </div>
                <hr className='profile-hr' />
                <div className="option-content ">
                    <div className="dashboard-div ms-3" onClick={() => {
                        change_Option('Dash Board')
                    }}>
                        <span style={option === 'Dash Board' ? {color:'#20c0f3'} : {}}><i class="fa-solid fa-table-columns me-3"></i>Dash Board</span>
                    </div>
                    <hr className='profile-hr' />

                    <div className="dashboard-div ms-3" onClick={() => {
                        setOption('favourite')
                    }}>
                        <span style={option === 'favourite' ? {color:'#20c0f3'} : {}}><i class="fa-solid fa-bookmark me-3"></i>Favourites</span>
                    </div>
                    <hr className='profile-hr' />

                    <div className="dashboard-div ms-3" onClick={() => {
                        view_doc_or_book('/user-chat')
                    }}>
                        <span><i class="fa-solid fa-comments me-3"></i>Messages</span>
                    </div>
                    <hr className='profile-hr' />

                    <div className="dashboard-div ms-3" onClick={() => {
                        change_Option('profile settings')
                    }}>
                        <span style={option === 'profile settings' ? {color:'#20c0f3'} : {} }><i class="fa-solid fa-gears me-3"></i>Profile Settings</span>
                    </div>
                    <hr className='profile-hr' />

                    <div className="dashboard-div ms-3" onClick={() => {
                        change_Option('change password')
                    }}>
                        <span style={option === 'change password' ? {color:'#20c0f3'} : {} }><i class="fa-solid fa-lock me-3" ></i>Change Password</span>
                    </div>
                    <hr className='profile-hr' />
                    <div className="dashboard-div ms-3" 
                  
                    onClick={logOut}
                    >
                        <span><i class="fa-solid fa-right-from-bracket me-3"></i>Logout</span>
                    </div>
                </div>
            </div>
            {/* profile side bar */}

            {/* profile edit */}
            <div className="settings-and-details-part mt-5 mb-5" style={option === 'profile settings' ? {} : {display:'none'}}>
                <div className="user-profile-edit">
                    <img src={require('../../../../assets/img/patients/patient.jpg')} alt="user image" className='user-edit-image' />
                    <div class="file-input mt-4">
                        <input type="file" id="file-input" className='user-profile-select-edit' />
                        <label class="file-input__label" for="file-input"><i class="fa-solid fa-upload me-2 ms-2"></i>
                        <span>Upload file</span></label>
                    </div>
                </div>
                <div className="profile-edit-form">
                   
                    <div className="form-arrangement ">
                        <div className="col-md-5 ms-4 me-3 mb-3 card-label ">
                            <label htmlFor="">First Name</label>
                            <input type="text" name="firstName" id="" placeholder='Richard' className="form-control" />
                        </div>
                        <div className="col-md-5 ms-4 me-3 mb-3 card-label ">
                            <label htmlFor="">Last Name</label>
                            <input type="text" name="lastName" id="" placeholder='Wilson' className="form-control" />
                        </div>
                      </div>
                      <div className="form-arrangement ">
                        <div className="col-md-5 ms-4 me-3 mb-3 card-label ">
                            <label htmlFor="">Date of Birth</label>
                            <input type="email" name="email" id="" placeholder='01/02/2002' className="form-control" />
                        </div>
                        <div className=" col-md-5 me-3 ms-4 mb-3 card-label ">
                            <label htmlFor="">Blood Group</label>
                            <input type="number" name="phone" id="" placeholder='A-' className="form-control" />
                        </div>
                      </div>
    
    
                      <div className="form-arrangement ">
                        <div className="col-md-5 ms-4 me-3 mb-3 card-label ">
                            <label htmlFor="">Email ID</label>
                            <input type="text" name="firstName" id="" placeholder='richard@gmail.com' className="form-control" />
                        </div>
                        <div className="col-md-5 ms-4 me-3 mb-3 card-label ">
                            <label htmlFor="">Mobile</label>
                            <input type="text" name="lastName" id="" placeholder='6238985716' className="form-control" />
                        </div>
                      </div>
                      
    
                        <div className="address-form- col-md-12 ms-4 me-3 mb-3 card-label ">
                            <label htmlFor="">Address</label>
                            <input type="text" name="firstName" id="" placeholder='New york' className="form-control" />
                        </div>
                      
    
    
                      <div className="form-arrangement ">
                        <div className="col-md-5 ms-4 me-3 mb-3 card-label ">
                            <label htmlFor="">City</label>
                            <input type="text" name="firstName" id="" placeholder='New york' className="form-control" />
                        </div>
                        <div className="col-md-5 ms-4 me-3 mb-3 card-label ">
                            <label htmlFor="">State</label>
                            <input type="text" name="lastName" id="" placeholder='New york' className="form-control" />
                        </div>
                      </div>
                      <div className="form-arrangement ">
                        <div className="col-md-5 ms-4 me-3 mb-3 card-label ">
                            <label htmlFor="">Zip code</label>
                            <input type="email" name="email" id="" placeholder='678601' className="form-control" />
                        </div>
                        <div className=" col-md-5 me-3 ms-4 mb-3 card-label ">
                            <label htmlFor="">Country</label>
                            <input type="number" name="phone" id="" placeholder='USA' className="form-control" />
                        </div>
                      </div>
                    </div>
                    <div className="confirm-edit-div">
                        <Button  className="profile-change-confirm book-now-button"  type="submit" >Save Changes</Button>
                    </div>
            </div>
            {/* profile edit */}
    
            {/* dash Board */}
            <div className="settings-and-details-part appointment-and-booking-details mt-5 mb-5" style={option === 'Dash Board' ? {} : {display:'none'}}>
                    <div className="heading-for-dash-board col-md-12">
                       <div className="appointment col-md-5" onClick={() => {
                        setAppointORbilling('appointment')
                       }} style={appointORbilling==='appointment' ? {borderBottom:'3px solid #20c0f3'} : {}}>
                            <h4 style={appointORbilling==='appointment' ? {color:'#20c0f3'} : {}}>Appointment</h4>
                       </div>
                       <div className="appointment col-md-5" onClick={() => {
                        setAppointORbilling('billing')
                       }} style={appointORbilling==='billing' ? {borderBottom:'3px solid #20c0f3'} : {}}>
                            <h4 style={appointORbilling==='billing' ? {color:'#20c0f3'} : {}}>Billing</h4>
                       </div>
                    </div>
    
                    {/* column */}
    
                    
                                            <div id="pat_appointments" className="tab-pane fade show active mb-5">
                                                <div className="card card-table mb-0">
                                                    <div className="card-body table-card-body">
                                                        <div className="table-responsive">
                                                            <table className="table table-hover table-center appointment-table mb-0" style={appointORbilling === 'appointment' ? {} : {display:'none'}}>
                                                                <thead>
                                                                    <tr>
                                                                        <th>Doctor</th>
                                                                        <th>Appt Date</th>
                                                                        <th>Booking Date</th>
                                                                        <th>Amount</th>
                                                                        <th>Follow Up</th>
                                                                        <th>Status</th>
                                                                        <th></th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td>
                                                                            <h2 className="table-avatar">
                                                                                <a  className="avatar avatar-sm mr-2">
                                                                                    <img className="avatar-img rounded-circle" src={require('../../../../assets/img/doctors/doctor-thumb-01.jpg')} alt="User Image" />
                                                                                </a>
                                                                                <a className='doctor-name-in-user-dashboard'>Dr. Ruby Perrin <span>Dental</span></a>
                                                                            </h2>
                                                                        </td>
                                                                        <td>14 Nov 2019 <span className="d-block text-info">10.00 AM</span></td>
                                                                        <td>12 Nov 2019</td>
                                                                        <td>$160</td>
                                                                        <td>16 Nov 2019</td>
                                                                        <td><span className="badge badge-pill bg-success-light bg-light text-success">Confirm</span></td>
                                                                        <td className="text-right">
                                                                            <div className="table-action">
                                                                                <a  className="btn btn-sm bg-primary-light bg-light text-primary">
                                                                                    <i className="fas fa-print"></i> Print
                                                                                </a>
                                                                                <a  className="btn btn-sm bg-info-light bg-light text-success ms-2">
                                                                                    <i className="far fa-eye"></i> View
                                                                                </a>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <h2 className="table-avatar">
                                                                                <a  className="avatar avatar-sm mr-2">
                                                                                    <img className="avatar-img rounded-circle" src={require('../../../../assets/img/doctors/doctor-thumb-02.jpg')} alt="User Image" />
                                                                                </a>
                                                                                <a className='doctor-name-in-user-dashboard'>Dr. Darren Elder <span>Dental</span></a>
                                                                            </h2>
                                                                        </td>
                                                                        <td>12 Nov 2019 <span className="d-block text-info">8.00 PM</span></td>
                                                                        <td>12 Nov 2019</td>
                                                                        <td>$250</td>
                                                                        <td>14 Nov 2019</td>
                                                                        <td><span className="badge badge-pill bg-success-light bg-light text-success">Confirm</span></td>
                                                                        <td className="text-right">
                                                                            <div className="table-action">
                                                                                <a  className="btn btn-sm bg-primary-light bg-light text-primary">
                                                                                    <i className="fas fa-print"></i> Print
                                                                                </a>
                                                                                <a  className="btn btn-sm bg-info-light bg-light text-success ms-2">
                                                                                    <i className="far fa-eye"></i> View
                                                                                </a>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <h2 className="table-avatar">
                                                                                <a className="avatar avatar-sm mr-2">
                                                                                    <img className="avatar-img rounded-circle" src={require('../../../../assets/img/doctors/doctor-thumb-03.jpg')} alt="User Image" />
                                                                                </a>
                                                                                <a className='doctor-name-in-user-dashboard'>Dr. Deborah Angel <span>Cardiology</span></a>
                                                                            </h2>
                                                                        </td>
                                                                        <td>11 Nov 2019 <span className="d-block text-info">11.00 AM</span></td>
                                                                        <td>10 Nov 2019</td>
                                                                        <td>$400</td>
                                                                        <td>13 Nov 2019</td>
                                                                        <td><span className="badge badge-pill bg-danger-light bg-light text-danger">Cancelled</span></td>
                                                                        <td className="text-right">
                                                                            <div className="table-action">
                                                                                <a  className="btn btn-sm bg-primary-light bg-light text-primary">
                                                                                    <i className="fas fa-print"></i> Print
                                                                                </a>
                                                                                <a  className="btn btn-sm bg-info-light bg-light text-success ms-2">
                                                                                    <i className="far fa-eye"></i> View
                                                                                </a>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <h2 className="table-avatar">
                                                                                <a  className="avatar avatar-sm mr-2">
                                                                                    <img className="avatar-img rounded-circle" src={require('../../../../assets/img/doctors/doctor-thumb-04.jpg')} alt="User Image" />
                                                                                </a>
                                                                                <a className='doctor-name-in-user-dashboard'>Dr. Sofia Brient <span>Urology</span></a>
                                                                            </h2>
                                                                        </td>
                                                                        <td>10 Nov 2019 <span className="d-block text-info">3.00 PM</span></td>
                                                                        <td>10 Nov 2019</td>
                                                                        <td>$350</td>
                                                                        <td>12 Nov 2019</td>
                                                                        <td><span className="badge badge-pill bg-warning-light bg-light text-warning">Pending</span></td>
                                                                        <td className="text-right">
                                                                            <div className="table-action">
                                                                                <a  className="btn btn-sm bg-primary-light bg-light text-primary">
                                                                                    <i className="fas fa-print"></i> Print
                                                                                </a>
                                                                                <a  className="btn btn-sm bg-info-light bg-light text-success ms-2">
                                                                                    <i className="far fa-eye"></i> View
                                                                                </a>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <h2 className="table-avatar">
                                                                                <a  className="avatar avatar-sm mr-2">
                                                                                    <img className="avatar-img rounded-circle" src={require('../../../../assets/img/doctors/doctor-thumb-05.jpg')} alt="User Image" />
                                                                                </a>
                                                                                <a className='doctor-name-in-user-dashboard'>Dr. Marvin Campbell <span>Ophthalmology</span></a>
                                                                            </h2>
                                                                        </td>
                                                                        <td>9 Nov 2019 <span className="d-block text-info">7.00 PM</span></td>
                                                                        <td>8 Nov 2019</td>
                                                                        <td>$75</td>
                                                                        <td>11 Nov 2019</td>
                                                                        <td><span className="badge badge-pill bg-success-light bg-light text-success">Confirm</span></td>
                                                                        <td className="text-right">
                                                                            <div className="table-action">
                                                                                <a  className="btn btn-sm bg-primary-light bg-light text-primary">
                                                                                    <i className="fas fa-print"></i> Print
                                                                                </a>
                                                                                <a  className="btn btn-sm bg-info-light bg-light text-success ms-2">
                                                                                    <i className="far fa-eye"></i> View
                                                                                </a>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <h2 className="table-avatar">
                                                                                <a  className="avatar avatar-sm mr-2">
                                                                                    <img className="avatar-img rounded-circle" src={require('../../../../assets/img/doctors/doctor-thumb-06.jpg')} alt="User Image" />
                                                                                </a>
                                                                                <a className='doctor-name-in-user-dashboard'>Dr. Katharine Berthold <span>Orthopaedics</span></a>
                                                                            </h2>
                                                                        </td>
                                                                        <td>8 Nov 2019 <span className="d-block text-info">9.00 AM</span></td>
                                                                        <td>6 Nov 2019</td>
                                                                        <td>$175</td>
                                                                        <td>10 Nov 2019</td>
                                                                        <td><span className="badge badge-pill bg-danger-light bg-light text-danger">Cancelled</span></td>
                                                                        <td className="text-right">
                                                                            <div className="table-action">
                                                                                <a  className="btn btn-sm bg-primary-light bg-light text-primary">
                                                                                    <i className="fas fa-print"></i> Print
                                                                                </a>
                                                                                <a  className="btn btn-sm bg-info-light bg-light text-success ms-2">
                                                                                    <i className="far fa-eye"></i> View
                                                                                </a>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <h2 className="table-avatar">
                                                                                <a  className="avatar avatar-sm mr-2">
                                                                                    <img className="avatar-img rounded-circle" src={require('../../../../assets/img/doctors/doctor-thumb-07.jpg')} alt="User Image" />
                                                                                </a>
                                                                                <a className='doctor-name-in-user-dashboard'>Dr. Linda Tobin <span>Neurology</span></a>
                                                                            </h2>
                                                                        </td>
                                                                        <td>8 Nov 2019 <span className="d-block text-info">6.00 PM</span></td>
                                                                        <td>6 Nov 2019</td>
                                                                        <td>$450</td>
                                                                        <td>10 Nov 2019</td>
                                                                        <td><span className="badge badge-pill bg-success-light bg-light text-success">Confirm</span></td>
                                                                        <td className="text-right">
                                                                            <div className="table-action">
                                                                                <a  className="btn btn-sm bg-primary-light bg-light text-primary">
                                                                                    <i className="fas fa-print"></i> Print
                                                                                </a>
                                                                                <a  className="btn btn-sm bg-info-light bg-light text-success ms-2">
                                                                                    <i className="far fa-eye"></i> View
                                                                                </a>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <h2 className="table-avatar">
                                                                                <a  className="avatar avatar-sm mr-2">
                                                                                    <img className="avatar-img rounded-circle" src={require('../../../../assets/img/doctors/doctor-thumb-08.jpg')} alt="User Image" />
                                                                                </a>
                                                                                <a className='doctor-name-in-user-dashboard'>Dr. Paul Richard <span>Dermatology</span></a>
                                                                            </h2>
                                                                        </td>
                                                                        <td>7 Nov 2019 <span className="d-block text-info">9.00 PM</span></td>
                                                                        <td>7 Nov 2019</td>
                                                                        <td>$275</td>
                                                                        <td>9 Nov 2019</td>
                                                                        <td><span className="badge badge-pill bg-success-light bg-light text-success">Confirm</span></td>
                                                                        <td className="text-right">
                                                                            <div className="table-action">
                                                                                <a  className="btn btn-sm bg-primary-light bg-light text-primary">
                                                                                    <i className="fas fa-print"></i> Print
                                                                                </a>
                                                                                <a  className="btn btn-sm bg-info-light bg-light text-success ms-2">
                                                                                    <i className="far fa-eye"></i> View
                                                                                </a>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <h2 className="table-avatar">
                                                                                <a  className="avatar avatar-sm mr-2">
                                                                                    <img className="avatar-img rounded-circle" src={require('../../../../assets/img/doctors/doctor-thumb-09.jpg')} alt="User Image" />
                                                                                </a>
                                                                                <a className='doctor-name-in-user-dashboard'>Dr. John Gibbs <span>Dental</span></a>
                                                                            </h2>
                                                                        </td>
                                                                        <td>6 Nov 2019 <span className="d-block text-info">8.00 PM</span></td>
                                                                        <td>4 Nov 2019</td>
                                                                        <td>$600</td>
                                                                        <td>8 Nov 2019</td>
                                                                        <td><span className="badge badge-pill bg-success-light bg-light text-success">Confirm</span></td>
                                                                        <td className="text-right">
                                                                            <div className="table-action">
                                                                                <a  className="btn btn-sm bg-primary-light bg-light text-primary">
                                                                                    <i className="fas fa-print"></i> Print
                                                                                </a>
                                                                                <a  className="btn btn-sm bg-info-light bg-light text-success ms-2">
                                                                                    <i className="far fa-eye"></i> View
                                                                                </a>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <h2 className="table-avatar">
                                                                                <a  className="avatar avatar-sm mr-2">
                                                                                    <img className="avatar-img rounded-circle" src={require('../../../../assets/img/doctors/doctor-thumb-10.jpg')} alt="User Image" />
                                                                                </a>
                                                                                <a className='doctor-name-in-user-dashboard'>Dr. Olga Barlow  <span>Dental</span></a>
                                                                            </h2>
                                                                        </td>
                                                                        <td>5 Nov 2019 <span className="d-block text-info">5.00 PM</span></td>
                                                                        <td>1 Nov 2019</td>
                                                                        <td>$100</td>
                                                                        <td>7 Nov 2019</td>
                                                                        <td><span className="badge badge-pill bg-success-light bg-light text-success">Confirm</span></td>
                                                                        <td className="text-right">
                                                                            <div className="table-action">
                                                                                <a  className="btn btn-sm bg-primary-light bg-light text-primary">
                                                                                    <i className="fas fa-print"></i> Print
                                                                                </a>
                                                                                <a  className="btn btn-sm bg-info-light bg-light text-success ms-2">
                                                                                    <i className="far fa-eye"></i> View
                                                                                </a>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
    
    
    
                                                            {/* for billing */}
    
                                                            <table className="table table-hover table-center appointment-table mb-0" style={appointORbilling === 'billing' ? {} : {display:'none'}}>
                                                                <thead>
                                                                    <tr>
                                                                        <th>Ivoice Number</th>
                                                                        <th>Doctor</th>
                                                                        <th>Amount</th>
                                                                        <th>Paid On</th>
                                                                        <th>Status</th>
                                                                        <th></th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td>#1234 </td>
                                                                        <td>
                                                                            <h2 className="table-avatar">
                                                                                <a  className="avatar avatar-sm mr-2">
                                                                                    <img className="avatar-img rounded-circle" src={require('../../../../assets/img/doctors/doctor-thumb-01.jpg')} alt="User Image" />
                                                                                </a>
                                                                                <a className='doctor-name-in-user-dashboard'>Dr. Ruby Perrin <span>Dental</span></a>
                                                                            </h2>
                                                                        </td>
                                                                        <td>$160</td>
                                                                        <td>12 Nov 2019</td>
                                                                        <td>16 Nov 2019</td>
                                                                        <td className="text-right">
                                                                            <div className="table-action">
                                                                                <a  className="btn btn-sm bg-primary-light bg-light text-primary">
                                                                                    <i className="fas fa-print"></i> Print
                                                                                </a>
                                                                                <a  className="btn btn-sm bg-info-light bg-light text-success ms-2" onClick={view_navigate}>
                                                                                    <i className="far fa-eye" ></i> View
                                                                                </a>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>#1234 </td>
                                                                        <td>
                                                                            <h2 className="table-avatar">
                                                                                <a  className="avatar avatar-sm mr-2">
                                                                                    <img className="avatar-img rounded-circle" src={require('../../../../assets/img/doctors/doctor-thumb-01.jpg')} alt="User Image" />
                                                                                </a>
                                                                                <a className='doctor-name-in-user-dashboard'>Dr. Ruby Perrin <span>Dental</span></a>
                                                                            </h2>
                                                                        </td>
                                                                        <td>$160</td>
                                                                        <td>12 Nov 2019</td>
                                                                        <td>16 Nov 2019</td>
                                                                        <td className="text-right">
                                                                            <div className="table-action">
                                                                                <a  className="btn btn-sm bg-primary-light bg-light text-primary">
                                                                                    <i className="fas fa-print"></i> Print
                                                                                </a>
                                                                                <a  className="btn btn-sm bg-info-light bg-light text-success ms-2">
                                                                                    <i className="far fa-eye"></i> View
                                                                                </a>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>#1234 </td>
                                                                        <td>
                                                                            <h2 className="table-avatar">
                                                                                <a  className="avatar avatar-sm mr-2">
                                                                                    <img className="avatar-img rounded-circle" src={require('../../../../assets/img/doctors/doctor-thumb-01.jpg')} alt="User Image" />
                                                                                </a>
                                                                                <a className='doctor-name-in-user-dashboard'>Dr. Ruby Perrin <span>Dental</span></a>
                                                                            </h2>
                                                                        </td>
                                                                        <td>$160</td>
                                                                        <td>12 Nov 2019</td>
                                                                        <td>16 Nov 2019</td>
                                                                        <td className="text-right">
                                                                            <div className="table-action">
                                                                                <a  className="btn btn-sm bg-primary-light bg-light text-primary">
                                                                                    <i className="fas fa-print"></i> Print
                                                                                </a>
                                                                                <a  className="btn btn-sm bg-info-light bg-light text-success ms-2">
                                                                                    <i className="far fa-eye"></i> View
                                                                                </a>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>#1234 </td>
                                                                        <td>
                                                                            <h2 className="table-avatar">
                                                                                <a  className="avatar avatar-sm mr-2">
                                                                                    <img className="avatar-img rounded-circle" src={require('../../../../assets/img/doctors/doctor-thumb-01.jpg')} alt="User Image" />
                                                                                </a>
                                                                                <a className='doctor-name-in-user-dashboard'>Dr. Ruby Perrin <span>Dental</span></a>
                                                                            </h2>
                                                                        </td>
                                                                        <td>$160</td>
                                                                        <td>12 Nov 2019</td>
                                                                        <td>16 Nov 2019</td>
                                                                        <td className="text-right">
                                                                            <div className="table-action">
                                                                                <a  className="btn btn-sm bg-primary-light bg-light text-primary">
                                                                                    <i className="fas fa-print"></i> Print
                                                                                </a>
                                                                                <a  className="btn btn-sm bg-info-light bg-light text-success ms-2">
                                                                                    <i className="far fa-eye"></i> View
                                                                                </a>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>#1234 </td>
                                                                        <td>
                                                                            <h2 className="table-avatar">
                                                                                <a  className="avatar avatar-sm mr-2">
                                                                                    <img className="avatar-img rounded-circle" src={require('../../../../assets/img/doctors/doctor-thumb-01.jpg')} alt="User Image" />
                                                                                </a>
                                                                                <a className='doctor-name-in-user-dashboard'>Dr. Ruby Perrin <span>Dental</span></a>
                                                                            </h2>
                                                                        </td>
                                                                        <td>$160</td>
                                                                        <td>12 Nov 2019</td>
                                                                        <td>16 Nov 2019</td>
                                                                        <td className="text-right">
                                                                            <div className="table-action">
                                                                                <a  className="btn btn-sm bg-primary-light bg-light text-primary">
                                                                                    <i className="fas fa-print"></i> Print
                                                                                </a>
                                                                                <a  className="btn btn-sm bg-info-light bg-light text-success ms-2">
                                                                                    <i className="far fa-eye"></i> View
                                                                                </a>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>#1234 </td>
                                                                        <td>
                                                                            <h2 className="table-avatar">
                                                                                <a  className="avatar avatar-sm mr-2">
                                                                                    <img className="avatar-img rounded-circle" src={require('../../../../assets/img/doctors/doctor-thumb-01.jpg')} alt="User Image" />
                                                                                </a>
                                                                                <a className='doctor-name-in-user-dashboard'>Dr. Ruby Perrin <span>Dental</span></a>
                                                                            </h2>
                                                                        </td>
                                                                        <td>$160</td>
                                                                        <td>12 Nov 2019</td>
                                                                        <td>16 Nov 2019</td>
                                                                        <td className="text-right">
                                                                            <div className="table-action">
                                                                                <a  className="btn btn-sm bg-primary-light bg-light text-primary">
                                                                                    <i className="fas fa-print"></i> Print
                                                                                </a>
                                                                                <a  className="btn btn-sm bg-info-light bg-light text-success ms-2">
                                                                                    <i className="far fa-eye"></i> View
                                                                                </a>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>#1234 </td>
                                                                        <td>
                                                                            <h2 className="table-avatar">
                                                                                <a  className="avatar avatar-sm mr-2">
                                                                                    <img className="avatar-img rounded-circle" src={require('../../../../assets/img/doctors/doctor-thumb-01.jpg')} alt="User Image" />
                                                                                </a>
                                                                                <a className='doctor-name-in-user-dashboard'>Dr. Ruby Perrin <span>Dental</span></a>
                                                                            </h2>
                                                                        </td>
                                                                        <td>$160</td>
                                                                        <td>12 Nov 2019</td>
                                                                        <td>16 Nov 2019</td>
                                                                        <td className="text-right">
                                                                            <div className="table-action">
                                                                                <a  className="btn btn-sm bg-primary-light bg-light text-primary">
                                                                                    <i className="fas fa-print"></i> Print
                                                                                </a>
                                                                                <a  className="btn btn-sm bg-info-light bg-light text-success ms-2">
                                                                                    <i className="far fa-eye"></i> View
                                                                                </a>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>#1234 </td>
                                                                        <td>
                                                                            <h2 className="table-avatar">
                                                                                <a  className="avatar avatar-sm mr-2">
                                                                                    <img className="avatar-img rounded-circle" src={require('../../../../assets/img/doctors/doctor-thumb-01.jpg')} alt="User Image" />
                                                                                </a>
                                                                                <a className='doctor-name-in-user-dashboard'>Dr. Ruby Perrin <span>Dental</span></a>
                                                                            </h2>
                                                                        </td>
                                                                        <td>$160</td>
                                                                        <td>12 Nov 2019</td>
                                                                        <td>16 Nov 2019</td>
                                                                        <td className="text-right">
                                                                            <div className="table-action">
                                                                                <a  className="btn btn-sm bg-primary-light bg-light text-primary">
                                                                                    <i className="fas fa-print" ></i> Print
                                                                                </a>
                                                                                <a  className="btn btn-sm bg-info-light bg-light text-success ms-2">
                                                                                    <i className="far fa-eye" ></i> View
                                                                                </a>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>#1234 </td>
                                                                        <td>
                                                                            <h2 className="table-avatar">
                                                                                <a  className="avatar avatar-sm mr-2">
                                                                                    <img className="avatar-img rounded-circle" src={require('../../../../assets/img/doctors/doctor-thumb-01.jpg')} alt="User Image" />
                                                                                </a>
                                                                                <a className='doctor-name-in-user-dashboard'>Dr. Ruby Perrin <span>Dental</span></a>
                                                                            </h2>
                                                                        </td>
                                                                        <td>$160</td>
                                                                        <td>12 Nov 2019</td>
                                                                        <td>16 Nov 2019</td>
                                                                        <td className="text-right">
                                                                            <div className="table-action">
                                                                                <a  className="btn btn-sm bg-primary-light bg-light text-primary">
                                                                                    <i className="fas fa-print"></i> Print
                                                                                </a>
                                                                                <a  className="btn btn-sm bg-info-light bg-light text-success ms-2">
                                                                                    <i className="far fa-eye"></i> View
                                                                                </a>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
    
                                                                </tbody>
                                                            </table>
    
    
                                                            {/* for billing */}
    
    
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                    
            </div>
            {/* dash board */}

            {/* favourites */}
            <div className="user-favourite-doctors mt-5 mb-5" style={option === 'favourite' ? {} : {display:'none'}}>
               
                            <div className="user-favourite-div- row">
                                {
                                    favDoc ? favDoc.doctorId.map((doctor) => {
                                        return (
                                            <div className="favourote-card col-md-6 col-lg-6  mb-3 me-4 card   ">
                                                <div className="favourite-card-body-items-div" style={{width: "15rem;"}}>
                                                <div className="favourite-card-body-items mt-5">
                                                    <img  className="card-img-top " alt="..." src={require('../../../../assets/img/doctors/doctor-01.jpg')}/>
                                                </div>
                                            
                                            <div className="card-body">
                                                <h5 className="card-title">{doctor.doctorName} <div className="tick-round ms-3"><i class="fa-solid fa-check "></i></div></h5>
                                                <p className="card-text">BDS, MDS - Oral & Maxillofacial Surgery</p>
                                                <p className="card-text">
                                                    <AiFillStar className='star ms-1 'style={{color:'gold'}} />
                                                    <AiFillStar className='star'style={{color:'gold'}} />
                                                    <AiFillStar className='star' />
                                                    <AiFillStar className='star' />
                                                    <AiFillStar className='star' /></p>
                                                    <p className="card-location"><i className="fa-sharp fa-solid fa-location-dot me-3"></i>New York </p>
                                                <div className="favourite-doctor-button">
                                                    <a className="btn doc-view-profile-button mb-2" onClick={() => {
                                                        view_book('/doctor-profile' , doctor)
                                                    }}>View Profile</a><a className="btn doc-book-now-button mb-4" onClick={() => {
                                                        view_book('/doctor-appointment-shedule')
                                                    }}>Book Now</a>
                                                </div>
                                            </div>
                                        </div>
                                </div>
                                        )
                                    }) : ''
                                }
                                    

                               
                        </div>   
                    
                              
            </div>
            {/* favourites */}

            {/* change  password */}
            <div className="settings-change-password mt-5 mb-5 settings-and-details-part" style={option === 'change password' ? {} : {display:'none'}}>
                <div className="profile-edit-form">
                   
                   <div className="mt-5 ">
                       <div className="col-md-12 ms-4 me-3 mb-3 card-label ">
                           <label htmlFor="">Old Password</label>
                           <input type="password" name="firstName" id=""  className="form-control" />
                       </div>
                       <div className="col-md-12 ms-4 me-3 mb-3 card-label ">
                           <label htmlFor="">New password</label>
                           <input type="password" name="lastName" id=""  className="form-control" />
                       </div>
                     </div>
                     <div className="form-arrangemen ">
                       <div className="col-md-12 ms-4 me-3 mb-3 card-label ">
                           <label htmlFor="">Confirm Password</label>
                           <input type="password" name="email" id=""  className="form-control" />
                       </div>
                     </div>
   
                   </div>
                   <div className="confirm-edit-div">
                       <Button  className="profile-change-confirm book-now-button " style={{float:'left'}}  type="submit" >Save Changes</Button>
                   </div>
            </div>
            {/* change  password */}
        </div>
   </>
  )
}

export default Body
