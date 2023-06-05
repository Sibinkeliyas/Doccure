import React from 'react'
import './footer.css'

function Footer() {
  return (
        <>
        <footer className="footer">
            <div className="footer-top">
					<div className="container-fluid">
						<div className="row">
							<div className="col-lg-3 col-md-6">
							
								{/* Footer Widget */}
								<div className="footer-widget footer-about">
									<div className="footer-logo">
										<img src={require('../../../assets/img/footer-logo.png')} alt="logo" />
									</div>
									<div className="footer-about-content">
										<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
										<div className="social-icon">
											<ul>
												<li>
													<a href='/' target="_blank"><i className="fab fa-facebook-f"></i> </a>
												</li>
												<li>
													<a href='/' target="_blank"><i className="fab fa-twitter"></i> </a>
												</li>
												<li>
													<a href='/' target="_blank"><i className="fab fa-linkedin-in"></i></a>
												</li>
												<li>
													<a href='/' target="_blank"><i className="fab fa-instagram"></i></a>
												</li>
												<li>
													<a href='/' target="_blank"><i className="fab fa-dribbble"></i> </a>
												</li>
											</ul>
										</div>
									</div>
								</div>
								{/* /Footer Widget */}
								
							</div>
							
							<div className="col-lg-3 col-md-6">
							
								{/* Footer Widget  */}
								<div className="footer-widget footer-menu">
									<h2 className="footer-title">For Patients</h2>
									<ul>
										<li><a href='/'><i className="fas fa-angle-double-right"></i> Search for Doctors</a></li>
										<li><a href='/'><i className="fas fa-angle-double-right"></i> Login</a></li>
										<li><a href='/'><i className="fas fa-angle-double-right"></i> Register</a></li>
										<li><a href='/'><i className="fas fa-angle-double-right"></i> Booking</a></li>
										<li><a href='/'><i className="fas fa-angle-double-right"></i> Patient Dashboard</a></li>
									</ul>
								</div>
								{/* /Footer Widget  */}
								
							</div>
							
							<div className="col-lg-3 col-md-6">
							
								 {/* Footer Widget  */}
								<div className="footer-widget footer-menu">
									<h2 className="footer-title">For Doctors</h2>
									<ul>
										<li><a href='/'><i className="fas fa-angle-double-right"></i> Appointments</a></li>
										<li><a href='/'><i className="fas fa-angle-double-right"></i> Chat</a></li>
										<li><a href='/'><i className="fas fa-angle-double-right"></i> Login</a></li>
										<li><a href='/'><i className="fas fa-angle-double-right"></i> Register</a></li>
										<li><a href='/'><i className="fas fa-angle-double-right"></i> Doctor Dashboard</a></li>
									</ul>
								</div>
								 {/* /Footer Widget */}
								
							</div>
							
							<div className="col-lg-3 col-md-6">
							
								{/* Footer Widget  */}
								<div className="footer-widget footer-contact">
									<h2 className="footer-title">Contact Us</h2>
									<div className="footer-contact-info">
										<div className="footer-address">
											<span><i className="fas fa-map-marker-alt"></i></span>
											<p> 3556  Beech Street, San Francisco,<br /> California, CA 94108 </p>
										</div>
										<p>
											<i className="fas fa-phone-alt"></i>
											+1 315 369 5943
										</p>
										<p className="mb-0">
											<i className="fas fa-envelope"></i>
											doccure@example.com
										</p>
									</div>
								</div>
								 {/* /Footer Widget  */}
								
							</div>
							
						</div>
					</div>
				</div>
                </footer>
        </>
  )
}

export default Footer
