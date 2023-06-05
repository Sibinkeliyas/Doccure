import React from 'react'
import '../../../user/doctors/doctor_search.css'

function Doctor_navbar({header ,  openHandler , showButton , setOption}) {
  return (
    <>
        <div className="breadcrumb-bar">
				<div className="ms-5">
					<div className="row align-items-center">
						<div className="col-md-8 col-12 w-100">
							<nav aria-label="breadcrumb" className="page-breadcrumb">
								<ol className="breadcrumb">
									<li className="breadcrumb-item"><a href="" onClick={(e) => {
										e.preventDefault()
										setOption('Dashboard')
									}}>Home</a></li>
									<li className="breadcrumb-item active" aria-current="page">{header}</li>
								</ol>
							</nav>
						 <div className="w-100 d-flex justify-content-between">
							  <div className='col-6'><h2 className="breadcrumb-title ">{header}</h2></div>
							  {
								  showButton && <button className='me-5 sideNavbar-button btn text-white border-0 ' ><i className="fa-solid fa-bars" onClick={openHandler}></i></button>
							  }
						  </div>
						  <div className="col-md-4 col-12 d-md-block ">
						 </div>
						  
						</div>
					</div>
				</div>
			</div>
    </>
  )
}

export default Doctor_navbar
