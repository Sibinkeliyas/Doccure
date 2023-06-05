import { chatActions } from "../constants/chat";
import axios from "axios";
export const usernotification = (userid , id) => async (dispatch) => {
    const config = {
        headers: {
            "content-type": "application/json",
        }
    }
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/notification`, {
        userid , id
    }, config).then(() => {
    }).catch((err) => {
        console.log("errr" ,err);
    })
}

export const viewNotification = (userid , id) => async (dispatch) => {
    const config = {
        headers: {
            "content-type": "application/json",
        }
    }
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/viewnotification`, {
        userid , id
    }, config).then(() => {
    }).catch((err) => {
        console.log("errr" ,err);
    })
}

export const getMessage = (user1 , user2) => async (dispatch) => {
    dispatch({
        type: chatActions.MESSAGEREQUESTED
    })
    const config = {
        headers: {
            "content-type": "application/json",
        }
    }
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/message?user1=${user1}&user2=${user2}`, config).then((Data) => {
        dispatch({
            type: chatActions.MESSAGE,
            payLoad: Data.data
        })
    }).catch((err) => {
        console.log("errr", err);
        dispatch({
            type: chatActions.MESSAGEFAILED,
            payLoad: err.response.data
        })
    })
}

export const message = ( user1 , user2 , message) => async (dispatch) => {
    dispatch({
        type: chatActions.MESSAGEPOSTREQUEST
    })
    const config = {
        headers: {
            "content-type": "application/json",
        }
    }
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/message`, {
        user1 , user2 , message
    }, config).then((Data) => {
        dispatch({
            type: chatActions.MESSAGEPOST,
            payLoad: Data.data
        })
    }).catch((err) => {
        console.log("errr", err);
        dispatch({
            type: chatActions.MESSAGEPOSTFAILED,
            payLoad: err.response.data
        })
    })
}

export const users = ( userId ) => async (dispatch) => {
    dispatch({
        type: chatActions.USERSREQUEST
    })
    const config = {
        headers: {
            "content-type": "application/json",
        }
    }
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/`,{userId} , config).then((Data) => {
        dispatch({
            type: chatActions.USERS,
            payLoad: Data.data
        })
    }).catch((err) => {
        console.log("errr", err);
        dispatch({
            type: chatActions.USERSFAILED,
            payLoad: err.response.data
        })
    })
}