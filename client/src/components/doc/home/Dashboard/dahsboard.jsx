import { CChart } from '@coreui/react-chartjs'
import React from 'react'
import { Badge } from 'react-bootstrap'
import Pagination from '../../../Pagination/Pagination'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Loading2 from '../../../loading/Loading2'
import { dateFormat } from '../../../../helpers/date';
import {toast , ToastContainer} from 'react-toastify'

function Dashboard({ setFilter, filter, count, appointments , changeStatus , loading , open }) {

  const handleChange = (event) => {
    setFilter({
      ...filter , 
      appointmentStatus: event.target.value
    });
  };
  return (
    <div className='doc-home-dashboard my-4 ms-5 me-2' style={open === false ? {width:'95%'} : open === true ? {display : 'none'} : {}}>
        <ToastContainer />
      <div className="doc-home-dashboard-head">
        {
         loading && <Loading2 />
        } 
        <div className="doc-home-dashboard-head-1 shadow">
          <CChart
            type="doughnut"
            style={{ width: '100px' ,showTooltips: false, }}
            data={{
              datasets: [
                {
                  backgroundColor: ['#41B883', '#e5e5e5'],
                  data: [(1 / count?.totalPatients === 0 ? 1 : count?.totalPatients) * 100, (100 - (1 / count?.totalPatients === 0 ? 1 : count?.totalPatients) * 100)],
                },
              ],
            }}
          />
          <div>
            <h5>Total Patients</h5>
            <p>{ count?.totalPatients }</p>
            <p>Till Now</p>
          </div>
        </div>
        <div className="doc-home-dashboard-head-1 shadow">
          <CChart
            type="doughnut"
            style={{ width: '100px', showTooltips: false, }}
            data={{
              datasets: [
                {
                  backgroundColor: ['#da3f81', '#e5e5e5'],
                  data: [(1 / count?.todaysPatients === 0 ? 1 : count?.todaysPatients) * 100, (100 - (1 / count?.todaysPatients === 0 ? 1 : count?.todaysPatients) * 100)],
                },
              ],
            }}
          />
          <div>
            <h5>Today Patient</h5>
            <p>{ count?.todaysPatients }</p>
            {/* <p>6 ,Nov 2023</p> */}
          </div>
        </div>
        <div className="doc-home-dashboard-head-1 shadow">
          <CChart
            type="doughnut"
            style={{ width: '100px', showTooltips: false, }}
            data={{
              datasets: [
                {
                  backgroundColor: ['#1b5a90', '#e5e5e5'],
                  data: [(1 / count?.appointmets === 0 ? 1 : count?.appointmets) * 100, (100 - (1 / count?.appointmets === 0 ? 1 : count?.appointmets) * 100)],
                },
              ],
            }}
          />
          <div>
            <h5>Total Appointments</h5>
            <p>{count?.appointmets }</p>
            {/* <p>6 ,Nov 2023</p> */}
          </div>
        </div>
      </div>
      
      <div className="doc-table-div ms-3 mt-5">
        <h5>Patient Appoitments</h5>
        <div className="tab-content p-2">

          {/* <!-- Appointment Tab --> */}
          <div id="pat_appointments" className="tab-pane fade show active shadow rounded">
            <div className="card card-table mb-0">
              {/* <div className="row col-12">
                <div className="filter m-4 col-1 ">
                  <button className='btn btn-bg-info btn-info text-white px-4'>Today</button>
                </div>
                <div className="filter m-4  col-1">
                  <button className='btn btn-bg-info btn-info text-white px-1'>Upcomming</button>
                </div>
              </div> */}
            <div className="filter m-4  row col-12">
              
                <div className="doc-filter-status col-8">
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} className=''>
                    <InputLabel id="demo-simple-select-standard-label">Status</InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={filter.appointmentStatus}
                      onChange={handleChange}
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
              </div>
              
                <div className="doc-filter search col-3" style={{float :'right'}}>
                  <input type="text" name="" id="" className='form-control  mt-3' placeholder='&#xf002;Search' style={{ fontFamily:'Arial, FontAwesome'}} 
                    onChange={(e) => {
                      setFilter({
                        ...filter ,
                        search : e.target.value
                      })
                    } }
                  />
                </div>
            </div>
            <hr />
              <div className="card-body w-100">
                <div className="table-responsive">
                  <table className="table table-hover table-center mb-0">
                    <thead>
                      <tr>
                        <th>Patient</th>
                        <th>Appt Date</th>
                        <th>Booking Date</th>
                        <th>Type</th>
                        <th>Paid Amount</th>
                        <th>Status</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      
                      {
                        appointments?.map((appointment) => {
                          return (
                            <tr>
                              <td>
                                <h2 className="table-avatar">
                                  <a className="avatar avatar-sm mr-2">
                                    <img className="avatar-img rounded-circle" src={appointment.picture ? appointment.picture : require('../../../../assets/default Profile.webp')} alt="UserImage" />
                                  </a>
                                  <a className='ms-2'> { appointment.userData[0].name } <span>Dental</span></a>
                                </h2>
                              </td>
                              <td> {dateFormat(new Date(appointment.date))} <span className="d-block text-info">{appointment.time.startingTime}</span></td>
                              <td> <Badge bg='secondary' >{appointment.orderDate}</Badge> </td>
                              <td>New patient</td>
                              <td> {appointment.totalAmount} $</td>
                              
                              <td><Badge color='success' bg={appointment.appointmentStatus === 'accepted' 
                              ? 'success' : appointment.appointmentStatus === 'canceled' 
                                  ? 'danger' : 'warning'}> {appointment.appointmentStatus} </Badge></td>
                              <td className="text-right">
                                <div className="table-action">
                                  <a className="btn btn-sm bg-success-light bg-light text-success me-2" onClick={() => {
                                    if(appointment.appointmentStatus === 'canceled') {
                                      toast.error('Cannot change the status')
                                    } else {
                                      changeStatus('accepted' , appointment._id , true)
                                    }
                                  }}>
                                    <i className="fa-solid fa-check" style={{fontSize:'15px'}}></i> Accept
                                  </a>
                                  <a className="btn btn-sm bg-danger-light bg-light text-danger" onClick={() => {
                                     if(appointment.appointmentStatus === 'canceled') {
                                      toast.error('Cannot change the status')
                                    } else {
                                    changeStatus('canceled' , appointment._id)
                                    }
                                  }}>
                                    <i className="fa-solid fa-trash"></i> Cancel
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
          </div>

          <div className="doc-pagination mt-3">
            <Pagination setFilter={setFilter} filter={filter} />
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default Dashboard
