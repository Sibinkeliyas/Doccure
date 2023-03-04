import { userActions } from "../constants/user";  // user constand actions

const initialState = [{}]


export const userLoginReducer = (state = initialState , {type,payLoad}) => {
    switch (type) {
        case userActions.LOGINREQUEST:
            return {
                loading : true,
                data : payLoad
            }
        case userActions.LOGINSUCCES : 
        console.log("payLoad");
        console.log(payLoad);
            return {
                loading : false ,
                data : payLoad
            }
        case userActions.LOGINFAILED :
            return {
                loading : false,
                error : payLoad
            }
        case userActions.LOGOUT :
            return {
                data : false
            }
        default:
            return state;
    }
}



export const userDoctorReducer = (state = initialState , {type,payLoad}) => {
    switch (type) {
        case userActions.DOCTORFINDREQUEST:
            return {
                loading : true,
                doctor : payLoad
            }
        case userActions.DOCTORFINDSUCCESS : 
            return {
                loading : false ,
                doctor : payLoad
            }
        case userActions.DOCTORFINDFAILED :
            return {
                loading : false,
                error : payLoad
            }
        default:
            return state;
    }
}

export const userSpecialityReducer = (state = initialState , {type,payLoad}) => {
    switch (type) {
        case userActions.SPECIALITYREQUEST:
            return {
                loading : true,
                speciality : payLoad
            }
        case userActions.SPECIALITYSUCCESS : 
            return {
                loading : false ,
                speciality : payLoad
            }
        case userActions.SPECIALITYFAILED :
            return {
                loading : false,
                specialityError : payLoad
            }
        default:
            return state;
    }
}

export const userFavDocReducer = (state = initialState , {type,payLoad}) => {
    switch (type) {
        case userActions.USERFAVORITEDOCTORREQUEST:
            return {
                loading : true,
                favDoc : payLoad
            }
        case userActions.USERFAVORITEDOCTORSUCCESS : 
            return {
                loading : false ,
                favDoc : payLoad ,
                favDocErr : ''
            }
        case userActions.USERFAVORIREDOCTORFAILED :
            return {
                loading : false,
                favDocErr : payLoad
            }
        default:
            return state;
    }
}





