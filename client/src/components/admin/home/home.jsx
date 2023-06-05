import React, { useEffect } from 'react'
import  Sidenav  from './sidebar/sideNav'
import Nav from '../../user/home/Navbar/Navbar'
import Sidenav2 from './sidebar/sidebar2'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { adminDashboard } from '../../../redux/actions/admin'
import './home.css'
import * as echarts from 'echarts';
import Chart from './charts/blocked'

function AdminHome() {
  const [miniSidebar , setMiniSideBar] = useState(false)
  const [sidebarButton , setSidebarButton] = useState()
  const dashboard = useSelector((state) => state.adminDashboard.data)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(adminDashboard())
  } , [dispatch])

  useEffect(() => {
    // Create the chart instance
    const chart = echarts.init(document.getElementById('user-chart-container'));
    const bookingChart = echarts.init(document.getElementById('bookings-chart-container'));

    // Configure the chart options
    const option = {
      xAxis: {
        type: 'category',
        data: ['Weakly', 'Monthly', 'Yearly']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [dashboard?.data?.weaklyUsers, dashboard?.data?.monthlyUsers, dashboard?.data?.yearlyUsers],
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          }
        }
      ]
    };

    const bookingOption = {
      xAxis: {
        type: 'category',
        data: ['Weakly', 'Monthly', 'Yearly']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [dashboard?.data?.weak, dashboard?.data?.month, dashboard?.data?.year],
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          }
        }
      ]
    };
    chart.setOption(option);
    bookingChart.setOption(bookingOption)
  }, [dashboard?.data?.month, dashboard?.data?.monthlyUsers, dashboard?.data?.weak, dashboard?.data?.weaklyUsers, dashboard?.data?.year, dashboard?.data?.yearlyUsers]);
  console.log(dashboard);
  return (
    <>
    <Nav admin={true}/>
    <div className="d-flex w-100" >
        {
          miniSidebar ? <Sidenav2 
          action={'Dashboard'}
          setSidebarButton={setSidebarButton} 
          sidebarButton={sidebarButton} 
          miniSidebar={miniSidebar} 
          setMiniSideBar={setMiniSideBar}/> 
          : 
          <Sidenav 
          action={'Dashboard'}
          setSidebarButton={setSidebarButton} 
          sidebarButton={sidebarButton}           
          setMiniSideBar={setMiniSideBar} 
          miniSidebar={miniSidebar}/>
        }
        <div className="tab-content admin-tab-content p-2 w-75 mt-5   flex-colomun justify-content-center align-items-start" style={miniSidebar ? parseInt(window.innerWidth) > 585 ? { marginLeft: '8%' } : {marginLeft : '0'} : {}}>
          <div className="col-12 row dashboard ms-5">
            <div class="card col-md-3 col-sm-6 col-12 me-3 shadow rounded" >
              <div class="card-body d-flex justify-content-between">
                <div className="dashboard-image-and-caption d-flex justify-content-center align-items-center flex-column w-100">
                  <span className='image d-flex justify-content-center align-items-center'>
                    <i className="fa-solid fa-user-doctor"></i>
                  </span>
                  <div className="caption w-100 ">
                    <label htmlFor="" className='ms-4'>Doctors</label>
                    <div className="w-100 percentage rounded">
                      <div className="h-100 w-75 bg-info rounded"></div>
                    </div>
                  </div>
                </div>
                <div className="count mt-5 fw-bold">
                  {dashboard?.count?.doctor}
                </div>
              </div>
            </div>

            <div class="card col-md-3 col-sm-6 col-12 me-3 shadow rounded" >
              <div class="card-body d-flex justify-content-center align-items-center">
                <div className="dashboard-image-and-caption d-flex justify-content-center align-items-center flex-column w-100">
                  <span className='image user d-flex justify-content-center align-items-center'>
                    <i className="fa-solid fa-user"></i>
                  </span>
                  <div className="caption w-100 ">
                    <label htmlFor="" className='ms-4'>Patients</label>
                    <div className="w-100 percentage rounded">
                      <div className="h-100 w-75 bg-success rounded"></div>
                    </div>
                  </div>
                </div>
                <div className="count mt- fw-bold">
                  {dashboard?.count?.user}
                </div>
              </div>
            </div>

            <div class="card col-md-3 col-sm-6 col-12 me-3 shadow rounded" >
              <div class="card-body d-flex justify-content-center align-items-center">
                <div className="dashboard-image-and-caption d-flex justify-content-center align-items-center flex-column w-100">
                  <span className='image d-flex border-danger text-danger justify-content-center align-items-center'>
                    <i className="fa-solid fa-calendar-check"></i>
                  </span>
                  <div className="caption w-100 ">
                    <label htmlFor="" className='ms-4'>Appointment</label>
                    <div className="w-100 percentage rounded">
                      <div className="h-100 w-75 bg-danger rounded"></div>
                    </div>
                  </div>
                </div>
                <div className="count mt- fw-bold">
                  {dashboard?.count?.appointment}
                </div>
              </div>
            </div>

            <div class="card col-md-3 col-sm-6 col-12 me-3 shadow rounded" >
              <div class="card-body d-flex justify-content-center align-items-center">
                <div className="dashboard-image-and-caption d-flex justify-content-center align-items-center flex-column w-100">
                  <span className='image d-flex border-warning text-warning justify-content-center align-items-center'>
                    <i className="fa-solid fa-wallet"></i>
                  </span>
                  <div className="caption w-100 ">
                    <label htmlFor="" className='ms-4'>Revenue</label>
                    <div className="w-100 percentage rounded">
                      <div className="h-100 w-75 bg-warning rounded"></div>
                    </div>
                  </div>
                </div>
                <div className="count m-0 fw-bold">
                  ${dashboard?.count?.revenue}
                </div>
              </div>
            </div>

          </div>
          <div className="charts w-100 ms-1 mb-4 col-12 row">
            <div className="users col-md-5  col-12 ms-5 mt-3 shadow" >
              <label className='ms-5 fw-bold my-3 mt-5 mb-0'>Users</label>
              <div id="user-chart-container" className='col-12  ' style={{ height: '400px' }}>

              </div>
            </div>

            <div className="users col-md-5  col-12 ms-5 mt-3 shadow" >
              <label className='ms-5 fw-bold my-3 mt-5 mb-0'>Bookings</label>
              <div id="bookings-chart-container" className='col-12  ' style={{ height: '400px' }}>

              </div>
            </div>

            <div className="users col-md-5  col-12 ms-5 mt-3 shadow" >
              <label className='ms-5 fw-bold my-3 mt-5 mb-0'></label>
              <Chart title={'Active users and non-active users'}
                blocked={dashboard?.data?.blockedUsers} unblocked={dashboard?.data?.unBlockedUsers}
                id={'userBlockedunBlocked'}
              />
            </div>

            <div className="users col-md-5  col-12 ms-5 mt-3 shadow" >
              <label className='ms-5 fw-bold my-3 mt-5 mb-0'></label>
                <Chart title={'Active and non active Doctors'} 
                blocked={dashboard?.data?.blockedDoctors} unblocked={dashboard?.data?.unBlockedDoctors}
                  id={'doctorBlockedunBlocked'}
                />
            </div>
          </div>
      </div>
     
      </div>
      
    </>
  )
}

export default AdminHome
