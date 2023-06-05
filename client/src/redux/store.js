import {  createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import reducers from "./reducers/reducers";


let userData = JSON.parse(localStorage.getItem('userInfo'));
let docData = JSON.parse(localStorage.getItem('doctorInfo'));
let bookAction = JSON.parse(localStorage.getItem('bookAction'));
let adminData = JSON.parse(localStorage.getItem('adminInfo'));
if(userData === null){
    userData=false
}
if(docData === null) {
    docData = false
}
if(bookAction === null) {
    bookAction = false
}
if(adminData === null) {
    adminData = false
}
const initialState = {
    userLogin:{data:userData} ,
    doctorLogin : {data : docData} ,
    bookAction : {data : bookAction} ,
    adminLogin : {data : adminData}
}

const middleWare = [thunk]

const store = createStore(
    reducers , initialState , composeWithDevTools(applyMiddleware(...middleWare))
)

export default store;