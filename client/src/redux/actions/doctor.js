import axios from "axios"
import { doctorActions } from "../constants/doctor"
import { userActions } from "../constants/user"

export const docLogin = ({email , password}) => async (dispatch) => {
    dispatch({type : doctorActions.DOCTORLOGINREQUEST})
    const config = {
        headers : {
            "Content-type": "application/json",
        }
    }
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/doctor/` , 
    {email , password} , 
    config).then((data) => {
        dispatch({type : doctorActions.DOCTORLOGIN , payLoad : data.data});
        localStorage.setItem('doctorInfo' , JSON.stringify(data.data));
    }).catch((err) => {
        console.log(err);
        dispatch({type : doctorActions.DOCTORLOGINFAILED , payLoad : err.response.data})
    })
}

export const doctorData = (doctorId) => async (dispatch) => {
    dispatch({type : doctorActions.DOCTORDATAREQUEST})
   const token = JSON.parse(localStorage.getItem('doctorInfo'))
    const config = {
        headers : {
              Authorization: "Bearer " + token.token,
              'content-type' : 'application/json'
        }
    }
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/doctor/doctorData` , 
    { doctorId } , 
    config).then((data) => {
        dispatch({type : doctorActions.DOCTORDATA , payLoad : data.data});
    }).catch((err) => {
        dispatch({type : doctorActions.DOCTORDATAFAILED , payLoad : err.response.data})
    })
    
}

export const doctorLogoutAction = () =>async(dispatch) => {
    localStorage.removeItem("doctorInfo")
    dispatch({type : doctorActions.DOCTORLOGOUT })
}

export const total_patients_count = ( doctorId ) => async (dispatch) => {
    dispatch({type : doctorActions.TOTALCOUNTOFUSERSREQUEST})
    const token = JSON.parse(localStorage.getItem('doctorInfo'))
    const config = {
        headers : {
              Authorization: "Bearer " + token.token,
              'content-type' : 'application/json'
        }
    }
    const count = {
        totalPatients : 0 ,
        todaysPatients : 0 ,
        appointmets : 0
    }
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/doctor/total-patients-count` , { doctorId } , config).then(async(data) => {
        count.totalPatients = await data.data
        dispatch({type : doctorActions.TOTALCOUNTOFUSERS , payLoad : count})
    }).catch((err) => {
        dispatch({type : doctorActions.TOTALCOUNTOFUSERSFAILED , payLoad : err.response.data})
    })
     axios.post(`${process.env.REACT_APP_BACKEND_URL}/doctor/total-acceptped-patients-count` , { doctorId } , config).then(async(data) => {
       count.todaysPatients =await data.data
       dispatch({type : doctorActions.TOTALCOUNTOFUSERS , payLoad : count})
    }).catch((err) => {
        dispatch({type : doctorActions.TOTALCOUNTOFUSERSFAILED , payLoad : err.response.data})
    })
     axios.post(`${process.env.REACT_APP_BACKEND_URL}/doctor/total-no-appointments-count` , { doctorId } , config).then(async(data) => {
        count.appointmets =await data.data
        dispatch({type : doctorActions.TOTALCOUNTOFUSERS , payLoad : count})
    }).catch((err) => {
        dispatch({type : doctorActions.TOTALCOUNTOFUSERSFAILED , payLoad : err.response.data})
    })}

export const appointments = (doctorId ,{ page  , perPage  , appointmentStatus , payment , search}) => async (dispatch) => {
    console.log(appointmentStatus);
    dispatch({type : doctorActions.APPOINTMENTSREQUEST})
    const token = JSON.parse(localStorage.getItem('doctorInfo'))
    const config = {
        headers : {
            Authorization: "Bearer " + token.token,
            'content-type' : 'application/json'
        }
    }
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/doctor/total-appoitments` , 
        { doctorId , page , perPage , appointmentStatus , payment , search} , config)
        .then((data) => {
            dispatch({type : doctorActions.APPOINTMENTS , payLoad : data.data})
    }).catch((err) => {
        dispatch({type : doctorActions.APPOINTMENTSFAILED , payLoad : err.response.data})
    })
}

export const todaysAppointments = (doctorId ,{ page  , perPage  , appointmentStatus , payment , search}) => async (dispatch) => {
    console.log(appointmentStatus);
    dispatch({type : doctorActions.APPOINTMENTSREQUEST})
    const token = JSON.parse(localStorage.getItem('doctorInfo'))
    const config = {
        headers : {
            Authorization: "Bearer " + token.token,
            'content-type' : 'application/json'
        }
    }
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/doctor/todays-appointment` , 
        { doctorId , page , perPage , appointmentStatus , payment , search} , config)
        .then((data) => {
            dispatch({type : doctorActions.APPOINTMENTS , payLoad : data.data})
    }).catch((err) => {
        dispatch({type : doctorActions.APPOINTMENTSFAILED , payLoad : err.response.data})
    })
}

export const changeStatus = (status ,  bookingId , doctorId , { page  , perPage  , appointmentStatus , payment}) => async (dispatch) => {
    dispatch({type : doctorActions.CHANGESTATUSREQUEST})
    const token = JSON.parse(localStorage.getItem('doctorInfo'))
    const config = {
        headers : {
            Authorization: "Bearer " + token.token,
            'content-type' : 'application/json'
        }
    }
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/doctor/change-appointments-status` , 
        { doctorId , page , perPage , appointmentStatus , payment , status , bookingId} , config)
        .then((data) => {
            dispatch({type : doctorActions.APPOINTMENTS , payLoad : data.data})
    }).catch((err) => {
        dispatch({type : doctorActions.APPOINTMENTSFAILED , payLoad : err.response.data})
    })
}

