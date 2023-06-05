import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { docLogin } from '../../../../redux/actions/doctor';
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';

function Body() {
	const [showPassword , setShowPassword] = useState(false);
	const [docData , setDocData] = useState('')
	const doctorData = useSelector((state) => state?.doctorLogin)
	useEffect(() => {
		if(doctorData?.err) {
			toast.error(doctorData.err)
		} else if(doctorData.data) {
			toast.success('Doctor logined')
		}
	} , [doctorData?.data, doctorData?.err])
	const dispatch = useDispatch()
	const handleLogin = () => {
		dispatch(docLogin(docData))
	}
  return (
   <>
   <div className="content mt-5 mb-5">
			<ToastContainer />
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
										// <div className="warnig-div alert alert-danger alert-dismissible fade show" role="alert">
										// 			<div><strong className='me-3'>Error!</strong>{error}</div>
										// 				<div style={{float:'right',display:'flex',justifyContent:'end'}}>
										// 					<button type="button" className=" btn bg-danger-light  text-danger"  data-dismiss="alert" aria-label="Close" onClick={() => {
										// 						setAlert(false)
										// 					}}>
										// 						<span aria-hidden="true">&times;</span>
										// 					</button>
										// 				</div>
										// 		</div>
                                        //          : 
											<div className="login-header">
											
											<h3>Login <span>Doccure</span></h3>
										</div>
											}
	
											<div className="form-group form-focus">
												<input type="email" name='email' className="form-control floating" onChange={(e) => {
															setDocData({
															...docData ,
															email : e.target.value
														})
														}}/>
												<label className="focus-label">Email</label>
											</div>
											<div className="form-group form-focus">
												{
													 <input type={showPassword ? 'text' : 'password'} name='password' className="form-control floating" onChange={(e) => {
														setDocData({
															...docData ,
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
												<span className="or-line"></span>
												<span className="span-or">or</span>
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
