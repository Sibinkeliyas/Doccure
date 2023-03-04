import {combineReducers} from 'redux'
// admin reducers
import {} from './admin'
// doctor reducers
import {} from './doctor'
// user reducers
import {userLoginReducer , userDoctorReducer, userSpecialityReducer, userFavDocReducer} from './user'

const reducers = combineReducers ({
    userLogin : userLoginReducer,
    userDoctor : userDoctorReducer , 
    userSpecialities : userSpecialityReducer,
    userFavDocReducer : userFavDocReducer
})

export default reducers