export const doctor_patients = (doctorId , perPage , search = '' , from , to) => async (dispatch) => {
    dispatch({type : doctorActions.TOTALPATIENTSREQUEST})
    const token = JSON.parse(localStorage.getItem('doctorInfo'))
    const config = {
        headers : {
            Authorization: "Bearer " + token.token,
            'content-type' : 'application/json'
        }
    }
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/doctor/total-patients` , 
    { doctorId , perPage , search , from , to} ,
    config).then((data) => {
        dispatch({type : doctorActions.TOTALPATIENTS , payLoad : data.data})
    }).catch((err) => {
        dispatch({type : doctorActions.TOTALPATIENTS , payLoad : err.response.data})
    })
}

export const doctor_add_time = (data) => async (dispatch) => {
    dispatch({type : doctorActions.DOCTORADDTIMEREQUEST})
    const token = JSON.parse(localStorage.getItem('doctorInfo'))
    const config = {
        headers : {
            Authorization: "Bearer " + token.token,
            'content-type' : 'application/json'
        }
    }
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/doctor/time-schedule` , 
    { data } ,
    config).then((data) => {
        dispatch({type : doctorActions.DOCTORDATA , payLoad : data.data})
    }).catch((err) => {
        dispatch({type : doctorActions.DOCTORADDTIMEFAILED , payLoad : err.response.data})
    })
}

export const doctor_delete_time = (doctorId , timeId) => async (dispatch) => {
    dispatch({type : doctorActions.DOCTORADDTIMEREQUEST})
    const token = JSON.parse(localStorage.getItem('doctorInfo'))
    const config = {
        headers : {
            Authorization: "Bearer " + token.token,
            'content-type' : 'application/json'
        }
    }
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/doctor/time-schedule-delete` , 
    { doctorId , timeId } ,
    config).then((data) => {
        dispatch({type : doctorActions.DOCTORDATA , payLoad : data.data})
    }).catch((err) => {
        dispatch({type : doctorActions.DOCTORADDTIMEFAILED , payLoad : err.response.data})
    })
}

export const replay_user_review = (doctorId ,patientId , replay ,replayDate) => async(dispatch) => {
    dispatch({type : doctorActions.DOCTORREVIEWREPLAYREQUESTED})
    const token = JSON.parse(localStorage.getItem('doctorInfo'))
    const config = {
        headers : {
            Authorization: "Bearer " + token.token,
            'content-type' : 'application/json'
        }
    }
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/doctor/reply-to-review` , 
    { doctorId , patientId , replay ,replayDate } ,
    config).then((data) => {
        dispatch({type : userActions.FINDALLREVIEW , payLoad : data.data})
    }).catch((err) => {
        console.log(err);
        dispatch({type : doctorActions.DOCTORREVIEWREPLAYFAILED , payLoad : err.response.data})
    })
}

export const doctor_profile_edit = (data) => async (dispatch) => {
    dispatch({type : doctorActions.DOCTOREDITREQUESTED})
    const token = JSON.parse(localStorage.getItem('doctorInfo'))
      const config = {
        headers : {
            Authorization: "Bearer " + token.token,
            'Content-Type': 'multipart/form-data'
        } ,
    }
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/doctor/doctor-profile-edit` , data , config ).then((data) => {
        dispatch({type : doctorActions.DOCTORDATA , payLoad : data.data})
        dispatch({type : doctorActions.DOCTORPROFILEUPDATE , payLoad : data.data})
    }).catch((err) => {
        console.log(err);
        dispatch({type : doctorActions.DOCTOREDITFAILED , err : err.response.data})
    })
}

export const doctor_change_password = (doctorId , oldPassword , newPassword) => async (dispatch) => {
    const token = JSON.parse(localStorage.getItem('doctorInfo'))
      const config = {
        headers : {
            Authorization: "Bearer " + token.token,
            'content-type' : 'application/json'
        } ,
    }
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/doctor/change-password`,{ doctorId , oldPassword , newPassword} , config).then((data) => {
        dispatch({type : doctorActions.DOCTORCHANGEPASSWORD, payLoad : data.data})
    }).catch((err) => {
        dispatch({type : doctorActions.DOCTORCHANGEPASSWORDFAILED, payLoad : err.response.data})
    })
}