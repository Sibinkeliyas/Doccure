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
	
    useEffect( 
        () => {
            if (user && user.access_token !== undefined) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
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
        []
    );


  return (
   <>
      <section class="section section-search">
				<div class="container-fluid">
					<div class="banner-wrapper">
						<div class="banner-header text-center">
							<h1>Search Doctor, Make an Appointment</h1>
							<p>Discover the best doctors, clinic & hospital the city nearest to you.</p>
						</div>
                         
					
						<div class="search-box">
							
						</div>
					
						
					</div>
				</div>
			</section>
   </>
  )
}

export default Body
