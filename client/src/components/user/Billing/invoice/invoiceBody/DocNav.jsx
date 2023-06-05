import React from 'react'
import '../../../doctors/doctor_search.css'

function DocNav() {
  return (
    <>
               <div className="breadcrumb-bar">
				<div className="ms-5">
					<div className="row align-items-center">
						<div className="col-md-8 col-12">
							<nav aria-label="breadcrumb" className="page-breadcrumb">
								<ol className="breadcrumb">
									<li className="breadcrumb-item"><a href="index-2.html">Home</a></li>
									<li className="breadcrumb-item active" aria-current="page">Invoice</li>
								</ol>
							</nav>
							<h2 className="breadcrumb-title">Invoice</h2>
						</div>
						<div className="col-md-4 col-12 d-md-block d-none">

						</div>
					</div>
				</div>
			</div>
    </>
  )
}

export default DocNav
