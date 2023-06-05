import React, { useEffect, useState ,useRef} from 'react'
import '../doctor_search.css'
import Button from 'react-bootstrap/Button';
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { userDoctors, userSpecialities, user_filter_doctor } from '../../../../redux/actions/user';
import { AiFillStar } from 'react-icons/ai';
import  Pagination  from '../../../Pagination/Pagination';


function Doctor_body() {
	const navigate = useNavigate('')
	const doctorData = useSelector((state) => state.userDoctor.doctor)
	const [doctor , setDoctor] = useState([])
	const specialities = useSelector((state) => state.userSpecialities.speciality)
	const male = useRef()
	const female = useRef()
	const others = useRef()
	const viewProfile = (doctor) => {
		navigate('/doctor-profile' , {state : {doctor}})
	}
	const bookNow = (doctor) => {
		navigate('/doctor-appointment-shedule' , {state : {doctor}} )
	}
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(userDoctors())
		dispatch(userSpecialities())
	},[ ])
	useEffect(() => {
		if(doctorData?.data?.data) {
			setDoctor(doctorData?.data?.data)
			setFilter({
				...filter ,
				count : doctorData?.data?.count
			})
		}
	} , [ doctorData?.data?.data ])
	const gender = {}
	const specialityMap = {}
	const [filter , setFilter] = useState({
		page : 1 ,
		perPage : 10 ,
		gender ,
		specialityMap ,
		count : doctorData?.data?.count
	})
	const get_filtered_data = () => {
		if(male.current.checked) {
			gender["male"] = "male"
		} else {
			delete gender["male"]
		}
		if(female.current.checked) {
			gender["female"] = "female"
		} else {
			delete gender["female"]
		}
		if(others.current.checked) {
			gender["others"] = "others"
		} else {
			delete gender["others"]
		}
		specialities.map ((data) => {
			if(document.getElementById(data._id).checked) {
				specialityMap[document.getElementById(data._id).value] = document.getElementById(data._id).value
			} else {
				delete specialityMap[document.getElementById(data._id).value]
			}
			
		})
		setFilter({
			...filter ,
			gender : gender ,
			specialityMap : specialityMap
		})
		dispatch(user_filter_doctor(gender , specialityMap))
	}

	useEffect(() => {
		dispatch(user_filter_doctor(filter.gender , filter.specialityMap , filter.page , filter.perPage))
	} , [dispatch, filter.page, filter.perPage])


  return (
   <>
     <div className="serch-doctor-and-book ">
			<div className="search-doctor ms-4 mb-5 shadow rounded">
				{/* <!-- Search Filter --> */}

								<div className="card-header search-filter  mt-4 mb-2">
									<h4 className="card-title  mb-0 ms-5">Search Filter</h4>
									<hr style={{border:'1px solid '}}/>
								</div>
								
								<div className="card-body-search ms-5  mb-2">
									{/* <div className="filter-widget">
										{/* <div className="cal-icon">
											<input type="text" className="form-control datetimepicker" placeholder="Select Date"/>
										</div>			 
									</div> */}
								<div className="filter-widget">
									<h4>Gender</h4>
									<div>
										<label className="custom_check">
											<input ref={male} type="checkbox" name="gender_type" />
											<span className="checkmark"></span> Male Doctor
										</label>
									</div>
									<div>
										<label className="custom_check">
											<input ref={female} type="checkbox" name="gender_type" />
											<span className="checkmark"></span> Female Doctor
										</label>
									</div>
									<div>
										<label className="custom_check">
											<input ref={others} type="checkbox" name="gender_type" />
											<span className="checkmark"></span> Others
										</label>
									</div>
								</div>
								<div className="filter-widget">
									<h4>Select Specialist</h4>
									{
										specialities ? 
										specialities.map((data) => {
											 
										return (
											<div>
											<label className="custom_check">
												<input id={data._id} value={data.speciality} type="checkbox" name="select_specialist" />
												<span className="checkmark"></span> <label >{data.speciality}</label>
											</label>
										</div>
										)
										})
										 : 
										 <p>Need to Add speciality</p>
									}
									
									<div className="btn-search mt-4">
										<div className="d-grid gap-2">
												<Button size='' className="search-doctor-button  " type="submit" onClick={() => {
													get_filtered_data()
												}}>Search</Button>
										</div>
									</div>	
								</div>
									
								</div>
							{/* <!-- /Search Filter --> */}
							
			</div>
			<div className="doctor-details-in-right-side ">
			{
				doctor ?
				doctor.map((data) => {
					return(
						<div className="doctor-details-images-speciality ms-5 mt-5 mb-5 me-4 shadow rounded">
				<div className="left-part">
					<div className="img-and-details">
						<img src={data.picture !== undefined ? `${process.env.REACT_APP_BACKEND_URL}/${data.picture}` : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'} className="ms-3 mt-3" alt="" />
						<div className='ms-3 mt-3'>
							<p className="doctor-name">
								Dr. {data.doctorName}
							</p>
							<p className="education">
								{/* {
									data.education !==0 ? data.education : "Not given"
								} */}
							</p>
							<div className='speciality-image mt-3'>
								<img src={data?.specialityImage ? data.specialityImage : require('../../../assets/img/specialities/specialities-01.png')} alt="" />
								<p className="speciality_name ms-2">
									{data.speciality}
								</p>
							</div>
							<div className=''>
                                <AiFillStar className='star me-auto' style={data.rating >= 1 ?{color:'gold'} : {color : 'black'}} />
                                <AiFillStar className='star' style={data.rating >= 2 ?{color:'gold'} : {color : 'black'}}/>
                                <AiFillStar className='star' style={data.rating >= 3 ?{color:'gold'} : {color : 'black'}}/>
                                <AiFillStar className='star' style={data.rating >= 4 ?{color:'gold'} : {color : 'black'}}/>
                                <AiFillStar className='star' style={data.rating >= 5 ?{color:'gold'} : {color : 'black'}}/>
                            </div>
							<div className='location-of-doctor mt-2'>
								<i class="fa-solid fa-location-dot mt-1"></i>
								<p className='ms-2'>Florida, USA</p>
							</div>
							<div className="speciality-hos-image mb-4">
								<img src={require('../../../assets/img/features/feature-01.jpg')} className='me-2' alt="speciality" />
								<img src={require('../../../assets/img/features/feature-01.jpg')} className='me-2' alt="" />
								<img src={require('../../../assets/img/features/feature-01.jpg')} className='me-2' alt="" />
								<img src={require('../../../assets/img/features/feature-01.jpg')} className='me-2' alt="" />
							</div>
						</div>
					</div>
				</div>
				<div className="righ-part">
					<div className='like-comment-loca'>
						<div className='ms-3 mt-3 '>
						<p><i class="fa-regular fa-thumbs-up mt-1"></i>
						<p className='ms-4'>98%</p></p>
						<p><i class="fa-regular fa-comment mt-1"></i>
						<p className='ms-4'>17 comments</p></p>
						<p>	<i class="fa-solid fa-location-dot mt-1"></i>
						<p className='ms-4'>Florida, USA</p></p>
					</div>
					</div>
					<div className="button-view-profiel mt-4 me-5">
						<Button className='viewbutton' onClick={() => {
							viewProfile(data)
						}}>view profile</Button>
						<Button className='mt-3 mb-3' onClick={() => {
							bookNow(data)
						}}>Book now</Button>
					</div>
				</div>
			</div>
					)
				})
				 : 
				 ''
			}
			<Pagination setFilter={setFilter}  filter={filter} />
			</div>

			
			
	 </div>
   </>
  )
}

export default Doctor_body
