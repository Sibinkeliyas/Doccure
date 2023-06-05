import React, { useState , useEffect} from 'react'
import './login-body.css'
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { useSelector , useDispatch } from 'react-redux';
import { userGoogleLogin, userLogin} from '../../../../redux/actions/user'
import Loading from '../../../loading/Loading';
import axios from 'axios';

// google login
import { useGoogleLogin } from '@react-oauth/google';


function Body_login() {
	const [password , setPassword] = useState('')
	const [email , setEmail] = useState('')
	const [passwordCheck , setPasswordCheck] = useState()
	const userlogin = useSelector((state)=>state.userLogin)
	const [alert , setAlert] = useState(false)
	const {data,loading,error} = userlogin
	const navigate = useNavigate()
	const register = () => {
		navigate('/user-register')
		
	}

	// google login

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
					if (codeResponse && codeResponse.access_token !== undefined) {
						axios
							.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`, {
								headers: {
									Authorization: `Bearer ${codeResponse.access_token}`,
									Accept: 'application/json'
								}
							})
							.then((res) => {
								dispatch(userGoogleLogin(res.data))
							})
							.catch((err) => {
								navigate('/user_login')
							});
					}
				
		},
        onError: (error) => navigate('/user_login')
    });

	// google login

	// show password
	const showPassword = (e) => {
		setPasswordCheck(e.target.checked)
	}
	// to set password into a state
	// login dispatch
	const dispatch = useDispatch()
	const handleLogin = (email , password) => {
		dispatch(userLogin(email , password))
		if(data){
			navigate("/")
		}
		if(error) {
			setAlert(true)
		}
	}


	
  return (
    <>
        <div className="content mt-5 mb-5">
				<div className="container-fluid">
					
					<div className="row">
						<div className="col-md-8 offset-md-2">
							
							{/* <!-- Login Tab Content --> */}
							<div className="account-content">
								<div className="row align-items-center justify-content-center">
									<div className="col-md-7 col-lg-6 login-left">
										<img src={require('../../../assets/img/login-banner.png')} className="img-fluid mt-5 mb-5" alt="Doccure Login" />	
									</div>
									<div className="col-md-12 col-lg-6 login-right">
										
										{
										alert ? <div className="warnig-div alert alert-danger alert-dismissible fade show" role="alert">
													<div><strong className='me-3'>Error!</strong>{error}</div>
														<div style={{float:'right',display:'flex',justifyContent:'end'}}>
															<button type="button" className=" btn bg-danger-light  text-danger"  data-dismiss="alert" aria-label="Close" onClick={() => {
																setAlert(false)
															}}>
																<span aria-hidden="true">&times;</span>
															</button>
														</div>
												</div> : 
											<div className="login-header">
											
											<h3>Login <span>Doccure</span></h3>
										</div>
											}
	
											<div className="form-group form-focus">
												<input type="email" name='email' className="form-control floating" onChange={(e) => {
													setEmail(e.target.value)
												}}/>
												<label className="focus-label">Email</label>
											</div>
											<div className="form-group form-focus">
												{
													 <input type={passwordCheck ? "text": "password"} name='password' onChange={(e) => {
														setPassword(e.target.value)
													}} className="form-control floating" />
												}
													
												<div style={{display:"flex" , justifyContent:"space-between"}} className="show-password">
													<label className="focus-label">Password</label>
													<div className="show-password-check-box mt-2">
														<label className="focus-label me-2">Show Password</label>
														<input type="checkbox" name="" id=""  onClick={(e) => {
															showPassword(e)
														}}/>
													</div>
												</div>
												
											</div>
											<div className="text-right">
												<a className="forgot-link" >Forgot Password ?</a>
											</div>
											<div className="d-grid gap-2">
											{
												loading ?<Loading></Loading> : 
												<Button size='lg' className=" btn-login " onClick={() => {
													handleLogin(email , password)
												}} >Login</Button>
											}
											</div>
											<div className="login-or">
												<span className="or-line"></span>
												<span className="span-or">or</span>
											</div>
											<div className="google-login-div">
												  
												{/* google login */}
													<div className="col-12">
														<button className="btn-google" onClick={() => login()}><i className="fab fa-google mr-1" style={{textDecoration:"none",display:"inline-block"}}></i> Login</button>
													</div>			
											</div>
											<div className="text-center dont-have">Don’t have an account? <a onClick={register}>Register</a></div>

									</div>
								</div>
							</div>
							{/* <!-- /Login Tab Content --> */}
								
						</div>
					</div>

				</div>

			</div>	
    </>
  )
}

export default Body_login
