import { doctorActions } from "../constants/doctor";

export const doctorLoginReduecer = (state = {} , {type , payLoad}) => {
    switch(type) {
        case doctorActions.DOCTORLOGINREQUEST : {
            return {
                loading : true ,
                data : payLoad
            }
        } 
        case doctorActions.DOCTORLOGIN : {
            return {
                data : payLoad,
                loading : false
            }
        }
        case doctorActions.DOCTORLOGINFAILED : {
            return {
                err : payLoad ,
                loading : false
            }
        }
        case doctorActions.DOCTORLOGOUT : {
            return{
                data : false
            }
        }
        default : {
            return state
        }
    }
}

export const doctorDataReduecer = (state = {} , {type , payLoad}) => {
    switch(type) {
        case doctorActions.DOCTORDATAREQUEST : {
            return {
                loading : true ,
                data : payLoad
            }
        } 
        case doctorActions.DOCTORDATA : {
            return {
                data : payLoad,
                loading : false
            }
        }
        case doctorActions.DOCTORDATAFAILED : {
            return {
                err : payLoad ,
                loading : false
            }
        }
     
        default : {
            return state
        }
    }
}

export const total_Count_of_user = (state = {} , {type , payLoad}) => {
    switch(type) {
        case doctorActions.TOTALCOUNTOFUSERSREQUEST : {
            return {
                loading : true ,
                data : payLoad
            }
        }
        case doctorActions.TOTALCOUNTOFUSERS : {
           return {
             loading : false ,
            data : payLoad
           }
        }
        case doctorActions.TOTALCOUNTOFUSERSFAILED : {
            return {
                loading : false ,
                err : payLoad
            }
        }
        default : {
            return state
        }
    }
}

export const appointments = (state = {} , {type , payLoad}) => {
    switch(type) {
        case doctorActions.APPOINTMENTSREQUEST : {
            return {
                loading : true ,
                data : payLoad
            }
        }
        case doctorActions.APPOINTMENTS : {
            return {
                loading : false ,
                data : payLoad
            } 
        } 
        case doctorActions.APPOINTMENTSFAILED : {
            return {
                loading : true ,
                err : payLoad
            }
        }
        default : {
            return state
        }
    }
}

export const totalPatients = (state = {} , {type , payLoad}) => {
    switch(type) {
        case doctorActions.TOTALPATIENTSREQUEST : {
            return {
                loading : true ,
                data : payLoad
            }
        }
        case doctorActions.TOTALPATIENTS : {
            return {
                loading : false ,
                data : payLoad
            } 
        } 
        case doctorActions.TOTALPATIENTSFAILED : {
            return {
                loading : false ,
                err : payLoad
            }
        }
        default : {
            return state
        }
    }
}

export const addTime = (state = {} , {type , payLoad}) => {
    switch(type) {
        case doctorActions.DOCTORADDTIMEFAILED : {
            return {
                loading : false ,
                err : payLoad
            }
        }
        default : {
            return state
        }
    }
}

export const PROFILEUPDATE = (state = {} , {type , payLoad}) => {
    switch(type) {
        case doctorActions.DOCTORPROFILEUPDATE : {
            return {
                loading : false ,
                data : payLoad
            }
        }
        default : {
            return state
        }
    }
}

export const doctorChangePasswodReducer = (state = {} , {type , payLoad}) => {
    switch(type) {
        case doctorActions.DOCTORCHANGEPASSWORD : {
            return {
                loading : false ,
                data : payLoad
            }
        }
        case doctorActions.DOCTORCHANGEPASSWORDFAILED : {
            return {
                loading : false ,
                err : payLoad
            }
        }
        default : {
            return state
        }
    }
}