import axios from 'axios'
import { userActions } from '../constants/user'



export const userRegister = (name , email , password , phone) => async (dispatch) => {          // user register
    dispatch({type : userActions.REGISTERREQUEST});
    const config = {
        headers : {
            "Content-type": "application/json",
        }
    }
    axios.post("http://localhost:3001/user_signUp",
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
    axios.post("http://localhost:3001/user_login",
    {email , password},
    config
    ).then((data) => {
        dispatch({type : userActions.LOGINSUCCES , payLoad : data});
        localStorage.setItem('userInfo' , JSON.stringify(data.data));
    }).catch((err) => {
        dispatch({type : userActions.LOGINFAILED , payLoad : err.response.data})
    })
}


export const userGoogleLogin = (googleCodeResponce) => async (dispatch) => {                            // user login
        dispatch({type : userActions.LOGINREQUEST});
        dispatch({type : userActions.LOGINSUCCES , payLoad : googleCodeResponce});
        localStorage.setItem('userInfo' , JSON.stringify(googleCodeResponce));
}



export const userDoctors = () =>async (dispatch) => {
    dispatch({type : userActions.DOCTORFINDREQUEST}) 
    const config = {
        headers : {
            "content-type" : "application/json",
        }
    }
    axios.get("http://localhost:3001/user_Find_doctors" , config).then((Data) => {
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
    axios.get("http://localhost:3001/admin/admin-speciality" , config).then((Data) => {
        localStorage.setItem("specialities" , Data.data)
        dispatch({type : userActions.SPECIALITYSUCCESS , payLoad : Data.data})
    }).catch((err) => {
        dispatch({type : userActions.SPECIALITYFAILED , payLoad : err.response.data})
    })

}


export const user_filter_doctor = (gender , speciality) => async (dispatch) => {
    dispatch({type:userActions.DOCTORFINDREQUEST})
    const config = {
        headers : {
            "content-type" : "application/json",
        }
    }
    axios.post(`http://localhost:3001/user_search_doctors`,{ gender ,speciality } , config).then((Data) =>{
        dispatch({type : userActions.DOCTORFINDSUCCESS , payLoad : Data.data})
    }).catch((err) => {
        dispatch({type : userActions.DOCTORFINDFAILED , payLoad : err.response.data})
    })
}

export const user_add_favorite_doctor = (userId , doctorId) => async (dispatch) => {
   try {
    dispatch({type:userActions.USERFAVORITEADDDOCTORREQUEST})
    let token = JSON.parse(localStorage.getItem('userInfo'))
    if(token != undefined) {
        token = token.token
    }
    const config = {
        headers : {
            Authorization: "Bearer " + token,
            "content-type" : "application/json",
        }
    }
    axios.post("http://localhost:3001/user_add_favorite_doctors",{ userId ,doctorId } , config).then((Data) =>{
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
    axios.post(`http://localhost:3001/user_favorite_doctors`,{ userId ,doctorId } , config).then((Data) =>{
        localStorage.setItem("favoriteDoctors" , JSON.stringify(Data.data))
        dispatch({type : userActions.USERFAVORITEDOCTORSUCCESS, payLoad : Data.data})
    }).catch((err) => {
        dispatch({type : userActions.USERFAVORIREDOCTORFAILED, payLoad : err.response.data})
    })
}

export const userLogoutAction = () =>async(dispatch) => {
    localStorage.removeItem("userInfo")
    dispatch({type : userActions.LOGOUT })
}