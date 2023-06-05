import React, { useEffect, useState } from 'react'
import './Register.css'
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Loading from '../../../loading/Loading'

import {useDispatch , useSelector} from 'react-redux'
import { userRegister } from '../../../../redux/actions/user';

function Register_user() {
	const navigate = useNavigate()
	const haveAccount = () => {
			navigate('/user_login')
	}

	const [password , setPassword] = useState()
	const [passwordCheck , setPasswordCheck] = useState()
	const [name , setName] = useState('')
	const [email , setEmail] = useState('')
	const [phone , setPhone] = useState('')
	// warning
	const [alert , setAlert] = useState(false)
	// to show password
	const showPassword = (e) => {
		setPasswordCheck(e.target.checked)
	}
	//  to check wheather he is register or not 
	const state = useSelector((state) => state.userLogin)
	// redux
	const dispatch = useDispatch()
	// to submit login
	const handleRegister = (name , email , password , phone) => {
		dispatch(userRegister(name , email , password , phone))
			if(state.emailStatus === true) {
				setAlert(true)
			} else {
				navigate('/user_login')  
			}
	}

  return (
   <>
        <div className="content mt-5 mb-5">
			
				<div className="container-fluid">
					
					<div className="row">
						<div className="col-md-8 offset-md-2">
								
							{/* <!-- Register Content --> */}
							<div className="account-content">
								<div className="row align-items-center justify-content-center">
									<div className="col-md-7 col-lg-6 login-left">
										<img src={require('../../../assets/img/login-banner.png')} className="img-fluid mt-5 mb-5" alt="Doccure Register" />	
									</div>
									<div className="col-md-12 col-lg-6 login-right">
										{/* alert or title for register page*/}
										{
										alert ? <div className="warnig-div alert alert-danger alert-dismissible fade show" role="alert">
													<div><strong>Error!</strong> Already Registerd account</div>
														<div style={{float:'right',display:'flex',justifyContent:'end'}}>
															<button type="button" className=" btn bg-danger-light  text-danger"  data-dismiss="alert" aria-label="Close" onClick={() => {
																setAlert(false)
															}}>
																<span aria-hidden="true">&times;</span>
															</button>
														</div>
												</div> : 
												<div className="login-header">
													<h3>Patient Register <a href="doctor-register.html">Are you a Doctor?</a></h3>
												</div>
											}
										{/* alert or title for register page*/}
										
										{/* <!-- Register Form --> */}
										<form action="">
											<div className="form-group form-focus">
												<input type="text" className="form-control floating" onChange={(e) => {
													setName(e.target.value)
												}}/>
												<label className="focus-label">Name</label>
											</div>
											<div className="form-group form-focus">
												<input type="email" className="form-control floating" onChange={(e) => {
													setPhone(e.target.value)
												}}/>
												<label className="focus-label">Mobile</label>
											</div>
											<div className="form-group form-focus">
												<input type="text" className="form-control floating" onChange={(e) => {
													setEmail(e.target.value)
												}}/>
												<label className="focus-label">Email</label>
											</div>
											<div className="form-group form-focus">
												{
												<input type={passwordCheck ? 'text' : 'password'} name='password' onChange={(e) => {
													setPassword(e.target.value)
												}} className="form-control floating" />
												}
													
												<div className="show-password">
													<label className="focus-label">Password</label>
													<div className="show-password-check-box mt-2">
														<label className="focus-label me-2">Show Password</label>
														<input type="checkbox" name="" id="" onChange={(e) => {
															// setPasswordCheck(e.target.value)
														}} onClick={(e) => {
															showPassword(e)
														}}/>
													</div>
												</div>
												
											</div>
											<div className="text-right">
												<a className="forgot-link" onClick={() => {
													haveAccount()
												}}>Already have an account?</a>
											</div>
											<div className="d-grid gap-2">
											{
												state.loading ? <Loading></Loading> : <Button size='lg' className=" btn-login " onClick={() => {
													handleRegister(name , email , password , phone)
												}}>Sign-Up</Button>
											}
											
											</div>
											
										</form>
										{/* <!-- /Register Form --> */}
										
									</div>
								</div>
							</div>
							{/* <!-- /Register Content --> */}
								
						</div>
					</div>

				</div>

			</div>	
   </>
  )
}

export default Register_user
