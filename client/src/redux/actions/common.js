import axios from 'axios'
import { userActions } from '../constants/user'



export const userOrders = (userId = null , appointmentStatus , page , perPage , search = '') => async (dispatch) => {  
    dispatch({type : userActions.ALLORDERSREQUEST});
     let token = JSON.parse(localStorage.getItem('userInfo'))
    const config = {
        headers : {
            Authorization: "Bearer " + token.token,
            "content-type" : "application/json",
        }
    }
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/user_all_orders`,
    { userId , appointmentStatus , page , perPage , search } ,
    config
    ).then((data) => {
        dispatch({type : userActions.ALLORDERS ,payLoad : data })
    }).catch((err) => {
        dispatch({type : userActions.ALLORDERFAILED ,payLoad : err.response.data })
    })
}