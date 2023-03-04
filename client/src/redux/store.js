import { json } from "react-router-dom";
import {  createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import reducers from "./reducers/reducers";


let userData = JSON.parse(localStorage.getItem('userInfo'));
// let doctorData = JSON.parse(localStorage.getItem('doctorsData'));
// let specialities = JSON.parse(localStorage.getItem('specialities'));
// let favDoc = JSON.parse(localStorage.getItem('favoriteDoctors'));

if(userData === null){
    userData=false
}

const initialState = {
    userLogin:{data:userData} ,

}

const middleWare = [thunk]

const store = createStore(
    reducers , initialState , composeWithDevTools(applyMiddleware(...middleWare))
)

export default store;