import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import  './Navbar.css'
import Button from 'react-bootstrap/Button';
import { FaRegHospital } from 'react-icons/fa';
import { useSelector } from 'react-redux';


function Header({docNav}) {

    const docData = useSelector((state) => state.doctorLogin.data)

  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="dark">
      <Container>
        <Navbar.Brand ><img className='me-5 mt-3' style={{cursor:'pointer'}}  src={require('../../assets/img/logo.png')} alt="" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className='menu-toggle'/>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link  className='nav-items'>Home</Nav.Link>
            {
            !docNav &&  <Nav.Link  className='nav-items'>Patients</Nav.Link>
            }
          </Nav>
          <Nav>
          <Nav.Link  className='nav-contact' style={{color:'black'}}> 
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
              !docData ? <Nav.Link className='mt-2'><Button className='menu-user-login-button'>Login</Button></Nav.Link> : ''
             }
                
                  
               
               {/* <div className="profile-image-in-navbar" >
                  <img className='mt-2' 
                  src= "https://media.istockphoto.com/id/522855255/vector/male-profile-flat-blue-simple-icon-with-long-shadow.jpg?s=612x612&w=0&k=20&c=EQa9pV1fZEGfGCW_aEK5X_Gyob8YuRcOYCYZeuBzztM=" alt="" />
              </div> */}
            
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;