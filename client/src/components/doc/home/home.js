import React, { useEffect, useState } from 'react'
import './home.css'
import  Sidebar from '../home/sidebar/sidebar'
import Nav from '../Navbar/Navbar'
import SideNav from '../home/sideNav/nav'
import { useDispatch, useSelector } from 'react-redux'
import { appointments, changeStatus, doctorData, doctorLogoutAction, doctor_add_time, doctor_change_password, doctor_delete_time, doctor_patients, doctor_profile_edit, total_patients_count } from '../../../redux/actions/doctor'
import swal from 'sweetalert';
import { Suspense } from 'react'
import Loading2 from '../../loading/Loading2'
import { toast , ToastContainer} from 'react-toastify'
import { userSpecialities, user_find_reviews } from '../../../redux/actions/user'
import { doctorProfileValidation } from '../../../helpers/validation'
const Dashboard = React.lazy(() => import('./Dashboard/dahsboard'));
const Patients = React.lazy(() => import('./Patients/Patients'))
const Schedule = React.lazy(() => import('./TimeShedule/Schedule')) 
const Review = React.lazy(() => import('./review/Review')) 
const Profile = React.lazy(() => import('./profile/Profile'))
const ChangePassword = React.lazy(() => import('./changePassword/ChangePassword'))
const Chat = React.lazy(() => import('./chat/chat'))


