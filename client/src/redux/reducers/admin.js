import { adminAction } from "../constants/admin"

const initialState = [{}]


export const adminLogin = (state = initialState, {
    type,
    payLoad
}) => {
    switch (type) {
        case adminAction.ADMINLOINGERQUEST:
            return {
                loading: true,
                data: payLoad
            }
        case adminAction.ADMINLOGIN:
            return {
                loading: false,
                data: payLoad
            }
        case adminAction.ADMINLOGINFAILED:
            return {
                loading: false,
                error: payLoad
            }
        case adminAction.ADMINLOGOUT : {
            return {
                data : false
            }
        }
        default:
            return state;
    }
}

export const adminRegister = (state = initialState, {
    type,
    payLoad
}) => {
    switch (type) {
        case adminAction.ADMINREGISTERREQUEST:
            return {
                loading: true,
                data: payLoad
            }
        case adminAction.ADMINREGISTER:
            return {
                loading: false,
                data: payLoad
            }
        case adminAction.ADMINERGISTERFAILED:
            return {
                loading: false,
                error: payLoad
            }
        default:
            return state;
    }
}

export const adminFindUsers = (state = initialState, {
    type,
    payLoad
}) => {
    switch (type) {
        case adminAction.FINDUSERSERQUESTED:
            return {
                loading: true,
                data: payLoad
            }
        case adminAction.FINDUSERS:
            return {
                loading: false,
                data: payLoad
            }
        case adminAction.FINDUSERSFAILED:
            return {
                loading: false,
                error: payLoad
            }
        default:
            return state;
    }
}

export const adminFindDoctors = (state = initialState, {
    type,
    payLoad
}) => {
    switch (type) {
        case adminAction.FINDDOCTORSREQUESTED:
            return {
                loading: true,
                data: payLoad
            }
        case adminAction.FINDDOCTORS:
            return {
                loading: false,
                data: payLoad
            }
        case adminAction.FINDDOCTORSFAILED:
            return {
                loading: false,
                error: payLoad
            }
        default:
            return state;
    }
}

export const adminFindSpecialities = (state = initialState, {
    type,
    payLoad
}) => {
    switch (type) {
        case adminAction.FINDSPECIALITYREQUESTED:
            return {
                loading: true,
                data: payLoad
            }
        case adminAction.FINDSPECIALITY:
            return {
                loading: false,
                data: payLoad
            }
        case adminAction.FINDSPECIALITYFAILED:
            return {
                loading: false,
                error: payLoad
            }
        default:
            return state;
    }
}

export const adminFindReports = (state = initialState, {
    type,
    payLoad
}) => {
    switch (type) {
        case adminAction.FINDREPORTSREQUESTED:
            return {
                loading: true,
                data: payLoad
            }
        case adminAction.FINDREPORTS:
            return {
                loading: false,
                data: payLoad
            }
        case adminAction.FINDREPORTSFAILED:
            return {
                loading: false,
                error: payLoad
            }
        default:
            return state;
    }
}

export const adminFindReport = (state = initialState, {
    type,
    payLoad
}) => {
    switch (type) {
        case adminAction.FINDORDERREQUEST:
            return {
                loading: true,
                data: payLoad
            }
        case adminAction.FINDORDER:
            return {
                loading: false,
                data: payLoad
            }
        case adminAction.FINDORDERFAILED:
            return {
                loading: false,
                error: payLoad
            }
        default:
            return state;
    }
}

export const adminFindAppointments = (state = initialState, {
    type,
    payLoad
}) => {
    switch (type) {
        case adminAction.FINDALLAPPOINTMENTSERQUESTED:
            return {
                loading: true,
                data: payLoad
            }
        case adminAction.FINDALLAPPOINTMENTS:
            return {
                loading: false,
                data: payLoad
            }
        case adminAction.FINDALLAPPOINTMENTSFAILED:
            return {
                loading: false,
                error: payLoad
            }
        default:
            return state;
    }
}

export const adminAddDoctors = (state = initialState, {
    type,
    payLoad
}) => {
    switch (type) {
        case adminAction.ADDDOCTORREQUESTED:
            return {
                loading: true,
                data: payLoad
            }
        case adminAction.ADDDOCTORSUCCESS:
            return {
                loading: false,
                data: payLoad
            }
        case adminAction.ADDDOCTORFAILED:
            return {
                loading: false,
                error: payLoad
            }
        default:
            return state;
    }
}

export const adminAddSpeciality = (state = initialState, {
    type,
    payLoad
}) => {
    switch (type) {
        case adminAction.ADDSPECIALITYREQUESTED:
            return {
                loading: true,
                data: payLoad
            }
        case adminAction.ADDSPECIALITY:
            return {
                loading: false,
                data: payLoad
            }
        case adminAction.ADDSPECIALITYFAILED:
            return {
                loading: false,
                error: payLoad
            }
        default:
            return state;
    }
}

export const adminDeleteSpeciality = (state = initialState, {
    type,
    payLoad
}) => {
    switch (type) {
        case adminAction.DELETESPECIALITYREQUESTED:
            return {
                loading: true,
                data: payLoad
            }
        case adminAction.DELETESPECIALITY:
            return {
                loading: false,
                data: payLoad
            }
        case adminAction.DELETESPECIALITYFAILED:
            return {
                loading: false,
                error: payLoad
            }
        default:
            return state;
    }
}

export const adminEditSpeciality = (state = initialState, {
    type,
    payLoad
}) => {
    switch (type) {
        case adminAction.ADMINEDITREQUESTED:
            return {
                loading: true,
                data: payLoad
            }
        case adminAction.ADMINEDIT:
            return {
                loading: false,
                data: payLoad
            }
        case adminAction.ADMINEDITFAILED:
            return {
                loading: false,
                error: payLoad
            }
        default:
            return state;
    }
}

export const adminDashboard = (state = initialState, {
    type,
    payLoad
}) => {
    switch (type) {
        case adminAction.ADMINDASHBOARDREQUEST:
            return {
                loading: true,
                data: payLoad
            }
        case adminAction.ADMINDASHBOARD:
            return {
                loading: false,
                data: payLoad
            }
        case adminAction.ADMINDASHBOARDFAILED:
            return {
                loading: false,
                error: payLoad
            }
        default:
            return state;
    }
}

