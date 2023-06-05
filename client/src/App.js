import React from 'react';
import Home from './components/user/home/Home.js';
import { BrowserRouter as Router , Route , Routes ,Navigate  } from 'react-router-dom'
import Login from './components/user/Login/Login';
import Register from './components/user/Register/Register';
import Doctor from './components/user/doctors/Doctor';
import Doc from './components/user/doctors/doctor-view/doc';
import Appoinmentshedule from './components/user/doctors/appointmentShedule/Book'
import Checkout from './components/user/Billing/Checkout';
import Success from './components/user/Billing/Success';
import Invoice from './components/user/Billing/invoice/PaymentInvoice.jsx';
import ProfileEdit from './components/user/Profile/ProfileSettings/ProfileEdit';
import Chat from './components/user/Profile/chat/chat.js'
import DocLogin from './components/doc/Login/Login'
import { useSelector } from 'react-redux'; 
import DocHome from './components/doc/home/home.js'
import Room from './components/video/Room.js';
import AdminHome from './components/admin/home/home.jsx';
import AdminLogin from './components/admin/login/Login.jsx'
import AdminRegister from './components/admin/signup/Signup.js'
import { Suspense } from 'react';
import Loading2 from './components/loading/Loading2.jsx';

const User = React.lazy(() => import('./components/admin/home/users/User.jsx'))
const DoctorComponent = React.lazy(() => import('./components/admin/home/Doc/Doctor.jsx'))
const Appointment = React.lazy(() => import('./components/admin/home/appointments/Appointment.jsx'))
const Speciality = React.lazy(() => import('./components/admin/home/spec/speciality.jsx'))
const Report = React.lazy(() => import('./components/admin/home/reports/report.jsx'))


function App() {
  const userData = useSelector((state) => state.userLogin.data)
  const docData = useSelector((state) => state.doctorLogin.data)
  const bookAction = useSelector((state) => state.bookAction.data)
  const adminData = useSelector((state) => state.adminLogin.data)
  return (
    <>
    <Router>
      <Routes>
        {/* user */}
        <Route exact path='/' element={<Home />} />
        <Route exact path='/user-register' element={userData ? < Navigate to="/" /> : <Register /> } />
        <Route exact path='/user_login' element={userData ? < Navigate to="/" /> : <Login />} />
        <Route exact path='/doctor-search' element={<Doctor />} />
        <Route exact path='/doctor-profile' element={<Doc />} />
        <Route exact path='/doctor-appointment-shedule' element={userData ? <Appoinmentshedule /> : <Navigate to='/' />} />
        <Route exact path='/doctor-appointment-checkout' element={userData && bookAction ? <Checkout /> : <Navigate to='/' />} />
        <Route exact path='/doctor-appointment-success' element={userData && bookAction ? <Success /> : <Navigate to='/' />} />
        <Route exact path='/view-invoice' element={userData ? <Invoice /> : <Navigate to='/' />} />
        <Route exact path='/user-profile' element={userData ?<ProfileEdit /> : <Navigate to='/' />} />
        <Route exact path='/user-chat' element={userData ? <Chat /> : <Navigate to='/' />} />
        <Route exact path='/room' element={userData || docData ? <Room /> : <Navigate to='/' />} />
        {/* user */}

        {/* doctor */}
        <Route exact path='/doctor/' element ={docData ? <DocHome /> : <Navigate to='/doctor/login' />} />
        <Route exact path='/doctor/login' element={ docData ? <Navigate to='/doctor/' /> : <DocLogin />} />
        {/* doctor */}

        {/* admin */}
        <Route exact path='/admin/' element={adminData ? <AdminHome /> : <Navigate to='/admin/login' />} />
        <Route exact path='/admin/login' element={ adminData ? <Navigate to='/admin/' /> :<AdminLogin /> }/>
        <Route exact path='/admin/signup' element={ adminData ? <Navigate to='/admin/' /> :<AdminRegister/> }/>
      </Routes>
      <Suspense fallback={<Loading2 />} >
        <Routes>
          <Route exact path='/admin/user' element={ adminData ? <User /> : <Navigate to='/admin/login' /> }/>
          <Route exact path='/admin/doctor' element={ adminData ? <DoctorComponent /> : <Navigate to='/admin/login' /> }/>
          <Route exact path='/admin/report' element={ adminData ? <Report /> : <Navigate to='/admin/login' /> }/>
          <Route exact path='/admin/appointments' element={ adminData ? <Appointment /> : <Navigate to='/admin/login' /> }/>
          <Route exact path='/admin/speciality' element={ adminData ? <Speciality /> : <Navigate to='/admin/login' /> }/>
        </Routes>
      </Suspense>
    </Router >
  
    </>
  )
}

export default App;
