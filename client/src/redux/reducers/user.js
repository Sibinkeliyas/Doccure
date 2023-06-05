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

export const userDetailsReducer = (state = initialState , {type,payLoad}) => {
    switch (type) {
        case userActions.USERDATAREQUEST:
            return {
                loading : true,
                data : payLoad
            }
        case userActions.USERDATADETAILS : 
            return {
                loading : false ,
                data : payLoad
            }
        case userActions.USERDATAFAILED :
            return {
                loading : false,
                error : payLoad
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

export const userPasswordEdit = (state = initialState , {type,payLoad}) => {
    switch (type) {
        case userActions.USERPASSWORDEDITREQUEST:
            return {
                loading : true,
            }
        case userActions.USEREDITPASSWORDSUCCESS : 
            return {
                loading : false ,
                password : payLoad ,
                passwordError : ''
            }
        case userActions.USEREDITPASSWORDFAILED :
            return {
                loading : false,
                passwordError : payLoad ,
                
            }
        default:
            return state;
    }
}


export const userCheckout = (state = initialState , {type,payLoad}) => {
    switch (type) {
        case userActions.STRIPESTATUSREQUEST:
            return {
                loading : true,
                doctor : payLoad
            }
        case userActions.STRIPESTATUS : 
            return {
                loading : false ,
                doctor : payLoad
            }
        case userActions.STRIPESTATUSFAILED :
            return {
                loading : false,
                error : payLoad
            }
        default:
            return state;
    }
}

export const userAllOrders = (state = initialState , { type,payLoad }) => {
    switch (type) {
        case userActions.ALLORDERSREQUEST:
            return {
                loading : true,
                doctor : payLoad
            }
        case userActions.ALLORDERS : 
            return {
                loading : false ,
                doctor : payLoad
            }
        case userActions.ALLORDERFAILED :
            return {
                loading : false,
                error : payLoad
            }
        default:
            return state;
    }
}

export const useraddReviews = (state = initialState , { type,payLoad }) => {
    switch (type) {
        case userActions.USERADDREVIEWREQUESTED :
            return {
                loading : true,
                doctor : payLoad
            }
        case userActions.USERADDREVIEW : 
            return {
                loading : false ,
                doctor : payLoad
            }
        case userActions.USERADDREVIEWFAILED :
            return {
                loading : false,
                error : payLoad
            }
        default:
            return state;
    }
}

export const userfindReviews = (state = initialState , { type,payLoad }) => {
    switch (type) {
        case userActions.FINDALLREVIEWREQUESTED:
            return {
                loading : true,
                doctor : payLoad
            }
        case userActions.FINDALLREVIEW :
            return {
                loading : false ,
                doctor : payLoad
            }
        case userActions.FINDALLREVIEWFAILED :
            return {
                loading : false,
                error : payLoad
            }
        default:
            return state;
    }
}


export const bookAction = (state = initialState , { type,payLoad }) => {
    switch (type) {
        case userActions.BOOKACTION:
            return {
                loading : true,
                data : payLoad
            }
        
        default:
            return state;
    }
}






