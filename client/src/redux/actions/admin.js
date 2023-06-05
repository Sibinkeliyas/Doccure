import axios from "axios"
import { adminAction } from "../constants/admin"

export const adminLogin = (adminData) => async(dispatch) => {
    dispatch({type : adminAction.ADMINLOINGERQUEST})
    const config = {
        headers : {
            'content-type' : 'application/json'
        }
    }
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin/admin-login` , {adminData} , config).then((data) => {
        localStorage.setItem('adminInfo' , JSON.stringify(data.data))
        dispatch({type : adminAction.ADMINLOGIN , payLoad : data.data})
    }).catch((err) => {
        dispatch({type : adminAction.ADMINLOGINFAILED , payLoad : err.response.data})
    })
}

export const adminRegister = (adminData) => async(dispatch) => {
    dispatch({type : adminAction.ADMINREGISTERREQUEST})
    const config = {
        headers : {
            'content-type' : 'application/json'
        }
    }
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin/` , {adminData} , config).then((data) => {
        dispatch({type : adminAction.ADMINREGISTER , payLoad : data.data})
    }).catch((err) => {
        dispatch({type : adminAction.ADMINERGISTERFAILED , payLoad : err.response.data})
    })
}

export const adminFindUsers = ({search = '' , page = 1 , perPage = 1}) => async (dispatch) => {
    dispatch({type : adminAction.FINDUSERSERQUESTED})
    const token = JSON.parse(localStorage.getItem('adminInfo'))
    const config = {
        headers : {
            Authorization: "Bearer " + token.token,
            'content-type' : 'application/json'
        }
    }
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin/find-all-users/`, {search , perPage , page} ,
         config)
        .then((data) => {
            dispatch({type : adminAction.FINDUSERS , payLoad : data.data})
    }).catch((err) => {
        console.log(err);
        dispatch({type : adminAction.FINDUSERSFAILED , payLoad : err.response.data})
    })
}

export const adminFindDoctors = ({search , page , perPage , gender , specialities}) => async(dispatch) => {
    dispatch({type : adminAction.FINDDOCTORSREQUESTED})
    const token = JSON.parse(localStorage.getItem('adminInfo'))
      const config = {
        headers : {
            Authorization: "Bearer " + token.token,
            "content-type": "application/json",
        } ,
    }
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin/admin-find-doctors`, 
    { search , page , perPage , gender , specialities }  , config).then((data) => {
        dispatch({type : adminAction.FINDDOCTORS , payLoad : data.data})
    }).catch((err) => {
        console.log(err);
        dispatch({type : adminAction.FINDDOCTORSFAILED , payLoad : err.response.data})
    })
}

export const adminBlockUser = (userId , status) => async(dispatch) => {
    dispatch({type : adminAction.BLOCKUSERREQUEST})
    const token = JSON.parse(localStorage.getItem('adminInfo'))
      const config = {
        headers : {
            Authorization: "Bearer " + token.token,
            "content-type": "application/json",
        } ,
    }
    axios.patch(`${process.env.REACT_APP_BACKEND_URL}/admin/admin-block-user`, {userId , status}  , config).then((data) => {
        dispatch({type : adminAction.BLOCKUSERS , payLoad : data.data})
    }).catch((err) => {
        dispatch({type : adminAction.BLOCKUSERFAILED , payLoad : err.response.data})
    })
}

export const adminBlockDoctor = (doctorId , status) => async(dispatch) => {
    dispatch({type : adminAction.BLOCKDOCTORREQUEST})
    const token = JSON.parse(localStorage.getItem('adminInfo'))
      const config = {
        headers : {
            Authorization: "Bearer " + token.token,
            "content-type": "application/json",
        } ,
    }
    axios.patch(`${process.env.REACT_APP_BACKEND_URL}/admin/admin-block-doctor` , {doctorId , status}  , config).then((data) => {
        dispatch({type : adminAction.BLOCKDOCTOR , payLoad : data.data})
    }).catch((err) => {
        dispatch({type : adminAction.BLOCKDOCTORFAILED , payLoad : err.response.data})
    })
}

