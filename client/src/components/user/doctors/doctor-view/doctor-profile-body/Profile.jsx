import React, { useEffect, useState } from 'react'
import './profile.css'
import { AiFillStar } from 'react-icons/ai';
import {MdFavoriteBorder} from 'react-icons/md'
import {BsChatLeft , BsChat } from 'react-icons/bs'
import {IoLocationOutline} from 'react-icons/io5'
import { BiRupee} from 'react-icons/bi'
import Button from 'react-bootstrap/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {user_add_favorite_doctor, user_favorite_doctor} from '../../../../../redux/actions/user'



// doctor profile from user side 
// url : /doctor profile


function Profile() {
    const location = useLocation()
    const navigate = useNavigate()
    let favDocStatus = false
    const userData = useSelector((state) => state.userLogin.data)
    const favDoc = useSelector((state) => state.userFavDocReducer.favDoc)
    const [favDoctor , setFavDoc] = useState(false)
    const bookNow = (doctor) => {
        navigate('/doctor-appointment-shedule' ,  {state : {doctor}})
    }
    const dispatch = useDispatch()
    useEffect (() => {
        dispatch(user_favorite_doctor(userData._id , location.state.doctor._id , userData.from))
    },[favDoctor])
    const favDoctors = (doctorId) => {
        if(localStorage.getItem("userInfo")) {
            dispatch(user_add_favorite_doctor(userData._id, doctorId , userData.from))
            if(favDoctor=== true) {
                setFavDoc(false)
            } else {
                setFavDoc(true)
            }
        } else {
        }
       
        
    }
    const styles = 
    "#51dfa4";
   
   const [style,setStyle] = useState('overview')
  
  return (
    <>
        <div className="profil-container">
            <div className="profile_container_box mt-5">
                <div className="prfile_details">
                    <div className="profile_image_div">
                        <img className='doctor-profile-image mt-4 ms-4' src={location.state.doctor ?.profile ? location.state.doctor.profile :  require('../../../../assets/img/doctors/doctor-01.jpg') } alt="" />   
                    </div>
                    <div className="profile_details_Div ms-3 mt-4">
                       <h3>Dr.{location.state.doctor.doctorName}</h3>
                       <p>{location.state.doctor.eduacation ? location.state.doctor.eduacation : "not given"}</p><br />
                            <div className="speciality_div">
                                <img className='speciality_image' src={require('../../../../assets/img/specialities/specialities-05.png')} alt="" /><p>{location.state.doctor.speciality}</p>
                            </div>
                            <div className="review-star">
                            <AiFillStar className='star'/><AiFillStar className='star'/><AiFillStar className='star'/><AiFillStar className='star'/><AiFillStar className='star'/>
                            </div>
                            <div className="hospital-images mt-3">
                                <img className='hospital-feature-image me-2' src={require('../../../../assets/img/features/feature-01.jpg')} alt="" />
                                   
                                <img className='hospital-feature-image me-2' src={require('../../../../assets/img/features/feature-01.jpg')} alt="" />
                                <img className='hospital-feature-image me-2' src={require('../../../../assets/img/features/feature-01.jpg')} alt="" />
                                <img className='hospital-feature-image me-2' src={require('../../../../assets/img/features/feature-01.jpg')} alt="" />
                            </div>
                       
                    </div>
                </div>
                <div className="profile_book_details"> 
                    <div className='profile-right-side'>
                        <ul className='profile-details-list mt-3 me-3'>
                            <li className='mb-2 icon-list'> <BsChat className='list-icon me-3'/>{location.state.doctor.reviews.length} feedback</li>
                            <li className='mb-2 icon-list'><IoLocationOutline className='list-icon me-3'/>{location.state.doctor.location ? location.state.doctor.location: "Not given"}</li>
                            <li className='mb-2 icon-list'><BiRupee className='list-icon me-3'/>{location.state.doctor.fees ? location.state.doctor.fees + "  $ per Hour":"Not disclosed"}</li>
                        </ul> 
                        <div className="icon-and-button">
                            <div className="chat-fav">
                                
                                   {
                                    
                                    favDoc !== undefined  ? 
                                        favDoc.doctorId.map((data) => {
                                            if(data._id == location.state.doctor._id) {
                                                favDocStatus = true
                                            }
                                        }) 
                                      
                                    
                                    :  
                                   ''
                                   }
                                <div className="fav ms-3" style={favDocStatus ? {backgroundColor : "red" , border:"red"} : {}} onClick={() => {
                                        favDoctors(location.state.doctor._id)
                                    }}>
                                    <MdFavoriteBorder className='chat-fav-icons fav-icon ms-2 mt-2 me-2 mb-2' />
                                </div>
                                    
                                <div className="chat ms-3" >
                                    <BsChatLeft className='chat-fav-icons ms-2 chat-icon mt-2 me-2 mb-2'/>
                                </div>
                            </div>
                            <div className="book-button mt-3">
                                <Button className=' menu-doc-book-from-profile' onClick={() => {
                                    bookNow(location.state.doctor)
                                }}>Book Now</Button>
                            </div>   
                        </div>
                    </div>
                </div>
            </div>
            <div className="detail_container_box mt-5 mb-5">
                <div className="container container-bottom ">
                    <div className="overview">
                        <h5 className='bottom-heading' onClick={() => {
                            setStyle('overview')
                        }} style={{color : style === 'overview' ? styles : ''}}>OverView</h5>
                    </div>
                    <div className="location">
                        <h5 className='bottom-heading' onClick={() => {
                            setStyle('location')
                        }} style={{color : style === 'location' ? styles : ''}}>Location</h5>
                    </div>
                    <div className="review">
                        <h5 className='bottom-heading' onClick={() => {
                            setStyle('review')
                        }} style={{color : style === 'review' ? styles : ''}}>Reviews</h5>
                    </div>
                </div>
                <div style={{display:style === 'overview' ? '' : 'none'}} className="overviewdiv ms-5 mt-5 me-5 mb-5">
                    <h4 className='ms-1'>About Me</h4>
                    <hr />
                    <p className='aboutMepara'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, explicabo dolorum iure magni numquam cumque ut ullam, illo perspiciatis mollitia maiores architecto tempore labore voluptates pariatur incidunt aut laborum quod?
                    </p>
                    <h4 className='ms-1'>Education</h4>
                    <hr />
                    <p className='aboutMepara'>B.Sc Computer Science
                    </p>
                </div>
                <div style={{display:style === 'location' ? '' : 'none'}} className="overviewdiv ms-5 mt-5 me-5 mb-5">
                    <div className="card card-content">
                        <div className="location-card ms-5 mt-5 me-5 mb-5">
                            <div className="hospital">
                                <h3>Smile cute dental center</h3>
                                <p className="paragraph">MDS - Periodontology and Oral Implantology, BDS</p>
                                <div className="locationLocal">
                                    <IoLocationOutline />
                                    <p className="paragraph ms-4">2286 Sundown Lane, Austin, Texas 78749, USA</p>
                                </div>
                                <div className="hospital-images mt-3">
                                    <img className='hospital-feature-image me-2' src={require('../../../../assets/img/features/feature-01.jpg')} alt="" />
                                    <img className='hospital-feature-image me-2' src={require('../../../../assets/img/features/feature-01.jpg')} alt="" />
                                    <img className='hospital-feature-image me-2' src={require('../../../../assets/img/features/feature-01.jpg')} alt="" />
                                    <img className='hospital-feature-image me-2' src={require('../../../../assets/img/features/feature-01.jpg')} alt="" />
                                </div>
                            </div>
                            <div className='location-star'>
                                <div className='start-left me-4'>
                                    <AiFillStar className='star me-auto' />
                                    <AiFillStar className='star' />
                                    <AiFillStar className='star' />
                                    <AiFillStar className='star' />
                                    <AiFillStar className='star' />
                                </div>
                                      
                            </div>
                        </div> 
                    </div>
                </div>
                <div style={{display:style === 'review' ? '' : 'none'}} className="overviewdiv reviewDiv ms-5 mt-5 me-5 mb-5">

                    <div className="card mb-5">
                        <div className="review-image-div">
                            <div className="review-image">
                                <div>
                                    <img className='review-patient-image' src={require('../../../../assets/img/patients/patient1.jpg')} alt="" />
                                </div>
                                <div className='ms-5'>
                                    <h4 className='reviewPatientName'>Richard wilson</h4>
                                    <p className='paragraph'>Reviewed 2 Days ago</p>
                                </div>
                            </div>
                            <div className="ratingstar">
                                    <AiFillStar className='star' />
                                    <AiFillStar className='star' />
                                    <AiFillStar className='star' />
                                    <AiFillStar className='star' />
                                    <AiFillStar className='star' />
                            </div>
                        </div>                     
                        <div className="reviewPara ms-3">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum explicabo commodi veniam nulla sapiente. Hic exercitationem consectetur, voluptate odio vero obcaecati aut sequi quas incidunt deserunt, ullam at suscipit eos.
                            </p>
                            <div className="ratingstar"></div>
                        </div>
                    </div>
                    <div className="card mb-5">
                        <div className="review-image-div">
                            <div className="review-image">
                                <div>
                                    <img className='review-patient-image' src={require('../../../../assets/img/patients/patient1.jpg')} alt="" />
                                </div>
                            
                                <div className='ms-5'>
                                    <h4 className='reviewPatientName'>Richard wilson</h4>
                                    <p className='paragraph'>Reviewed 2 Days ago</p>
                                </div>
                            </div>
                            <div className="ratingstar">
                                    <AiFillStar className='star' />
                                    <AiFillStar className='star' />
                                    <AiFillStar className='star' />
                                    <AiFillStar className='star' />
                                    <AiFillStar className='star' />
                            </div>
                        </div>
                        <div className="reviewPara ms-3">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum explicabo commodi veniam nulla sapiente. Hic exercitationem consectetur, voluptate odio vero obcaecati aut sequi quas incidunt deserunt, ullam at suscipit eos.
                            </p>
                            <div className="ratingstar"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Profile
