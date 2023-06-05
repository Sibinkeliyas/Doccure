import axios from 'axios'
import { userActions } from '../constants/user'
import { chatActions } from '../constants/chat';



export const userRegister = (name , email , password , phone) => async (dispatch) => {          // user register
    dispatch({type : userActions.REGISTERREQUEST});
    const config = {
        headers : {
            "Content-type": "application/json",
        }
    }
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/user_signUp`,
    {name , email , password , phone} ,
    config
    ).then((data) => {
        dispatch({type : userActions.REGISTERSUCCES ,payLoad : data })
    }).catch((err) => {
        dispatch({type : userActions.REGISTERFAILED ,payLoad : err.response.data })
    })
}

export const userLogin = (email , password) => async (dispatch) => {                            // user login
    dispatch({type : userActions.LOGINREQUEST});
    const config = {
        headers : {
            "Content-type": "application/json",
        }
    }
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/user_login`,
    {email , password},
    config
    ).then((data) => {
        dispatch({type : userActions.LOGINSUCCES , payLoad : data.data});
        localStorage.setItem('userInfo' , JSON.stringify(data.data));
    }).catch((err) => {
        dispatch({type : userActions.LOGINFAILED , payLoad : err.response.data})
    })
}

export const userdetails = (id) => async (dispatch) => {                            // user login
    dispatch({type : userActions.USERDATAREQUEST});
      let token = JSON.parse(localStorage.getItem('userInfo'))
    if(token !== undefined) {
        token = token.token
    }
    const config = {
        headers : {
            Authorization: "Bearer " + token,
            "content-type" : "application/json",
        }
    }
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/user`,
    { id },
    config
    ).then((data) => {
        dispatch({type : userActions.USERDATADETAILS , payLoad : data.data});
    }).catch((err) => {
        dispatch({type : userActions.USERDATAFAILED , payLoad : err.response.data})
    })
}


export const userGoogleLogin = (googleCodeResponce) => async (dispatch) => {                            // user login
    dispatch({type : userActions.LOGINREQUEST});
    const config = {
        headers : {
            "Content-type": "application/json",
        }
    }
    googleCodeResponce.id = googleCodeResponce.id + 'abf'
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/user_login`,
    {googleCodeResponce},
    config
    ).then((data) => {
        dispatch({type : userActions.LOGINSUCCES , payLoad : data.data});
        localStorage.setItem('userInfo' , JSON.stringify(data.data)); 
    }).catch((err) => {
        dispatch({type : userActions.LOGINFAILED , payLoad : err.response.data})
    })
}


export const user = (id) =>async (dispatch) => {
    dispatch({type : chatActions.USERREQUEST}) 
    const config = {
        headers : {
            "content-type" : "application/json",
        }
    }
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/user` ,{ id } , config).then((Data) => {
        localStorage.setItem("doctorsData" , Data.data)
        dispatch({type : chatActions.USER , payLoad : Data.data})
    }).catch((err) => {
        dispatch({type : chatActions.USERFAILED , payLoad : err.response.data})
    })

}


export const userDoctors = () =>async (dispatch) => {
    dispatch({type : userActions.DOCTORFINDREQUEST}) 
    const config = {
        headers : {
            "content-type" : "application/json",
        }
    }
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/user_Find_doctors` , config).then((Data) => {
        localStorage.setItem("doctorsData" , Data.data)
        dispatch({type : userActions.DOCTORFINDSUCCESS , payLoad : Data.data})
    }).catch((err) => {
        dispatch({type : userActions.DOCTORFINDREQUEST , payLoad : err.response.data})
    })

}


export const userSpecialities = () => async (dispatch) => {
    dispatch({type : userActions.SPECIALITYREQUEST}) 
    const config = {
        headers : {
            "content-type" : "application/json",
        }
    }
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/admin/admin-speciality` , config).then((Data) => {
        localStorage.setItem("specialities" , Data.data)
        dispatch({type : userActions.SPECIALITYSUCCESS , payLoad : Data.data})
    }).catch((err) => {
        dispatch({type : userActions.SPECIALITYFAILED , payLoad : err.response.data})
    })

}


export const user_filter_doctor = (gender , speciality , page = 1 , perPage = 10) => async (dispatch) => {
    dispatch({type:userActions.DOCTORFINDREQUEST})
    const config = {
        headers : {
            "content-type" : "application/json",
        }
    }
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/user_Find_doctors` ,{ gender ,speciality , page , perPage } , config).then((Data) =>{
        dispatch({type : userActions.DOCTORFINDSUCCESS , payLoad : Data.data})
    }).catch((err) => {
        dispatch({type : userActions.DOCTORFINDFAILED , payLoad : err.response.data})
    })
}

