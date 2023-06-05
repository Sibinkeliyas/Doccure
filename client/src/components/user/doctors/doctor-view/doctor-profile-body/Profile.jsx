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
import {user_add_favorite_doctor,  user_favorite_doctor, user_find_reviews} from '../../../../../redux/actions/user'
import Review from '../../../../modal/review'
import { ToastContainer, toast } from 'react-toastify';




// doctor profile from user side 
// url : /doctor profile


function Profile() {
    const location = useLocation()
    const navigate = useNavigate()
    const [color , setColor] = useState('white')
    const [preSetColor , setPresetcolor] = useState('red')
    const [reviewButton , setReviewButton] = useState(false)
    const [reviewModel , setReviewModel ] = useState({
        status : false ,
        rating : 0
    })
    let favDocStatus = false
    const userData = useSelector((state) => state.userLogin.data)
    const favDoc = useSelector((state) => state.userFavDocReducer.favDoc)
    const userreviews = useSelector((state) => state.userfindReviews.doctor)
    const [reviews , setReviews] = useState([])
    const [favDoctor , setFavDoc] = useState(false)
    const bookNow = (doctor) => {
        navigate('/doctor-appointment-shedule' ,  {state : {doctor}})
    }
    const dispatch = useDispatch()
    useEffect (() => {
        dispatch(user_favorite_doctor(userData._id , location.state.doctor._id , userData.from))
    },[ favDoctor ])
    useEffect(() => {
        if (userreviews?.data) {
            setReviews(userreviews?.data)
            setReviewButton(false)
        }
    }, [ userreviews?.data ])


    useEffect(() => {
        dispatch(user_find_reviews(location.state.doctor._id))
    }, [dispatch, location.state.doctor._id])
    // add to favorites
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

    // for changing color in each color

    const changeColor = (doctorId ,type) => {
        if(type === "preSet") {
            if(preSetColor === "red") {
                setPresetcolor('white')
            } else {
                setPresetcolor('red')
            }
        } else {
            if(color === "red" ) {
                setColor("white")
            } else {
                setColor("red")
            }
        }
        favDoctors(doctorId)
    }

    const styles = "#51dfa4";
    const [style,setStyle] = useState('overview')
  
  return (
    <>
        <div className="profil-container">
        <ToastContainer />
            <div className="profile_container_box mt-5 shadow rounded">
                <div className="prfile_details">
                    <div className="profile_image_div">
                        <img className='doctor-profile-image mt-4 ms-4' src={location.state.doctor ?.picture ? `${process.env.REACT_APP_BACKEND_URL}/${location.state.doctor?.picture}` : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' } alt="docImage" />   
                    </div>
                    <div className="profile_details_Div ms-3 mt-4">
                       <h3>Dr.{location.state.doctor.doctorName}</h3>
                       <p>{location.state.doctor.eduacation ? location.state.doctor.eduacation : "not given"}</p><br />
                            <div className="speciality_div">
                                <img className='speciality_image' src={require('../../../../assets/img/specialities/specialities-05.png')} alt="" /><p>{location.state.doctor.speciality}</p>
                            </div>
                            <div className="review-star">
                              <AiFillStar className='star' style={userreviews?.count >= 1 ? {color:'gold'} : {color:'black'}}/>
                              <AiFillStar className='star' style={userreviews?.count >= 2 ? { color: 'gold' } : { color: 'black' }} />
                              <AiFillStar className='star' style={userreviews?.count >= 3 ? { color: 'gold' } : { color: 'black' }} />
                              <AiFillStar className='star' style={userreviews?.count >= 4 ? { color: 'gold' } : { color: 'black' }} />
                              <AiFillStar className='star' style={userreviews?.count >= 5 ? { color: 'gold' } : { color: 'black' }} />
                            </div>
                            <div className="hospital-images mt-3">
                                <img className='hospital-feature-image me-2' src={require('../../../../assets/img/features/feature-01.jpg')} alt="" />
                                   
                                <img className='hospital-feature-image me-2' src={require('../../../../assets/img/features/feature-01.jpg')} alt="" />
                                <img className='hospital-feature-image me-2' src={require('../../../../assets/img/features/feature-01.jpg')} alt="" />
                                <img className='hospital-feature-image me-2' src={require('../../../../assets/img/features/feature-01.jpg')} alt="" />
                            </div>
                       
                    </div>
                </div>
                <div className="profile_book_details "> 
                    <div className='profile-right-side'>
                        <ul className='profile-details-list mt-3 me-3'>
                            <li className='mb-2 icon-list'> <BsChat className='list-icon me-3'/>{location.state.doctor.reviews.length} feedback</li>
                            <li className='mb-2 icon-list'><IoLocationOutline className='list-icon me-3'/>{location.state.doctor.location ? location.state.doctor.location: "Not given"}</li>
                            <li className='mb-2 icon-list'><BiRupee className='list-icon me-3'/>{location.state.doctor.fees ? location.state.doctor.fees + "  $ per Hour":"Not disclosed"}</li>
                        </ul> 
                        <div className="icon-and-button">
                            <div className="chat-fav">
                                
                                   {
                                    
                                    favDoc !== undefined || favDoc !== null ? 
                                        favDoc?.doctorId.map((data) => {
                                            if(data._id == location.state.doctor._id) {
                                                favDocStatus = true
                                            }
                                        }) 
                                      
                                    
                                    :  
                                   ''
                                   }
                                    {
                                    favDocStatus ?   <div className="fav ms-3" style={ {backgroundColor : preSetColor , border:preSetColor}} onClick={() => {
                                        changeColor(location.state.doctor._id , "preSet")
                                    }}>
                                        <MdFavoriteBorder className='chat-fav-icons fav-icon ms-2 mt-2 me-2 mb-2' />
                                    </div> 
                                    :   
                                    <div className="fav ms-3" style={{backgroundColor:color , border:'black'}} onClick={() => {
                                        changeColor(location.state.doctor._id , "")
                                    }}>
                                        <MdFavoriteBorder className='chat-fav-icons fav-icon ms-2 mt-2 me-2 mb-2' />
                                    </div>
                                    }
                                    
                                {/* <div className="chat ms-3" >
                                    <BsChatLeft className='chat-fav-icons ms-2 chat-icon mt-2 me-2 mb-2'/>
                                </div> */}
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
            <div className="detail_container_box mt-5 mb-5 shadow rounded" style={{border:'none'}}>
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
                            if(userData) {
                                setStyle('review')
                            } else {
                                toast.error('You have to login for to see the reviews')
                            }
                           
                        }} style={{color : style === 'review' ? styles : ''}} >Reviews</h5>
                    </div>
                </div>
                <div style={{display:style === 'overview' ? '' : 'none'}} className="overviewdiv ms-5 mt-5 me-5 mb-5">
                    <h4 className='ms-1'>About Me</h4>
                    <hr />
                    <p className='aboutMepara'>{location.state.doctor.aboutMe}
                    </p>
                    <h4 className='ms-1'>Education</h4>
                    <hr />
                    <p className='aboutMepara'>{location.state.doctor?.eduacation?.degree} <br />
                    {location.state.doctor?.eduacation?.collage} <br />
                    {location.state.doctor?.eduacation?.year} <br />

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
                <div style={{display:style === 'review' && userData ? '' : 'none'}} className="overviewdiv reviewDiv ms-5 mt-5 me-5 mb-5">
                    {
                        reviews?.map((review) => {
                            if(userData._id === review.userData[0]?._id) {
                                if(!reviewButton) {
                                    setReviewButton(true)
                                }
                            }
                            return(
                                <div className="card mb-5 p-3" style={userData._id.toString() === review.userData[0]?._id.toString() ? { backgroundColor: '#51DFA4', opacity: 0.5 } : {}}>
                                    <div className="review-image-div">
                                        <div className="review-image">
                                            <div>
                                                <img className='review-patient-image' src={review.userData?.[0]?.picture ? review.userData?.[0]?.picture : require('../../../../assets/img/patients/patient1.jpg')} alt="" />
                                            </div>
                                            <div className='ms-5'>
                                                <h4 className='reviewPatientName'>{review.userData?.[0]?.name}</h4>
                                                <p className='paragraph'>{review?.reviews?.date}</p>
                                            </div>
                                        </div>
                                        <div className="ratingstar">
                                            <AiFillStar className='star' style={review.reviews?.rating >= 1 ? { color: 'gold' } : { color: 'black' }}/>
                                            <AiFillStar className='star' style={review.reviews?.rating >= 2 ? { color: 'gold' } : { color: 'black' }} />
                                            <AiFillStar className='star' style={review.reviews?.rating >= 3 ? { color: 'gold' } : { color: 'black' }} />
                                            <AiFillStar className='star' style={review.reviews?.rating >= 4 ? { color: 'gold' } : { color: 'black' }} />
                                            <AiFillStar className='star' style={review.reviews?.rating >= 5 ? { color: 'gold' } : { color: 'black' }} />
                                        </div>
                                    </div>
                                    <div className="reviewPara ms-3">
                                        <p>{review?.reviews?.review}</p>
                                        <div className="ratingstar"></div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    

                      { reviewButton !== true ?
                        <button className='ms-auto btn add-review' onClick={() => {
                        setReviewModel({
                            status : true
                        })
                      }}>Add Review</button> : ''
                      }
                      <Review reviewStatus={reviewModel} 
                      showReviewStatus={setReviewModel} 
                      patientId={userData._id} 
                      doctorId={location.state.doctor._id} 
                      setReview={setReviews} review={reviews} 
                      userData={userData}
                      setReviewButton={setReviewButton}
                      type={'user'}
                      />
                </div>
            </div>
        </div>
    </>
  )
}

export default Profile
