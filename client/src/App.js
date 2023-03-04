import Home from './components/user/home/Home.js';
import { BrowserRouter as Router , Route , Routes ,Navigate} from 'react-router-dom'
import Login from './components/user/Login/Login';
import Register from './components/user/Register/Register';
import Doctor from './components/user/doctors/Doctor';
import Doc from './components/user/doctors/doctor-view/doc';
import Appoinmentshedule from './components/user/doctors/appointmentShedule/Book'
import Checkout from './components/user/Billing/Checkout';
import Success from './components/user/Billing/Success';
import Invoice from './components/user/Billing/invoice/PaymentInvoice.jsx';
import ProfileEdit from './components/user/Profile/ProfileSettings/ProfileEdit';
import Chat from './components/user/Profile/ProfileSettings/chat/Chat'

import { useSelector } from 'react-redux'; 


function App() {
  const userData = useSelector((state) => state.userLogin.data)
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
        <Route exact path='/doctor-appointment-checkout' element={userData ? <Checkout /> : <Navigate to='/' />} />
        <Route exact path='/doctor-appointment-success' element={userData ? <Success /> : <Navigate to='/' />} />
        <Route exact path='/view-invoice' element={userData ? <Invoice /> : <Navigate to='/' />} />
        <Route exact path='/user-profile' element={userData ?<ProfileEdit /> : <Navigate to='/' />} />
        <Route exact path='/user-chat' element={userData ? <Chat /> : <Navigate to='/' />} />
      </Routes>
      {/* user */}
    </Router >
  
    </>
  )
}

export default App;
