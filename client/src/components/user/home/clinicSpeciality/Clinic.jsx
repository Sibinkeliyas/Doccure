import React from 'react'
import './clinic.css'

function Clinic() {
  return (
   <>
    <section className="section section-specialities">
				<div className="container-fluid">
					<div className="section-header text-center">
						<h2>Clinic and Specialities</h2>
						<p className="sub-title">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
					</div>
					<div className="clinic-speciality">
						
							<div className="user-favourite-div- row" style={{justifyContent:"center"}}>
							<div className="favourote-card  col-md-6 col-lg-3  mb-3 me-4 card   " style={{width:'200px',height:'264px' , }}>
                                <div className="favourite-card-body-items-div" style={{width: "100%" ,height:'100%'}}>
                                    <div className="favourite-card-body-items mt-5 speciality-image-div">
										<img src={require('../../../assets/img/specialities/specialities-01.png')} className="" alt="Speciality" />
                                    </div>
                                    
                                    <div className="card-body">
                                        <h5 className="card-title">Ruby Perrin</h5>
                                    </div>
                              </div>
                            </div>

							<div className="favourote-card  col-md-6 col-lg-3  mb-3 me-4 card   " style={{width:'200px',height:'264px' , }}>
                                <div className="favourite-card-body-items-div" style={{width: "100%" ,height:'100%'}}>
                                    <div className="favourite-card-body-items mt-5 speciality-image-div">
										<img src={require('../../../assets/img/specialities/specialities-02.png')} className="" alt="Speciality" />
                                    </div>
                                    
                                    <div className="card-body">
                                        <h5 className="card-title">Ruby Perrin</h5>
                                    </div>
                              </div>
                            </div>


							<div className="favourote-card  col-md-6 col-lg-3  mb-3 me-4 card   " style={{width:'200px',height:'264px' , }}>
                                <div className="favourite-card-body-items-div" style={{width: "100%" ,height:'100%'}}>
                                    <div className="favourite-card-body-items mt-5 speciality-image-div">
										<img src={require('../../../assets/img/specialities/specialities-03.png')} className="" alt="Speciality" />
                                    </div>
                                    
                                    <div className="card-body">
                                        <h5 className="card-title">Ruby Perrin</h5>
                                    </div>
                              </div>
                            </div>


							<div className="favourote-card  col-md-6 col-lg-3  mb-3 me-4 card   " style={{width:'200px',height:'264px' , }}>
                                <div className="favourite-card-body-items-div" style={{width: "100%" ,height:'100%'}}>
                                    <div className="favourite-card-body-items mt-5 speciality-image-div">
										<img src={require('../../../assets/img/specialities/specialities-04.png')}  alt="Speciality" />
                                    </div>
                                    
                                    <div className="card-body">
                                        <h5 className="card-title">Ruby Perrin</h5>
                                    </div>
                              </div>
                            </div>

							<div className="favourote-card  col-md-6 col-lg-3  mb-3 me-4 card   " style={{width:'200px',height:'264px' , }}>
                                <div className="favourite-card-body-items-div" style={{width: "100%" ,height:'100%'}}>
                                    <div className="favourite-card-body-items mt-5 speciality-image-div">
										<img src={require('../../../assets/img/specialities/specialities-05.png')} className="" alt="Speciality" />
                                    </div>
                                    
                                    <div className="card-body">
                                        <h5 className="card-title">Ruby Perrin</h5>
                                    </div>
                              </div>
                            </div>


                            
                      </div>      


						{/* </div> */}
					</div>
				</div>   
			</section>	 
   </>
  )
}

export default Clinic