export const adminFindSpecialities = () => async(dispatch) => {
    dispatch({type : adminAction.FINDSPECIALITYREQUESTED})
      const config = {
        headers : {
            "content-type": "application/json",
        } ,
    }
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/admin/admin-speciality`  , config).then((data) => {
        dispatch({type : adminAction.FINDSPECIALITY , payLoad : data.data})
    }).catch((err) => {
        dispatch({type : adminAction.FINDSPECIALITYFAILED , payLoad : err.response.data})
    })
}

export const adminFindSpeciality = ({search , page , perPage}) => async(dispatch) => {
    dispatch({type : adminAction.FINDSPECIALITYREQUESTED})
      const config = {
        headers : {
            "content-type": "application/json",
        } ,
    }
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin/admin-all-speciality` , {search , perPage , page}  , config).then((data) => {
        dispatch({type : adminAction.FINDSPECIALITY , payLoad : data.data})
    }).catch((err) => {
        dispatch({type : adminAction.FINDSPECIALITYFAILED , payLoad : err.response.data})
    })
}

export const adminFindReports = ({page , perPage , doctorSearch , userSearch , appointmentStatus , payment}) => async(dispatch) => {
    dispatch({type : adminAction.FINDREPORTSREQUESTED})
    const token = JSON.parse(localStorage.getItem('adminInfo'))
       const config = {
        headers : {
            Authorization: "Bearer " + token.token,
            "content-type": "application/json",
        } ,
    }
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin/find-report` , 
    {page , perPage , doctorSearch , userSearch , appointmentStatus , payment} 
     , config).then((data) => {
        console.log(data.data);
        dispatch({type : adminAction.FINDREPORTS , payLoad : data.data})
    }).catch((err) => {
        dispatch({type : adminAction.FINDDOCTORSFAILED , payLoad : err.response.data})
    })
}

export const adminFindReport = (orderId) => async(dispatch) => {
    dispatch({type : adminAction.FINDORDERREQUEST})
    const token = JSON.parse(localStorage.getItem('adminInfo'))
       const config = {
        headers : {
            Authorization: "Bearer " + token.token,
            "content-type": "application/json",
        } ,
    }
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/admin/find-appointment?id=${orderId}`
     , config).then((data) => {
        console.log(data.data);
        dispatch({type : adminAction.FINDORDER , payLoad : data.data})
    }).catch((err) => {
        dispatch({type : adminAction.FINDORDERFAILED , payLoad : err.response.data})
    })
}

export const adminFindAppointments = ({page , perPage , appointmentStatus , payment , doctorSearch , userSearch}) => async(dispatch) => {
    dispatch({type : adminAction.FINDALLAPPOINTMENTSERQUESTED})
    const token = JSON.parse(localStorage.getItem('adminInfo'))
       const config = {
        headers : {
            Authorization: "Bearer " + token.token,
            "content-type": "application/json",
        } ,
    }
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin/all-appointments` ,
    {page , perPage , appointmentStatus , payment , doctorSearch , userSearch}
     , config).then((data) => {
        dispatch({type : adminAction.FINDALLAPPOINTMENTS , payLoad : data.data})
    }).catch((err) => {
        console.log(err);
        dispatch({type : adminAction.FINDALLAPPOINTMENTSFAILED , payLoad : err.response.data})
    })
}

export const adminDeleteDoctors = (id , filter) => async(dispatch) => {
    dispatch({type : adminAction.DELETEDOCTOR})
    const token = JSON.parse(localStorage.getItem('adminInfo'))
       const config = {
        headers : {
            Authorization: "Bearer " + token.token,
            "content-type": "application/json",
        } ,
    }
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin/admin-delete-doctors` ,{id , filter}
     , config).then((data) => {
        console.log(data);
        dispatch({type : adminAction.FINDDOCTORS , payLoad : data.data})
    }).catch((err) => {
        dispatch({type : adminAction.DELETEDOCTORFAILED , payLoad : err.response.data})
    })
}