function Home() {
  const docNav = true
  const [option, setOption] = useState('Dashboard')
  const [filter ,setFilter ] =  useState({
    page : 1 , 
    perPage : 10 ,
    count : 20  ,
    appointmentStatus : undefined ,
    payment : undefined ,
    search : ''
  })
  const [loadMore , setLoadMore ] = useState({
    perPage : 9 ,
    search : '' , 
    from : undefined ,
    to : undefined
  })
  const [appointmentData ,setAppointmentData] = useState([])
  const dispatch = useDispatch()
  const doctor = useSelector((state) => state.doctorLogin.data)
  const logout = () => {
    dispatch(doctorLogoutAction())
    localStorage.removeItem('doctorInfo')
  }
  const [header , setHeader] = useState(option)
  const [open , setOpen ] = useState(true)
  const [showButton , setShowButton] = useState(false)
  useEffect(() => {
    if(header !== option) {
      setHeader(option)
    }
  } , [header, option])


const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    if(parseInt(windowWidth) <= 678) {
      setOpen(false)
      setShowButton(true)
    } else {
      setShowButton(false)
      setOpen(undefined)
    }
    return () => {
      window.removeEventListener('resize', handleResize);
    };
    
  }, [windowWidth]); // Empty 
 
  const openHandler = () => {
    setOpen(!open)
  }

  // option changings

  useEffect(() => {
    if(option === 'Dashboard') {
      dispatch(total_patients_count(doctor._id))
      dispatch(appointments(doctor._id , filter ))
      dispatch(doctor_patients(doctor._id ,loadMore.perPage ))
      dispatch(doctorData(doctor._id))
      dispatch(user_find_reviews(doctor._id))
      dispatch(userSpecialities())
    }
  } , [ ])
  const dataCount = useSelector((state) => state.totalCountofuser.data)
  const appointment = useSelector((state) => state.appointments)
  const patients = useSelector((state) => state.totalPatients)
  const doctorDatas = useSelector((state) => state.doctorDataReduecer)
  const reviewData = useSelector((state) => state.userfindReviews.doctor?.data)
  const speciality = useSelector((state) => state.userSpecialities.speciality)
  const changePasswordErr = useSelector((state) => state.doctorChangePasswodReducer)
  const profileUpdateMessage = useSelector((state) => state.PROFILEUPDATE)
  // dash board

  useEffect(() => {
    appointment?.count && setFilter({
      ...filter ,
      count : appointment?.count
    })
    appointment?.data && setAppointmentData(
      appointment?.data?.data
    )
  } , [ appointment?.count , appointment?.data])
  

  useEffect(() => {
    dispatch(appointments(doctor._id, filter))
  } , [ filter.page , filter.perPage , filter.appointmentStatus ,filter.payment , filter.search])

  const changeAppStatus = (status , bookingId) => {
    swal({
      title: "Are you sure?",
      text: "do you want to change the status!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          dispatch(changeStatus(status, bookingId, doctor._id, filter))
          dispatch(doctor_patients(doctor._id ,loadMore.perPage , loadMore.search , loadMore.from , loadMore.to))
          swal("Poof! Status is changed!", {
            icon: "success",
          });
        } else {
          swal("Status didn't change!");
        }
      });
    
  }

  // patients

  useEffect(() => {
    dispatch(doctor_patients(doctor._id ,loadMore.perPage , loadMore.search , loadMore.from , loadMore.to))
  } , [loadMore.perPage, loadMore.search, loadMore.from, loadMore.to, dispatch, doctor._id])

  // time schedule

  const [addTimeState , setAddTime ] = useState(false)
  const [timeShedule , setTimeSchedule ] = useState({
    day : 'Monday',
    duration : '30min'
  })
  const [doctorTimeShedule , setDoctorTimeShedule ] = useState()
  const durations = [ 
    {value : '30min' , label : '30min'} ,
    {value : '60min' , label : '60min'} ,
    {value : '90min' , label : '90min'} ,
    {value : '120min' , label : '120min'} ,
  ]
  useEffect(() => {
    if(doctorDatas) {
      setDoctorTimeShedule(doctorDatas)
    }
  } , [ doctorDatas ])

  useEffect(() => {
    dispatch(doctorData(doctor._id))
  } , [addTimeState, dispatch, doctor._id])
  const addTime = (data) => {
    data.doctorID = doctor._id
    dispatch(doctor_add_time(data))
    setAddTime({
      starting : '' ,
      ending : ''
    })
  }

  const deleteTime = (timeId) => {
    dispatch(doctor_delete_time(doctor._id , timeId)) 
  }

  // reviews

  const [reviewModel ,setReviewModel] = useState({status : false})
  const [review , setReview ] = useState()

  useEffect(() => {
    if(reviewData) {
      setReview(reviewData)
    }
  } , [ reviewData ])
  

  // profile edit
  const [specialityState , setSpecialityState ] = useState()
  const [temporaryPicture , setTemporaryPicture ] = useState()
  const [profileEditData , setProfileEditData] = useState()
  const [error , setError] = useState()

  const [gender ,] = useState([
    {value : 'male' , label :'Male'} ,
    {value : 'female' , label:'Female'} ,
    {value:'other' , label : 'Other'}
  ])
  const [consultingFeeStatus , setConsultingFeeStatus] = useState({
    free : false , 
    consulting : false
  })
  useEffect(() => {
    if(speciality) {
      for(let i=0;i<speciality.length;i++) {
        speciality[i].label = speciality[i].speciality
        speciality[i].value = speciality[i].speciality
      }
      setSpecialityState(speciality)
    }
    if(doctorDatas?.data) {
      doctorDatas.data.gender = {
         label : doctorDatas.data.gender ,
         value : doctorDatas.data.gender
      }
      doctorDatas.data.speciality = {
        label : doctorDatas.data.speciality ,
        value : doctorDatas.data.speciality
      }
      setProfileEditData(doctorDatas.data)
      if(doctorDatas.data.consultingFee > 0) {
        setConsultingFeeStatus({
        free : false ,
        consulting : true
      })
      } else {
        setConsultingFeeStatus({
          ...consultingFeeStatus ,
          free : true ,
          consulting : false
        })
      }
    }
  } , [speciality, doctorDatas])

  function profile_edit () {
   const formData = new FormData();
    if( !profileEditData.doctorName || !profileEditData.email || !profileEditData.phone || !profileEditData.gender.value || !profileEditData.speciality.value ||
        !profileEditData.consultingFee) {
          doctorProfileValidation(profileEditData , 'profile' , setError)
    } else {
    formData.append('image', profileEditData.picture);
    formData.append('doctorName' , profileEditData.doctorName)
    formData.append('speciality' , profileEditData.speciality.value)
    formData.append('specialityId' , profileEditData.specialityId)
    formData.append('email' , profileEditData.email)
    formData.append('gender' , profileEditData.gender.value)
    formData.append('phone' , profileEditData.phone)
    formData.append('dob' , profileEditData.dob)
    formData.append('consultingFee' , profileEditData.consultingFee)
    formData.append('aboutMe' , profileEditData.aboutMe)
    formData.append('degree' , profileEditData.education?.degree)
    formData.append('collage' , profileEditData.education?.collage)
    formData.append('year' , profileEditData.education?.year)
    formData.append('doctorId' , doctor._id)
    dispatch(doctor_profile_edit(formData))
    }
  }
  useEffect(() => {
    if(profileUpdateMessage?.data) {
      toast.success('Profile updated succesfully')
      profileUpdateMessage.data = null
    }
  } , profileUpdateMessage?.data)

  // change password

  const [changePasswordSState , setChangepassword ] = useState()
  const handleChangePassword = () => {
    if(!changePasswordSState?.oldPassword || !changePasswordSState?.newPassword || !changePasswordSState?.reEnterPassword || changePasswordSState?.reEnterPassword !== changePasswordSState?.newPassword) {
       doctorProfileValidation(changePasswordSState , 'password' , setError)
    } else {
      dispatch(doctor_change_password(doctor._id , changePasswordSState.oldPassword , changePasswordSState.newPassword))
      setChangepassword({
        oldPassword : '' ,
        newPassword : '' ,
        reEnterPassword : ''
      })
    }
  }

  return (
    <div className='doc-home '>
    <ToastContainer />
      <Nav docNav={docNav}/>
      <SideNav 
        header={header}
        openHandler={openHandler}
        showButton={showButton}
        setOption={setOption}
      />
      <div className="doc-main-home">
        { 
          option !== 'Message' && <Sidebar
          option={ option }  
          setOption={ setOption } 
          logout={ logout } 
          doctor = { doctorDatas?.data }
          open={open}
          setOpen={setOpen}
        />
        }
        {
          option === 'Dashboard' && <Suspense fallback={<Loading2 />}>
            <Dashboard 
              open={open}
              filter={filter} 
              setFilter={setFilter} 
              appointments={appointmentData} 
              count={ dataCount }
              changeStatus={changeAppStatus}
              loading = {appointment.loading}
          />
          </Suspense>
        }
        {
          option === 'My Patients' && <Suspense fallback={<Loading2 />}>
          <Patients
            open={open}
            patients = {patients?.data}
            setLoadMore = { setLoadMore }
            loadMore = { loadMore }
            loading = {patients.loading}
          />
          </Suspense>
        }
        {
          option === 'Schedule Time' && <Suspense fallback={<Loading2 />}>
          <Schedule 
            open={open}          
            durations={durations}
            times = {doctorTimeShedule} 
            timeShedule = { timeShedule }
            setTimeSchedule = { setTimeSchedule }
            addTime={ addTime }
            deleteTime = {deleteTime}
            setAddTime={setAddTime}
            addtimeState={addTimeState}
          />
          </Suspense>
        }
        {
          option === 'Message' && <Suspense fallback={<Loading2 />}>
          <Chat 
            open={open}
            setOption={setOption}
            doctor={doctor}
          />
          </Suspense>
        }
        {
          option === 'Reviews' && <Suspense fallback={<Loading2 />}>
          <Review 
            open={open}          
            reviewModel={reviewModel}
            setReviewModel={setReviewModel}
            review={review}
            setReview={setReview}
          />
          </Suspense>
        }
        {
          option === 'Profile Edit' && <Suspense fallback={<Loading2 />}>
          <Profile 
            open={open}
            reviewModel={reviewModel}
            setReviewModel={setReviewModel}
            speciality={specialityState}
            gender={gender}
            consultingFeeStatus={consultingFeeStatus}
            setConsultingFeeStatus={setConsultingFeeStatus}
            doctor={doctorDatas}
            profileEditData={profileEditData}
            setProfileEditData={setProfileEditData}
            temporaryPicture={temporaryPicture}
            setTemporaryPicture={setTemporaryPicture}
            profile_edit={profile_edit}
            error={error}
            setError={setError}
          />
          </Suspense>
        }

          {
          option === 'Change Password' && <Suspense fallback={<Loading2 />}>
          <ChangePassword 
            open={open}
            changePassword={changePasswordErr}
            changePasswordSState={changePasswordSState}
            setChangepassword={setChangepassword}
            handleChangePassword={handleChangePassword}
            error={error}
            setError={setError}
          />
          </Suspense>
        }
      </div>
    </div>
  )
}

export default Home
