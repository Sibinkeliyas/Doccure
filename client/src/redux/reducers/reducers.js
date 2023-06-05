import {combineReducers} from 'redux'
// admin reducers
import { adminAddDoctors, adminAddSpeciality, adminDashboard, adminDeleteSpeciality, adminEditSpeciality, adminFindAppointments, adminFindDoctors, adminFindReport, adminFindReports, adminFindSpecialities, adminFindUsers, adminLogin, adminRegister } from './admin'
// doctor reducers
import { PROFILEUPDATE, addTime, appointments, doctorChangePasswodReducer, doctorDataReduecer, totalPatients, total_Count_of_user } from './doctor'
// user reducers
import {userLoginReducer , userDoctorReducer, userSpecialityReducer, userFavDocReducer, userPasswordEdit, userCheckout, userAllOrders, userfindReviews, useraddReviews, userDetailsReducer, bookAction} from './user'
import { Room, createMessage, findAllUserMessages, message, user } from './chat'
import { doctorLoginReduecer } from './doctor'

const reducers = combineReducers ({
    userLogin : userLoginReducer,
    userDoctor : userDoctorReducer , 
    userSpecialities : userSpecialityReducer,
    userFavDocReducer : userFavDocReducer ,
    userPasswordEdit : userPasswordEdit ,
    userCheckout : userCheckout ,
    userAllOrders : userAllOrders ,
    message : message ,
    user : user ,
    userfindReviews : userfindReviews ,
    useraddReviews: useraddReviews ,
    userDetailsReducer : userDetailsReducer,
    bookAction : bookAction ,

    // doctor
    doctorLogin : doctorLoginReduecer ,
    totalCountofuser : total_Count_of_user ,
    appointments : appointments ,
    totalPatients : totalPatients ,
    doctorDataReduecer : doctorDataReduecer ,
    addTime : addTime ,
    PROFILEUPDATE: PROFILEUPDATE ,

    doctorChangePasswodReducer : doctorChangePasswodReducer ,
    findAllUserMessages : findAllUserMessages ,

        // chat 
    createMessage : createMessage ,
    Room : Room ,

    // admin
    adminRegister : adminRegister ,
    adminLogin : adminLogin ,
    adminFindDoctors : adminFindDoctors ,
    adminFindUsers : adminFindUsers ,
    adminSpecialities : adminFindSpecialities ,
    adminFindReports : adminFindReports ,
    adminFindReport : adminFindReport ,
    adminFindAppointments : adminFindAppointments ,
    adminAddDoctors : adminAddDoctors ,
    adminAddSpeciality : adminAddSpeciality , 
    adminEditSpeciality : adminEditSpeciality ,
    adminDeleteSpeciality : adminDeleteSpeciality ,
    adminDashboard : adminDashboard


})

export default reducers