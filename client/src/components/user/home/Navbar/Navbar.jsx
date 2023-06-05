import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import  './Navbar.css'
import Button from 'react-bootstrap/Button';
import { FaRegHospital } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


function Header({admin}) {
  const navigate = useNavigate()
  const doctors_Search = () => {
    navigate('/doctor-search')
  }
  let userData = useSelector((state) => state.userLogin.data)
  const logout = () => {
    localStorage.removeItem('adminInfo')
    userData = false
  }
  // preventDefualt
  const setPrevent = (event) => {
    event.stopPropagation()
    event.preventDefault()
    navigate('/user-profile')
  }
  const login = () => {
    navigate('/user_login')
  }
  const home = () => {
    navigate('/')
  }
 
  const userImage = useSelector((state) => state.userDetailsReducer.data)
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="dark">
      <Container>
        <Navbar.Brand ><img className='me-5 mt-3' style={{cursor:'pointer'}} onClick={home} src={require('../../../assets/img/logo.png')} alt="" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className='menu-toggle'/>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {
              !admin && <Nav.Link  className='nav-items' onClick={doctors_Search}>Doctors</Nav.Link>
            }
            {/* <Nav.Link  className='nav-items'>Speciality</Nav.Link> */}
          </Nav>
          <Nav>
          <Nav.Link onClick={login} className='nav-contact' style={{color:'black'}}> 
          <div className='nav-menu-icon mt-2'>
            <div> 
              < FaRegHospital  className='me-3 hospital-icon contact-nav'/>
            </div>
            <div className='me-3 '>
              <p>Contact <br />+91 60675653</p>
            </div>
          </div>

          
              </Nav.Link>
              
              {
                userData===false
                ? 
                <Nav.Link className='mt-2'><Button onClick={login} className='menu-user-login-button'>Login</Button></Nav.Link>
                  
               : 
               <div className="profile-image-in-navbar" onClick={(e) => {
                setPrevent(e)
              }} >
                  <img className='mt-2' src={userImage?.picture ? userImage.picture : "https://media.istockphoto.com/id/522855255/vector/male-profile-flat-blue-simple-icon-with-long-shadow.jpg?s=612x612&w=0&k=20&c=EQa9pV1fZEGfGCW_aEK5X_Gyob8YuRcOYCYZeuBzztM="} alt="" />
              </div>
              }
              {
              admin && <button className='btn text-info mb-3 border-0' onClick={() => {
                logout()
              }}><i class="fa-solid fa-right-from-bracket"></i></button>
              }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;