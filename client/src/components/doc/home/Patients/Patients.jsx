import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import Loading2 from '../../../loading/Loading2';

function Patients({ setLoadMore, patients, loadMore , loading ,open }) {
    // Get the button:
    let mybutton = document.getElementById("backToTop");

    window.onscroll = function () { scrollFunction() };

    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            mybutton.style.display = "block";
        } else {
            if(mybutton.style)
             mybutton.style.display = "none";
        }
    }

    // When the user clicks on the button, scroll to the top of the document
    function topFunction() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }
    console.log(patients);
  return (
    <div className='doc-patients-page doc-home-dashboard my-4 ms-5 me-2' style={open === false ? {width:'95%'} : open === true ? {display : 'none'} : {}}>
        <ToastContainer />
        {
            loading && <Loading2 />
        }
          <div className="filter px-3 col-12 me-5 pe-5 row">
              <div className="form-group mb-2 me-3 col-md-3 col-sm-9 col-4">
                  <input type="text"  className="form-control mt-4 col-md-3 col-sm-1 shadow" placeholder='Seach...' onChange={(e) => {
                    setLoadMore({
                        ...loadMore , 
                        search : e.target.value
                    })
                  }}/>
              </div>
              <div className="form-group  mb-2 me-3 col-md-3 col-9">
                  <label for="inputPassword2" className="">From</label>
                  <input type="date" className="form-control shadow" id="inputPassword2" placeholder="" onChange={(e) => {
                      if (new Date(e.target.value) > new Date(loadMore.to) && loadMore.to !== undefined) {
                          toast.error('From date cannot be greater than To date')
                      } else {
                          setLoadMore({
                              ...loadMore,
                              from: e.target.value
                          })
                      }
                  }} />
              </div>
              <div className="form-group  mb-2 me-3 col-md-3 col-9">
                  <label for="inputPassword2" className="">To</label>
                  <input type="date" className="form-control shadow me-3" id="inputPassword2" placeholder="" onChange={(e) => {
                      if(new Date(e.target.value) < new Date(loadMore.from) && loadMore.from !== undefined) {
                        toast.error('To date cannot be less than From date')
                      } else {
                          setLoadMore({
                              ...loadMore,
                              to: e.target.value
                          })
                      }
                  }} />
              </div>
            </div>
          <div div className="row col-12 ms-5" >
            {
                patients?.data?.map((patient) => {
                    return (
                        
                            <div className="card doc-patint-details col-3 m-3  shadow" style={{ width: '18rem' }}>
                                <div className="doc-patient-image">
                                <img className="card-img-top mt-5 " src={patient.userData[0].picture ? patient.userData[0].picture : require('../../../assets/img/default/profile.webp') } alt="Card image cap" />
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">{patient.userData[0].name}</h5>
                                    <h6 className="card-title">Patient ID : {patient._id.substr(8, 4)}</h6>
                                    <p className="card-text"><i className="fa-solid fa-location-dot me-2"></i>kerala</p>
                                    <hr />
                                    <ul className="list-group list-group-flush">
                                        <div>
                                            <p className='font-weight-bold'>Phone</p>
                                            <p >{patient.userData[0].phone}</p>
                                        </div>
                                        <div>
                                            <p className='font-weight-bold'> Age</p>
                                            <p>{patient.userData[0].dob ? patient.userData[0].dob : 'none'}</p>
                                        </div>
                                        <div>
                                            <p className='font-weight-bold'>Blood Group</p>
                                            <p>{patient.userData[0].bloodGroup ? patient.userData[0].bloodGroup : 'none'}</p>
                                        </div>
                                    </ul>
                                </div>
                            </div>
                     
                    )
                })
            }
        </div>
            <div className="bottom-things">
              <div className="loadmore">
                  {
                      patients?.count <= loadMore.perPage ?
                          ''

                          :
                          <button className='btn shadow' onClick={() => {
                              setLoadMore({
                                  ...loadMore,
                                  perPage: loadMore.perPage + 9
                              })
                          }}>Load More</button>
                  }
              </div>
              <div className="backToTp me-3">
                  <button onClick={topFunction} id="backToTop" className='btn shadow me-5' title="Go to top"><i className="fa-sharp fa-solid fa-jet-fighter-up"></i></button>
              </div>
            </div>
         
    </div>
  )
}

export default Patients