export const adminAddDoctors = (doctorData , filter) => async(dispatch) => {
    dispatch({type : adminAction.ADDDOCTORREQUESTED})
    const token = JSON.parse(localStorage.getItem('adminInfo'))
       const config = {
        headers : {
            Authorization: "Bearer " + token.token,
            "content-type": "application/json",
        } ,
    }
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin/admin-add-doctors` , { doctorData , filter }  
     , config).then((data) => {
        dispatch({type : adminAction.FINDDOCTORS , payLoad : data.data?.doc})
        dispatch({type : adminAction.ADDDOCTORSUCCESS , payLoad : data.data?.data})
    }).catch((err) => {
        dispatch({type : adminAction.ADDDOCTORFAILED , payLoad : err.response.data})
    })
}

export const adminDeleteSpeciality = (specialityId , filter) => async(dispatch) => {
    dispatch({type : adminAction.DELETESPECIALITYREQUESTED})
    const token = JSON.parse(localStorage.getItem('adminInfo'))
       const config = {
        headers : {
            Authorization: "Bearer " + token.token,
            "content-type": "application/json",
        } ,
    }
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin/admin-delete-speciality` , { specialityId , filter }  
     , config).then((data) => {
        dispatch({type : adminAction.FINDSPECIALITY , payLoad : data.data?.spec})
    }).catch((err) => {
        console.log(err);
        dispatch({type : adminAction.DELETESPECIALITYFAILED , payLoad : err.response.data})
    })
}

export const adminAddSpeciality = (specialityData , filter) => async(dispatch) => {
    dispatch({type : adminAction.ADDSPECIALITYREQUESTED})
    const token = JSON.parse(localStorage.getItem('adminInfo'))
       const config = {
        headers : {
            Authorization: "Bearer " + token.token,
            "content-type": "application/json",
        } ,
    }
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin/admin-add-speciality` , { specialityData , filter }  
     , config).then((data) => {
        console.log(data.data?.data);
        dispatch({type : adminAction.FINDSPECIALITY , payLoad : data.data?.spec})
        dispatch({type : adminAction.ADDSPECIALITY , payLoad : data.data?.data})
    }).catch((err) => {
        console.log(err.response.data);
        dispatch({type : adminAction.ADDSPECIALITYFAILED , payLoad : err.response.data})
    })
}

export const adminEditSpeciality = (specialityData , specialityId , filter) => async(dispatch) => {
    dispatch({type : adminAction.ADMINEDITREQUESTED})
    const token = JSON.parse(localStorage.getItem('adminInfo'))
       const config = {
        headers : {
            Authorization: "Bearer " + token.token,
            "content-type": "application/json",
        } ,
    }
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin/admin-update-speciality` , { specialityData ,specialityId , filter }  
     , config).then((data) => {
        dispatch({type : adminAction.FINDSPECIALITY , payLoad : data.data?.spec})
        dispatch({type : adminAction.ADMINEDIT , payLoad : data.data?.data})
    }).catch((err) => {
        console.log(err);
        dispatch({type : adminAction.ADMINEDITFAILED , payLoad : err.response.data})
    })
}

export const adminDashboard = () => async(dispatch) => {
    dispatch({type : adminAction.ADMINDASHBOARDREQUEST})
    const token = JSON.parse(localStorage.getItem('adminInfo'))
       const config = {
        headers : {
            Authorization: "Bearer " + token.token,
            "content-type": "application/json",
        } ,
    }
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin/admin-dashboard` , {  }  
     , config).then((data) => {
        dispatch({type : adminAction.ADMINDASHBOARD , payLoad : data.data})
    }).catch((err) => {
        console.log(err);
        dispatch({type : adminAction.ADMINDASHBOARDFAILED , payLoad : err.response.data})
    })
}


export const adminLogout = () => async(dispatch) => {
    localStorage.removeItem('adminInfo')
    dispatch({type : adminAction.ADMINLOGOUT})
}