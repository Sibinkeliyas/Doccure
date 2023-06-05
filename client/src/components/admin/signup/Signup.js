import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { adminRegister } from '../../../redux/actions/admin';
import Nav from '../../user/home/Navbar/Navbar'
import { useNavigate } from 'react-router-dom';
import { loginValidation } from '../../../helpers/validation';

function Body() {
	const [showPassword , setShowPassword] = useState(false);
	const [adminData , setadminData] = useState('')
	const admin = useSelector((state) => state?.adminRegister)
    const [error , setError] = useState()
    
    const navigate = useNavigate()
	useEffect(() => {
		if(admin?.error) {
			toast.error('Something went wrong please check again')
		} else if(admin.data) {
            navigate('/admin/login')
			toast.success('Admin register')
		}
	} , [admin.data,  admin?.error, navigate])
	const dispatch = useDispatch()
	const handleLogin = () => {
        if(!adminData.email || !adminData.password || !adminData.name) loginValidation(adminData , setError) 
        else dispatch(adminRegister(adminData))
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
												<input type="text" name='name' className="form-control floating" onChange={(e) => {
															setadminData({
															...adminData ,
															name : e.target.value
														})
                                                        setError({
                                                            ...error,
                                                            name: false
                                                        })
														}}/>
                                                        
												<div className='d-flex justify-spacebetween w-100'>
                                                    <label className="focus-label">Name</label>
                                                    {
                                                        error?.name && <small className='text-danger '>{error.name}</small>
                                                    }
                                                </div>
											</div>
	
											<div className="form-group form-focus">
												<input type="email" name='email' className="form-control floating" onChange={(e) => {
															setadminData({
															...adminData ,
															email : e.target.value
														})
                                                        setError({
                                                            ...error,
                                                            email: false
                                                        })
														}}/>
                                                       
												<label className="focus-label">Email</label>
                                                        {
                                              error?.email && <small className='text-danger'>{error.email}</small>
                                                        }
											</div>
											<div className="form-group form-focus">
												
													 <input type={showPassword ? 'text' : 'password'} name='password' className="form-control floating" onChange={(e) => {
														setadminData({
															...adminData ,
															password : e.target.value
														})
                                                        setError({
                                                            ...error ,
                                                            password : false
                                                        })
													 }}/>
                                                        
												<div style={{display:"flex" , justifyContent:"space-between"}} className="show-password">
													<label className="focus-label">Password</label>
                                                        {
                                                            error?.password && <small className='text-danger'>{error.password}</small>
                                                        }
													<div className="show-password-check-box mt-2">
														<label className="focus-label me-2">Show Password</label>
														<input type="checkbox" name="" id=""  onClick={(e) => {
															setShowPassword(e.target.checked)
														}}/>
                                                 
													</div>
												</div>
                                          
												
											</div>
											<div className="d-grid gap-2">
                                            <Button size='lg' className=" btn-login " onClick={handleLogin}>Sign Up</Button>
											</div>
											<div className="login-or">
												<span className="-or fw-bold text-dark  me-5" onClick={() => {
                                                        navigate('/admin/login')
                                                }} style={{cursor:'pointer' , marginLeft :'0px'}}> Admin Login</span>
											</div>
											
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
