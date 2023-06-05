import React , {useEffect, useState} from 'react'
import './Body.css'
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { userLogoutAction, user_edit_password, user_edit_profile, user_favorite_doctor, userdetails } from '../../../../../redux/actions/user';
import {  toast } from 'react-toastify';
import Toast from '../../../../Toast'
import Loading from '../../../../loading/Loading'
import Pagination from '../../../../Pagination/Pagination'
import io from "socket.io-client";



// google logout
import { googleLogout, } from '@react-oauth/google';
import { userOrders } from '../../../../../redux/actions/common';
import { Badge } from 'react-bootstrap';
import FormControl from '@mui/material/FormControl';
import { InputLabel, MenuItem, Select } from '@mui/material';

const socket = io.connect("http://localhost:3002");
// user profile 
// url : /user_profile

function Body() {
    
    const [option , setOption] = useState('Dash Board')
    const userData = useSelector((state) => state.userLogin.data)
    const userDetailsData = useSelector((state) => state.userDetailsReducer.data)
    const [ , setReload] = useState()

    const dispatch = useDispatch()
    const navigate = useNavigate()
    // const view_navigate = () => {
    //     navigate('/view-invoice')
    // }
    const view_doc_or_book = (url) => {
        console.log('userId' , userDetailsData._id);
        socket.emit("join_room",  userDetailsData?._id);
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

    // all orders
  

    // favorite doctors
    const favDoc = useSelector((state) => state.userFavDocReducer.favDoc)
    const allOrders = useSelector((state) => state.userAllOrders.doctor?.data)

    const [filter , setFilter] = useState({
        page : 1 , 
        perPage : 5 ,
        appointmentStatus : undefined ,
        count : allOrders?.count ,
        search : ''
    })


    const handleChange = (event) => {
        if (event.target.value === 'false') {
            setFilter({
                ...filter,
                appointmentStatus: false
            });
        } else {
            setFilter({
                ...filter,
                appointmentStatus: event.target.value
            });
        }
    }


    useEffect(() => {
        dispatch(user_favorite_doctor(userData._id , null , userData.from))
        dispatch(userOrders(userData._id , filter.appointmentStatus , filter.page , filter.perPage))
        dispatch(userdetails(userData._id))
    } , [ ])
   
    useEffect(() => {
        dispatch(userOrders(userData._id, filter.appointmentStatus, filter.page, filter.perPage , filter.search) )
    }, [filter.perPage, filter.page, filter.appointmentStatus, dispatch, userData._id , filter.search])

    useEffect(() => {
       if(allOrders?.count) {
         setFilter({
            ...filter ,
            count : allOrders?.count
        })
       }
    } , [ allOrders?.count ])

    // profile edit
    const [temp , setTemp] = useState()
    const [picture , setPicture] = useState()
    const [name , setFirstName] = useState(userData.name)
    const [lastName , setlastName] = useState(userData.lastName)
    const [dob , setDob] = useState(userData.dob)
    const [bloodGroup , setBloodGroup] = useState(userData.bloodGroup)
    const [email , setEmail] = useState(userData.email)
    const [phone , setPhone] = useState(userData.phone)
    const [address , setAddress] = useState(userData.address)
    const [city , setCity] = useState(userData.city)
    const [state , setState] = useState(userData.state)
    const [zipCode , setZipCode] = useState(userData.zipCode)
    const [country , setCountry] = useState(userData.country)
    const profileEdit = useSelector((state) => state.userLogin)
    const submit_User_Details = () => {
        const details = {
            _id : userData._id ,
            name ,
            lastName ,dob ,
            bloodGroup ,email ,
            phone ,address ,
            city ,state ,
            zipCode ,country ,
            from : userData.from
        }
        const formData = new FormData()
        formData.append('file', picture)
        formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET)
        if(formData) {
            fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_ID}/image/upload`, {
                method: 'POST',
                body: formData,
              }).then((Data) => {
                  Data.json().then((data) => {
                      details.picture = data.url
                      dispatch(user_edit_profile(details))
                  })
              }).catch((err) => {
                   profileEdit.loading = true
                   dispatch(user_edit_profile(details))
                   setReload()
              }) 
        } else {
            dispatch(user_edit_profile(details))
        }
        
        
    }
    // change password

    const [oldPassword , setOldPassword] = useState('')
    const [password , setPassword] = useState('')
    const [confirmPassword , setConfirmPassword] = useState('')
    const [oldPasswordCheck , setOldPasswordCheck] = useState(false)
    const [newPasswordCheck , setNewPasswordCheck] = useState(false)
    const [confirmPasswordCheck , setConfirmPasswordCheck] = useState(false)
    const userEmal = userData.email
    const passwordResult = useSelector((data) => data.userPasswordEdit)
    const changePassword = () => {
        if(password === confirmPassword) {
            dispatch(user_edit_password(oldPassword , password , userEmal))
            if(passwordResult.password) {
                toast.success('Password changed succesfully');
            } else {
                toast.error(passwordResult.passwordError);
            }
        } else {
            toast.error('Confirm password is not matching');
        }
    }

         console.log("FILTE");
       console.log(filter)
   
  return (
   <>
   <div className="profile-settings-container" >

            {/* profile side bar */}
            <div className="profile-contents shadow rounded  mb-5">
                {
                    userData.from === 'google' && option !== 'Dash Board' ? <Toast /> : ''
                }
                <div className="profle-image-user">
                    <div className="round-for-image">
                        <img src={userDetailsData ? userDetailsData?.picture ? userDetailsData.picture : require('../../../../assets/img/patients/patient.jpg') :require('../../../../assets/img/patients/patient.jpg')} alt="userimage" className='user-image' />
                    </div>
                </div>
                <div className="user-details mt-4">
                    <div className="user-header">
                        <h4 className="user-name">
                            {userDetailsData?.name} {userDetailsData?.lastName}
                        </h4>
                    </div>
                    <div className="other-details">
                        <span> 
                        {userDetailsData?.email}</span>
                        <span> <i className="fa-solid fa-location-dot me-2 mt-2"></i>NewYork , USA</span>
                    </div>
                </div>
                <hr className='profile-hr' />
                <div className="option-content ">
                    <div className="dashboard-div ms-3" onClick={() => {
                        change_Option('Dash Board')
                    }}>
                        <span style={option === 'Dash Board' ? {color:'#20c0f3'} : {}}><i className="fa-solid fa-table-columns me-3"></i>Dash Board</span>
                    </div>
                    <hr className='profile-hr' />

                    <div className="dashboard-div ms-3" onClick={() => {
                        setOption('favourite')
                    }}>
                        <span style={option === 'favourite' ? {color:'#20c0f3'} : {}}><i className="fa-solid fa-bookmark me-3"></i>Favourites</span>
                    </div>
                    <hr className='profile-hr' />

                    <div className="dashboard-div ms-3" onClick={() => {
                        view_doc_or_book('/user-chat')
                    }}>
                        <span><i className="fa-solid fa-comments me-3"></i>Messages</span>
                    </div>
                    <hr className='profile-hr' />

                    <div className="dashboard-div ms-3" onClick={() => {
                        change_Option('profile settings')
                    }}>
                        <span style={option === 'profile settings' ? {color:'#20c0f3'} : {} }><i className="fa-solid fa-gears me-3"></i>Profile Settings</span>
                    </div>
                    <hr className='profile-hr' />

                    <div className="dashboard-div ms-3" onClick={() => {
                        if(userData.from === 'google') {
                            toast.error('Cannot change the password ');
                        } else {
                            change_Option('change password')
                        }
                        
                    }}>
                        <span style={option === 'change password' ? {color:'#20c0f3'} : {} }><i className="fa-solid fa-lock me-3" ></i>Change Password</span>
                    </div>
                    <hr className='profile-hr' />
                    <div className="dashboard-div ms-3" 
                  
                    onClick={logOut}
                    >
                        <span><i className="fa-solid fa-right-from-bracket me-3"></i>Logout</span>
                    </div>
                </div>
            </div>
            {/* profile side bar */}

            {/* profile edit */}
            <div className="settings-and-details-part mt-5 mb-5 shadow rounded bg-white" style={option === 'profile settings' ? {} : {display:'none'}}>
                <div className="user-profile-edit">
                      <img src={temp ? temp : userDetailsData ? userDetailsData?.picture ? userDetailsData.picture : require('../../../../assets/img/patients/patient.jpg') :require('../../../../assets/img/patients/patient.jpg')} style={{width:'8em'}} alt=''/>
                    <div className="file-input mt-4">
                        <input type="file" id="file-input" className='user-profile-select-edit' onChange={(e) => {
                             if (e.target.files && e.target.files[0]) {
                                setTemp(URL.createObjectURL(e.target.files[0]));
                                setPicture(e.target.files[0])
                              }
                        }}/>
                        <label className="file-input__label" htmlFor="file-input"><i className="fa-solid fa-upload me-2 ms-2"></i>
                        <span>Upload file</span></label>
                    </div>
                </div>
                <div className="profile-edit-form">
                   
                    <div className="form-arrangement ">
                        <div className="col-md-5 ms-4 me-3 mb-3 card-label ">
                            <label htmlFor="">First Name</label>
                            <input type="text" name="firstName" id=""  placeholder={userDetailsData?.name} className="form-control" onChange={(e) => {
                                setFirstName(e.target.value)
                            }}/>
                        </div>
                        <div className="col-md-5 ms-4 me-3 mb-3 card-label ">
                            <label htmlFor="">Last Name</label>
                            <input type="text" name="lastName" id="" placeholder={userDetailsData?.lastName ? userDetailsData?.lastName : "wilson" } className="form-control" onChange={(e) => {
                                setlastName(e.target.value)
                            }}/>
                        </div>
                      </div>
                      <div className="form-arrangement ">
                        <div className="col-md-5 ms-4 me-3 mb-3 card-label ">
                            <label htmlFor="">Date of Birth</label>
                              <input type="text" name="dob" id="" placeholder={userDetailsData?.dob ? userDetailsData?.dob.includes('T') ? userDetailsData?.dob.split('T')[0] : userDetailsData?.dob  : "00/00/0000"} className="form-control" 
                            onChange={(e) => {
                                setDob(e.target.value)
                            }}/>
                        </div>
                        <div className=" col-md-5 me-3 ms-4 mb-3 card-label ">
                            <label htmlFor="">Blood Group</label>
                            <input type="text" name="bloodGroup" id="" placeholder={userDetailsData?.bloodGroup ? userDetailsData?.bloodGroup : 'A+' } className="form-control" onChange={(e) => {
                                setBloodGroup(e.target.value)
                            }}/>
                        </div>
                      </div>
    
    
                      <div className="form-arrangement ">
                        <div className="col-md-5 ms-4 me-3 mb-3 card-label ">
                            <label htmlFor="">Email ID</label>
                            <input type="email" name="email" id="" disabled={userData?.from === "google" ? true : false} placeholder={userDetailsData?.email ? userDetailsData?.email : 'abc@gmail.com' }  className="form-control" onChange={(e) => {
                                setEmail(e.target.value)
                            }}/>
                        </div>
                        <div className="col-md-5 ms-4 me-3 mb-3 card-label ">
                            <label htmlFor="">Mobile</label>
                            <input type="text" name="phone" id=""  placeholder={userDetailsData?.phone ? userDetailsData?.phone : '0000000000'} className="form-control" onChange={(e) => {
                                setPhone(e.target.value)
                            }}/>
                        </div>
                      </div>
                      
    
                        <div className="address-form- col-md-12 ms-4 me-3 mb-3 card-label ">
                            <label htmlFor="">Address</label>
                            <input type="text" name="firstName" id=""  placeholder={userDetailsData?.address ? userDetailsData?.address : 'New York'} className="form-control" onChange={(e) => {
                                setAddress(e.target.value)
                            }}/>
                        </div>
                      
    
    
                      <div className="form-arrangement ">
                        <div className="col-md-5 ms-4 me-3 mb-3 card-label ">
                            <label htmlFor="">City</label>
                            <input type="text" name="city" id=""  placeholder={userDetailsData?.city ? userDetailsData?.city : 'New York'} className="form-control" onChange={(e) => {
                                setCity(e.target.value)
                            }}/>
                        </div>
                        <div className="col-md-5 ms-4 me-3 mb-3 card-label ">
                            <label htmlFor="">State</label>
                            <input type="text" name="state" id="" placeholder={userDetailsData?.state ? userDetailsData?.state : 'New York'} className="form-control" onChange={(e) => {
                                setState(e.target.value)
                            }}/>
                        </div>
                      </div>
                      <div className="form-arrangement ">
                        <div className="col-md-5 ms-4 me-3 mb-3 card-label ">
                            <label htmlFor="">Zip code</label>
                            <input type="text" name="zipCode" id=""  placeholder={userDetailsData?.zipCode ? userDetailsData?.zipCode : '678601'} className="form-control" onChange={(e) => {
                                setZipCode(e.target.value)
                            }}/>
                        </div>
                        <div className=" col-md-5 me-3 ms-4 mb-3 card-label ">
                            <label htmlFor="">Country</label>
                            <input type="text" name="phone" id=""  placeholder={userDetailsData?.country ? userDetailsData?.country : 'USA'} className="form-control" onChange={(e) => {
                                setCountry(e.target.value)
                            }}/>
                        </div>
                      </div>
                    </div>
                    <div className="confirm-edit-div">
                      {
                        profileEdit.loading ? <Loading /> :  <Button  className="profile-change-confirm book-now-button" onClick={submit_User_Details} >Save Changes</Button>
                      } 
                    </div>
            </div>
            {/* profile edit */}
    
            {/* dash Board */}
            <div className="settings-and-details-part appointment-and-booking-details mt-5 mb-5  rounded" style={option === 'Dash Board' ? {} : {display:'none'}}>
                {
                    userData.from === 'google' && option === 'Dash Board' ? <Toast /> : ''
                }
                    
                   <div className="doc-table-div ms-3  w-100">
                        <div className="tab-content p-2">

                        {/* <!-- Appointment Tab --> */}
                        <div id="pat_appointments" className="tab-pane fade show active ">
                              <div className="wallet w-100 ">
                                  <div className="card ms-auto col-md-5 col-sm-8 col-12 mb-3 shadow rounded p-3 fw-bold">
                                      wallet Balance: {userDetailsData?.wallet} $
                                  </div>
                                  <div className="card ms-auto col-md-5 col-sm-8 col-12 mb-3 shadow rounded p-3 wallet-spend fw-bold">
                                      wallet spend : {userDetailsData?.walletSpend} $
                                  </div>
                              </div>
                              <div className="card card-table mb-0 shadow rounded">
                            <div className="filter m-4  row col-12">
                            
                                <div className="doc-filter-status col-8">
                                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} className=''>
                                    <InputLabel id="demo-simple-select-standard-label">Status</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={filter.appointmentStatus}
                                    onChange={handleChange}
                                    label="Age"
                                    >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={'false'}>All</MenuItem>
                                    <MenuItem value={'accepted'}>Accepted</MenuItem>
                                    <MenuItem value={'canceled'}>Caneled</MenuItem>
                                    <MenuItem value={'pending'}>Pending</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            
                                <div className="doc-filter search col-3" style={{float :'right'}}>
                                <input type="text" name="search" id="" className='form-control  mt-3' placeholder='&#xf002;Search' style={{ fontFamily:'Arial, FontAwesome'}} 
                                    onChange={(e) => {
                                      setFilter({
                                        ...filter ,
                                        search : e.target.value
                                      })
                                    } }
                                />
                                </div>
                            </div>
                            <hr />
                            <div className="card-body w-100">
                                <div className="table-responsive">
                                <table className="table table-hover table-center mb-0">
                                    <thead>
                                    <tr>
                                        <th>Doctor</th>
                                        <th>Appt Date</th>
                                        <th>Booking Date</th>
                                        <th>Amount</th>
                                        <th>Payment </th>
                                        <th>Status</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    
                                    {
                                        allOrders?.data?.[0]?.map((ele) => {
                                        return (
                                            <tr>
                                            <td>
                                                <h2 className="table-avatar">
                                                    <a  className="avatar avatar-sm mr-2">
                                                        <img className="avatar-img rounded-circle" src={ele.doctor?.picture ? `${process.env.REACT_APP_BACKEND_URL}/${ele.doctor?.picture}` : require('../../../../assets/img/doctors/doctor-thumb-01.jpg')} alt="User Image" />
                                                    </a>
                                                    <a className='doctor-name-in-user-dashboard'>Dr. {ele.doctor?.doctorName} <span>{ele.doctor?.speciality}</span></a>
                                                </h2>
                                            </td>
                                            <td>{ele.orderDate} <span className="d-block text-info">{ele.time.startingTime}</span></td>
                                            <td> <Badge bg='secondary' >{ele.orderDate}</Badge> </td>
                                            
                                            <td> {ele.totalAmount} $</td>
                                            <td className='fw-bold'> {ele.paymentMethod}</td>
                                            <td><Badge color='success' bg={ele.appointmentStatus === 'accepted' 
                                            ? 'success' : ele.appointmentStatus === 'canceled' 
                                                ? 'danger' : 'warning'}> {ele.appointmentStatus} </Badge></td>
                                            <td className="text-right">
                                                        <div className="table-action">
                                                            <a className="btn btn-sm bg-info-light bg-light text-info me-2" onClick={() => {
                                                                navigate('/view-invoice' , {state : {orderId : ele._id}})
                                                            }}>
                                                                <i className="fas fa-print"></i> Print
                                                            </a>
                                                        </div>
                                                    </td> 
                                            </tr>
                                        )
                                        })
                                    }
                                    
                                    </tbody>
                                </table>
                                </div>
                            </div>
                            </div>
                        </div>

                        <div className="doc-pagination mt-3">
                            <Pagination setFilter={setFilter} filter={filter} />
                        </div>
                        </div>
                    </div>                         
                    
            </div>
            {/* dash board */}

            {/* favourites */}
            <div className="user-favourite-doctors mt-5 mb-5 " style={option === 'favourite' ? {} : {display:'none'}}>
               
                            <div className="user-favourite-div- row">
                                {
                                    favDoc ? favDoc.doctorId.map((doctor) => {
                                        return (
                                            <div className="favourote-card col-md-6 col-lg-6  mb-3 me-4 card   ">
                                                <div className="favourite-card-body-items-div" style={{width: "15rem"}}>
                                                <div className="favourite-card-body-items mt-5">
                                                    <img  className="card-img-top " alt="..." src={doctor?.picture ? `${process.env.REACT_APP_BACKEND_URL}/${doctor.picture}` : require('../../../../../assets/default Profile.webp')}
                                                        style={{height: '10rem'}}
                                                    />
                                                </div>
                                            
                                            <div className="card-body">
                                                <h5 className="card-title">{doctor.doctorName} <div className="tick-round ms-3"><i className="fa-solid fa-check "></i></div></h5>
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
                                                        view_book('/doctor-appointment-shedule' , doctor)
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
            <div className="settings-change-password mt-5 mb-5 settings-and-details-part shadow rounded" style={option === 'change password' ? {} : {display:'none'}}>
                <div className="profile-edit-form">
                    <Toast />
                   <div className="mt-5 ">
                       <div className="col-md-12 ms-4 me-3 mb-3 card-label ">
                           <label htmlFor="">Old Password</label>
                           <input type={oldPasswordCheck ? 'text' : "password"} name="firstName" id=""  className="form-control" onChange={(e) => {
                                setOldPassword(e.target.value)
                           }}/>
								<input type="checkbox" style={{textDecoration:'none' , boxShadow:'none'}} name="" className='ms-auto' id=""  onClick={(e) => {
									setOldPasswordCheck(e.target.checked)
								}}/>
                       </div>
                       <div className="col-md-12 ms-4 me-3 mb-3 card-label ">
                           <label htmlFor="">New password</label>
                           <input type={newPasswordCheck ? 'text' : 'password'} name="lastName" id=""  className="form-control" onChange={(e) => {
                                setPassword(e.target.value)
                           }}/>
								<input type="checkbox"style={{textDecoration:'none', boxShadow:'none' }}  className='ms-auto' name="" id=""  onClick={(e) => {
									setNewPasswordCheck(e.target.checked)
								}}/>
                       </div>
                     </div>
                     <div className="form-arrangemen ">
                       <div className="col-md-12 ms-4 me-3 mb-3 card-label ">
                           <label htmlFor="">Confirm Password</label>
                           <input type={confirmPasswordCheck ? 'text' : 'password'} name="email" id=""  className="form-control" onChange={(e) => {
                                setConfirmPassword(e.target.value)
                           }}/>
								<input type="checkbox" name="" style={{textDecoration:'none', boxShadow:'none' }} className='ms-auto' id=""  onClick={(e) => {
									setConfirmPasswordCheck(e.target.checked)
								}}/>
                       </div>
                     </div>
   
                   </div>
                   <div className="confirm-edit-div">
                       <Button  className="profile-change-confirm book-now-button " style={{float:'left'}}  type="submit" onClick={changePassword}>Save Changes</Button>
                   </div>
            </div>
            {/* change  password */}
        </div>
   </>
  )
}

export default Body
