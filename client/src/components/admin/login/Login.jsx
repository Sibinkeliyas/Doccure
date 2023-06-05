import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { adminLogin } from '../../../redux/actions/admin';
import Nav from '../../user/home/Navbar/Navbar'
import { useNavigate } from 'react-router-dom';

function Body() {
	const [showPassword , setShowPassword] = useState(false);
	const [adminData , setadminData] = useState('')
	const admin = useSelector((state) => state?.adminLogin)
    const navigate = useNavigate()
	useEffect(() => {
		if(admin?.error) {
			toast.error(admin.error)
		} else if(admin.data) {
			toast.success('Admin logined')
		}
	} , [admin.data, admin.err, admin.error])
	const dispatch = useDispatch()
	const handleLogin = () => {
		dispatch(adminLogin(adminData))
	}
  return (
   <>
   <Nav admin={true}/>
   <div className="content mt-5 mb-5">
			<ToastContainer />
				<div className="container-fluid">
					
					<div className="row">
						<div className="col-md-8 offset-md-2">
							
							{/* <!-- Login Tab Content --> */}
							<div className="account-content">
								<div className="row align-items-center justify-content-center">
									<div className="col-md-7 col-lg-6 login-left">
										<img src={require('../../assets/img/login-banner.png')} className="img-fluid mt-5 mb-5" alt="Doccure Login" />	
									</div>
									<div className="col-md-12 col-lg-6 login-right">
										
										{
								
											<div className="login-header">
											
											<h3>Login <span>Doccure</span></h3>
										</div>
											}
	
											<div className="form-group form-focus">
												<input type="email" name='email' className="form-control floating" onChange={(e) => {
															setadminData({
															...adminData ,
															email : e.target.value
														})
														}}/>
												<label className="focus-label">Email</label>
											</div>
											<div className="form-group form-focus">
												{
													 <input type={showPassword ? 'text' : 'password'} name='password' className="form-control floating" onChange={(e) => {
														setadminData({
															...adminData ,
															password : e.target.value
														})
													 }}/>
												}
													
												<div style={{display:"flex" , justifyContent:"space-between"}} className="show-password">
													<label className="focus-label">Password</label>
													<div className="show-password-check-box mt-2">
														<label className="focus-label me-2">Show Password</label>
														<input type="checkbox" name="" id=""  onClick={(e) => {
															setShowPassword(e.target.checked)
														}}/>
													</div>
												</div>
												
											</div>
											{/* <div className="text-right">
												<a className="forgot-link" >Forgot Password ?</a>
											</div> */}
											<div className="d-grid gap-2">
											{/* {
												loading ?<Loading></Loading> : 
												<Button size='lg' className=" btn-login " >Login</Button>
											} */}
                                            <Button size='lg' className=" btn-login " onClick={handleLogin}>Login</Button>
											</div>
											<div className="login-or">
												<span className="span fw-bold text-dark  me-5" onClick={() => {
                                                        navigate('/admin/signup')
                                                }} style={{cursor:'pointer' , marginLeft :'0px'}}> Admin SignUp</span>
											</div>
											{/* <div className="google-login-div">
													<div className="col-12">
														<button className="btn-google" ><i className="fab fa-google mr-1" style={{textDecoration:"none",display:"inline-block"}}></i> Login</button>
													</div>			
											</div> */}
											
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

export default Body