export const user_add_favorite_doctor = (userId , doctorId) => async (dispatch) => {
   try {
    dispatch({type:userActions.USERFAVORITEADDDOCTORREQUEST})
    let token = JSON.parse(localStorage.getItem('userInfo'))
    if(token !== undefined) {
        token = token.token
    }
    const config = {
        headers : {
            Authorization: "Bearer " + token,
            "content-type" : "application/json",
        }
    }
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/user_add_favorite_doctors`,{ userId ,doctorId } , config).then((Data) =>{
        dispatch({type : userActions.USERFAVORITEADDDOCTORSUCCESS, payLoad : Data.data})
    }).catch((err) => {
        dispatch({type : userActions.USERFAVORIREDOCTORFAILED, payLoad : err.response.data})
    })
   } catch (err) {
    dispatch({type : userActions.USERFAVORIREDOCTORFAILED, payLoad : err.response.data})
   }
}

export const user_favorite_doctor = (userId , doctorId) => async (dispatch) => {
    dispatch({type:userActions.USERFAVORITEDOCTORREQUEST})
    let token = JSON.parse(localStorage.getItem('userInfo'))
    const config = {
        headers : {
            Authorization: "Bearer " + token.token,
            "content-type" : "application/json",
        }
    }
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/user_favorite_doctors`,{ userId ,doctorId } , config).then((Data) =>{
        localStorage.setItem("favoriteDoctors" , JSON.stringify(Data.data))
        dispatch({type : userActions.USERFAVORITEDOCTORSUCCESS, payLoad : Data.data})
    }).catch((err) => {
        dispatch({type : userActions.USERFAVORIREDOCTORFAILED, payLoad : err.response.data})
    })
}


export const user_edit_profile = (details) => async (dispatch) => {
    dispatch({type:userActions.USERDATAREQUEST})
    let token = JSON.parse(localStorage.getItem('userInfo'))
    details.token = token.token
    const config = {
        headers : {
            Authorization: "Bearer " + token.token,
            "content-type" : "application/json",
        }
    }
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/user_profile_edit`, {details} , config).then((Data) =>{
        if(details.from === "google") {
            Data.data.from = "google"
        } else {
            Data.data.from = 'local'
        }
        // localStorage.removeItem('userInfo');
        // localStorage.setItem('userInfo' , JSON.stringify(Data.data));
        dispatch({type : userActions.USERDATADETAILS, payLoad : Data.data})
    }).catch((err) => {
        dispatch({type : userActions.USERDATAFAILED, payLoad : err.response.data})
    })
}

export const user_checkout = (userData) => async (dispatch) => {
    dispatch({type:userActions.STRIPESTATUSREQUEST})
    let token = JSON.parse(localStorage.getItem('userInfo'))
    const config = {
        headers : {
            Authorization: "Bearer " + token.token,
            "content-type" : "application/json",
        }
    }
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/create-billing`, { userData } , config).then((Data) =>{
        dispatch({type : userActions.STRIPESTATUS, payLoad : Data.data})
    }).catch((err) => {
        dispatch({type : userActions.STRIPESTATUSFAILED, payLoad : err.response.data})
    })
}

export const user_edit_password = (oldPassword , password , email) => async (dispatch) => {
    let token = JSON.parse(localStorage.getItem('userInfo'))
    const config = {
        headers : {
            Authorization: "Bearer " + token.token,
            "content-type" : "application/json",
        }
    }
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/user_password_edit`, {oldPassword , password, email} , config).then((Data) =>{
        console.log(Data);
        dispatch({type : userActions.USEREDITPASSWORDSUCCESS, payLoad : Data.data})
    }).catch((err) => {
        console.log(err.response.data);
        dispatch({type : userActions.USEREDITPASSWORDFAILED, payLoad : err.response.data})
    })
}

export const user_add_review = (patientId , doctorId , review , rating , date ) => async (dispatch) => {
    dispatch({type : userActions.USERADDREVIEWREQUESTED})
    let token = JSON.parse(localStorage.getItem('userInfo'))
     const config = {
        headers : {
            Authorization: "Bearer " + token.token,
            "content-type" : "application/json",
        }
    }
     axios.post(`${process.env.REACT_APP_BACKEND_URL}/user_add_review`, { patientId , doctorId , review , rating , date } , config).then((Data) =>{
        dispatch({type : userActions.USERADDREVIEW, payLoad : Data.data})
    }).catch((err) => {
        dispatch({type : userActions.USERADDREVIEWFAILED, payLoad : err.response.data})
    })
}

export const user_find_reviews = ( doctorId ) => async (dispatch) => {
    dispatch({type : userActions.FINDALLREVIEWREQUESTED})
    let token = JSON.parse(localStorage.getItem('userInfo'))
     const config = {
        headers : {
            Authorization: "Bearer " + token.token,
            "content-type" : "application/json",
        }
    }
     axios.post(`${process.env.REACT_APP_BACKEND_URL}/user_find_all_review`, {  doctorId  } , config).then((Data) =>{
        dispatch({type : userActions.FINDALLREVIEW, payLoad : Data.data})
    }).catch((err) => {
        dispatch({type : userActions.FINDALLREVIEWFAILED, payLoad : err.response.data})
    })
}

export const bookAction = (userData) => async(dispatch) => {
    localStorage.setItem('bookAction' , JSON.stringify(userData))
    dispatch({type : userActions.BOOKACTION , payLoad : userData})
}

export const userLogoutAction = () =>async(dispatch) => {
    localStorage.removeItem("userInfo")
    dispatch({type : userActions.LOGOUT })
}