/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Badge } from 'react-bootstrap'
import Nav from '../../../user/home/Navbar/Navbar'
import Sidebar from '../sidebar/sideNav'
import Sidebar2 from '../sidebar/sidebar2'
import { useState } from 'react'
import Pagination from '../../../Pagination/Pagination'
import '../home.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {   adminFindAppointments,  } from '../../../../redux/actions/admin'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useNavigate } from 'react-router-dom'

function Appointment() {
    const navigate = useNavigate()
    const [filter , setFilter] = useState({
        page : 1 ,
        perPage : 5 ,
        count : 0 ,
        doctorSearch : '' ,
        userSearch : '' ,
        appointmentStatus : 'accepted'
    })
    const dispatch = useDispatch()
    const [miniSidebar , setMiniSideBar] = useState(false)
    const [sidebarButton , setSidebarButton] = useState()
    const appointments = useSelector((state) => state.adminFindAppointments?.data?.data)
    console.log(appointments);

    useEffect(() => {
        dispatch(adminFindAppointments(filter))
    }, [dispatch, filter.perPage, filter.page, filter.doctorSearch, filter.userSearch , filter.appointmentStatus , filter.payment])

    useEffect(() => {
        setFilter({
            ...filter ,
            count : appointments?.count
        })
    } , [ appointments ])

    const handleAppointmentstatus = (val) => {
        setFilter({
            ...filter ,
            appointmentStatus : val.target.value
        })
    }

    const handlePayement = (val) => {
        setFilter({
            ...filter ,
            payment : val.target.value
        })
    }
   
   return (
    <>
        <Nav admin={true} />
        <div className="d-flex w-100" >

                   {
                        miniSidebar ? <Sidebar2 
                            action = 'Appointmets'
                            setSidebarButton={setSidebarButton} 
                            sidebarButton={sidebarButton} 
                            miniSidebar={miniSidebar} 
                            setMiniSideBar={setMiniSideBar}/> 
                        : 
                        <Sidebar 
                            action = 'Appointmets'
                            setSidebarButton={setSidebarButton} 
                            sidebarButton={sidebarButton}           
                            setMiniSideBar={setMiniSideBar} 
                            miniSidebar={miniSidebar}/>
                        }
              <div className="tab-content admin-tab-content p-2  mt-5" style={miniSidebar ? {marginLeft:'8%'} : {}}>
                  {/* <!-- Appointment Tab --> */}
                  <div className="card card-table mb-0 shadow ms-5 w-100 rounded fade show ">
                      <div className="filter mx-2  row col-12 ">
              
                                <div className="doc-filter-status  col-md-6 col-12 row">
                               <div className="form-input col-md-6 mt-4 col-sm-8 col-12">
                                        <input type="text" className=' form-control ' placeholder='Search doctor' onChange={(e) => {
                                            setFilter({
                                                ...filter ,
                                                doctorSearch : e.target.value
                                            })
                                        }}/>
                                    </div>

                               <div className="form-input col-md-6 mt-4 col-sm-8 col-12">
                                        <input type="text" className=' form-control ' placeholder='Search user' onChange={(e) => {
                                            setFilter({
                                                ...filter ,
                                                userSearch : e.target.value
                                            })
                                        }}/>
                                    </div>
                            </div>
                            
                           <div className="oc-filter-status col-md-6 col-12 row" style={{float :'right'}}>
                               <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} className='form-input col-md-5 col-sm-8 col-12'>
                                   <InputLabel id="demo-simple-select-standard-label">Status</InputLabel>
                                   <Select
                                       labelId="demo-simple-select-standard-label"
                                       id="demo-simple-select-standard"
                                       value={filter.appointmentStatus}
                                       onChange={handleAppointmentstatus}
                                       label="Age"
                                       placeholder=''
                                   >
                                       <MenuItem value="">
                                           <em>All</em>
                                       </MenuItem>
                                       <MenuItem value={'accepted'}>Accepted</MenuItem>
                                       <MenuItem value={'canceled'}>Caneled</MenuItem>
                                       <MenuItem value={'pending'}>Pending</MenuItem>
                                   </Select>
                               </FormControl>

                               <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} className='form-input col-md-5 col-sm-8 col-12'>
                                   <InputLabel id="demo-simple-select-standard-label">Payment</InputLabel>
                                   <Select
                                       labelId="demo-simple-select-standard-label"
                                       id="demo-simple-select-standard"
                                       value={filter.appointmentStatus}
                                       onChange={handlePayement}
                                       label="Age"
                                       placeholder=''
                                   >
                                       <MenuItem value="">
                                           <em>All</em>
                                       </MenuItem>
                                       <MenuItem value={'direct'}>Direct</MenuItem>
                                       <MenuItem value={'card'}>Card</MenuItem>
                                       <MenuItem value={'wallet'}>Wallet</MenuItem>
                                   </Select>
                               </FormControl>
                            </div>
                          </div>
                      <hr />
                      <div className="card-body w-100">
                          <div className="table-responsive">
                              <table className="table table-hover table-center mb-0">
                                  <thead>
                                      <tr>
                                      <th>Id</th>
                                          <th>Doctor</th>
                                          <th>Patient</th>
                                          <th>Amount</th>
                                          <th>Appt Date</th>
                                          <th>Payment</th>
                                          <th>Status</th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                      {
                                          appointments?.data?.map((report) => {
                                            return(
                                                <tr>
                                                <td>#{report._id.substr(0,4)}</td>
                                                    <td>
                                                        <h2 className="table-avatar">
                                                            <a className="avatar avatar-sm mr-2">
                                                                <img className="avatar-img rounded-circle" src={report.doctorData[0].picture ? `${process.env.REACT_APP_BACKEND_URL}/${report.doctorData[0].picture}` : require('../../../../assets/default Profile.webp')} alt="UserImage" style={{height :'48px'}}/>
                                                            </a>
                                                            <a className='ms-2 fw-bold'>{report.doctorData[0].doctorName} </a>
                                                        </h2>
                                                    </td>
                                                    <td>
                                                        <h2 className="table-avatar">
                                                            <a className="avatar avatar-sm mr-2">
                                                                <img className="avatar-img rounded-circle" src={report.userData[0].picture ? report.userData[0].picture : require('../../../../assets/default Profile.webp')} alt="UserImage" style={{height :'48px'}}/>
                                                            </a>
                                                            <a className='ms-2 fw-bold'>{report.userData[0].name} {report.userData[0].lastName}</a>
                                                        </h2>
                                                    </td>
                                                    <td>{report.totalAmount} $</td>
                                                    <td><Badge bg='secondary' >{report.orderDate}</Badge></td>
                                                    <td>{report.paymentMethod}</td>
                                                    <td><Badge bg={report.appointmentStatus === 'accepted' ? 'success' : report.appointmentStatus === 'canceled' ? 'danger' : 'warning'} >{report.appointmentStatus}</Badge></td>
                                                    <td className="text-right">
                                                        <div className="table-action">
                                                            <a className="btn btn-sm bg-info-light bg-light text-info me-2" onClick={() => {
                                                                navigate('/view-invoice' , {state : {orderId : report._id}})
                                                            }}>
                                                                <i className="fas fa-print"></i> Print
                                                            </a>
                                                        </div>
                                                    </td> 
                                                </tr>
                                            )
                                        })
                                      }
                                  </tbody>
                              </table>
                          </div>
                      </div>
                  </div>
                  <div className="doc-pagination mt-3">
                      <Pagination setFilter={setFilter} filter={filter} />
                  </div>
              </div>
        </div>
       
        
      
        
      {/* </div> */}
    
    </>
  )
}

export default Appointment
