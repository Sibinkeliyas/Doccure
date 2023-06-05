import axios from "axios"
import { doctorActions } from "../constants/doctor"
import { chatActions } from '../constants/chat'

export const find_all_user_message = (doctorId , search) => async(dispatch) => {
    dispatch({type : doctorActions.DOCTORFINDALLUSERMESSAGESREQUEST});
     const token = JSON.parse(localStorage.getItem('doctorInfo'))
      const config = {
        headers : {
            Authorization: "Bearer " + token.token,
            "content-type": "application/json",
        } ,
    }
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/doctor/find-all-users-message` , 
    { doctorId , search }, 
    config).then((data) => {
         dispatch({type : doctorActions.DOCTORFINDALLUSERMESSAGES ,payLoad : data.data })
    }).catch((err) => {
        console.log(err);
        dispatch({type : doctorActions.DOCTORFINDALLUSERMESSAGESFAILED ,payLoad : err.response.data })
    })
}

export const roomStore = (room , userId , doctorId  , to) => async (dispatch) => {
    dispatch({type : chatActions.ROOM , payLoad : room})
     const token = JSON.parse(localStorage.getItem('doctorInfo'))
      const config = {
        headers : {
            Authorization: "Bearer " + token.token,
            "content-type": "application/json",
        } ,
    }
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/create-message` , 
    { userId , doctorId  , to}, 
    config).then((data) => {
    }).catch((err) => {
        console.log(err);
    })
}

export const find_all_doctor_message = (userId , search = '') => async(dispatch) => {
    dispatch({type : doctorActions.DOCTORFINDALLUSERMESSAGESREQUEST});
     const token = JSON.parse(localStorage.getItem('userInfo'))
      const config = {
        headers : {
            Authorization: "Bearer " + token.token,
            "content-type": "application/json",
        } ,
    }
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/find-all-doctor-message` , 
    { userId , search }, 
    config).then((data) => {
         dispatch({type : doctorActions.DOCTORFINDALLUSERMESSAGES ,payLoad : data.data })
    }).catch((err) => {
        console.log(err);
        dispatch({type : doctorActions.DOCTORFINDALLUSERMESSAGESFAILED ,payLoad : err.response.data })
    })
}

export const createMessage = (doctorId , userId ) => async(dispatch) => {
dispatch({type : chatActions.CREATEMESSAGEREQUESTED});
     const token = JSON.parse(localStorage.getItem('userInfo'))
      const config = {
        headers : {
            Authorization: "Bearer " + token.token,
            "content-type": "application/json",
        } ,
    }
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/create-message` , 
    { userId , doctorId }, 
    config).then((data) => {
         dispatch({type : chatActions.CREATEMESSAGE ,payLoad : data.data })
    }).catch((err) => {
        console.log(err);
        dispatch({type : chatActions.CREATEMESSAGEFAILED ,payLoad : err.response.data })
    })
}


export const storeMessage = (doctorId , userId , message , from , to) => async(dispatch) => {
dispatch({type : chatActions.STOREMESSAGEREQUEST});
     let token = JSON.parse(localStorage.getItem('userInfo'))
     if(!token.token) {
        token = JSON.parse(localStorage.getItem('doctorInfo'))
     }
      const config = {
        headers : {
            Authorization: "Bearer " + token.token,
            "content-type": "application/json",
        } ,
    }
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/store-message` , 
    { userId , doctorId ,message , from}, 
    config).then((data) => {
         dispatch({type : chatActions.STOREMESSAGE ,payLoad : data.data })
    }).catch((err) => {
        console.log(err);
        dispatch({type : chatActions.STOREFAILED ,payLoad : err.response.data })
    })
    
}

export const increaseMessageCount = (doctorId , userId ) => async(dispatch) => {
    console.log(doctorId , userId);
       let token = JSON.parse(localStorage.getItem('userInfo'))
        if(!token.token) {
            token = JSON.parse(localStorage.getItem('doctorInfo'))
        }
      const config = {
        headers : {
            Authorization: "Bearer " + token.token,
            "content-type": "application/json",
        } ,
    }
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/increase-message-count` , 
    { userId , doctorId }, 
    config).then((data) => {
    }).catch((err) => {
        console.log(err);
    })
    
}

export const decreaseMessageCount = (doctorId , userId ) => async(dispatch) => {
       let token = JSON.parse(localStorage.getItem('userInfo'))
        if(!token.token) {
            token = JSON.parse(localStorage.getItem('doctorInfo'))
        }
      const config = {
        headers : {
            Authorization: "Bearer " + token.token,
            "content-type": "application/json",
        } ,
    }
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/decrease-message-count` , 
    { userId , doctorId }, 
    config).then((data) => {
    }).catch((err) => {
        console.log(err);
    })
    
}
