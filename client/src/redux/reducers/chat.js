import {
    chatActions
} from "../constants/chat"; // user constand actions
import { doctorActions } from "../constants/doctor";

const initialState = [{}]


export const message = (state = initialState, {
    type,
    payLoad
}) => {
    switch (type) {
        case chatActions.MESSAGEREQUESTED:
            return {
                loading: true,
                data: payLoad
            }
        case chatActions.MESSAGE:
            return {
                loading: false,
        data: payLoad
            }
        case chatActions.MESSAGEFAILE:
            return {
                loading: false,
                error: payLoad
            }
            default:
                return state;
    }
}

export const users = (state = initialState, {
    type,
    payLoad
}) => {
    switch (type) {
        case chatActions.USERREQUEST:
            return {
                loading: true,
                    data: payLoad
            }
            case chatActions.USERS:
                return {
                    loading: false,
                        data: payLoad
                }
                case chatActions.USERSFAILED:
                    return {
                        loading: false,
                            error: payLoad
                    }
                    default:
                        return state;
    }
}

export const user = (state = initialState, {
    type,
    payLoad
}) => {
    switch (type) {
        case chatActions.USERREQUEST :
            return {
                loading: true,
                data: payLoad
            }
     case chatActions.USER:
                return {
              loading: false,
            data: payLoad
         }
    case chatActions.USERFAILED:
            return {
                loading: false,
                error: payLoad
            }
 
        default:
            return state;
    }
}



export const findAllUserMessages = (state = {} , {type , payLoad}) => {
    switch(type) {
        case doctorActions.DOCTORFINDALLUSERMESSAGESREQUEST:
            return {
                loading: true,
                data: payLoad
            }
        case doctorActions.DOCTORFINDALLUSERMESSAGES : {
            return {
                loading : false ,
                data : payLoad
            }
        }
        case doctorActions.DOCTORFINDALLUSERMESSAGESFAILED : {
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

export const createMessage = (state = {} , {type , payLoad}) => {
    switch(type) {
        case chatActions.CREATEMESSAGEREQUESTED:
            return {
                loading: true,
                data: payLoad
            }
        case chatActions.CREATEMESSAGE : {
            return {
                loading : false ,
                data : payLoad
            }
        }
        case chatActions.CREATEMESSAGEFAILED : {
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

export const Room = (state = {} , {type , payLoad}) => {
    switch(type) {
        case chatActions.ROOM:
            return {
                loading: true,
                data: payLoad
            }
        default : {
            return state
        }
    }
}
