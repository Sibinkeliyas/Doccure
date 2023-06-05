import React, { useEffect, useState } from 'react'
import './body.css'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { userGoogleLogin } from '../../../../redux/actions/user';
import { useNavigate } from 'react-router-dom';

function Body() {

	const user = useSelector((state) => state.userLogin.data)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	



  return (
   <>
      <section className="section section-search">
				<div className="container-fluid">
					<div className="banner-wrapper">
						<div className="banner-header text-center">
							<h1>Search Doctor, Make an Appointment</h1>
							<p>Discover the best doctors, clinic & hospital the city nearest to you.</p>
						</div>
                         
					
						<div className="search-box">
							
						</div>
					
						
					</div>
				</div>
			</section>
   </>
  )
}

export default Body
