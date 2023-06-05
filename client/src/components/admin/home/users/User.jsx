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
import { adminBlockUser, adminFindUsers } from '../../../../redux/actions/admin'
import ReactSwitch from 'react-switch'

function User() {
    const [filter , setFilter] = useState({
        page : 1 ,
        perPage : 10 ,
        count : 0 ,
        search : ''
    })
    const dispatch = useDispatch()
    const [miniSidebar , setMiniSideBar] = useState(false)
    const [sidebarButton , setSidebarButton] = useState()
    const [userState , setUserState] = useState()
    const userData = useSelector((state) => state.adminFindUsers.data)
    useEffect(() => {
        dispatch(adminFindUsers(filter))
    } , [dispatch, filter.perPage , filter.page , filter.search])
    useEffect(() => {
        if (userData?.data?.length !== 0) {
            setUserState(userData?.data)
        }
        if (userData?.count) {
            setFilter({
                ...filter,
                count: userData?.count
            })
        }
    } , [ userData ])
    console.log(filter);
    const handleToggleChange = (userData) => {
        dispatch(adminBlockUser(userData._id, !userData.status))
        userData.status = !userData.status
        setUserState([...userState] , 
            userData)
    }
  return (
    <>
        <Nav admin={true} />
        <div className="d-flex w-100" >

                   {
                        miniSidebar ? <Sidebar2 
                        action={'User'}
                        setSidebarButton={setSidebarButton} 
                        sidebarButton={sidebarButton} 
                        miniSidebar={miniSidebar} 
                        setMiniSideBar={setMiniSideBar}/> 
                        : 
                        <Sidebar 
                        action={'User'}
                        setSidebarButton={setSidebarButton} 
                        sidebarButton={sidebarButton}           
                        setMiniSideBar={setMiniSideBar} 
                        miniSidebar={miniSidebar}/>
                        }
              <div className="tab-content admin-tab-content p-2  mt-5" style={miniSidebar ? {marginLeft:'8%'} : {}}>
                  {/* <!-- Appointment Tab --> */}
                  <div className="card card-table mb-0 shadow ms-5 w-100 rounded fade show ">
                      <div className="filter m-4  row col-12">
                          <div className="doc-filter search col-md-3 col-sm-6  col-12" style={{ float: 'right' }}>
                              <input type="text" name="" id="" className='form-control col-12 mt-3' 
                              placeholder='&#xf002;Search' style={{ fontFamily: 'Arial, FontAwesome' }} onChange={(e) => {
                                setFilter({
                                    ...filter ,
                                    search : e.target.value
                                })
                              }}/>
                          </div>
                      </div>
                      <hr />
                      <div className="card-body w-100">
                          <div className="table-responsive">
                              <table className="table table-hover table-center mb-0">
                                  <thead>
                                      <tr>
                                      <th>PatientId</th>
                                          <th onClick={() => {
                                            localStorage.removeItem('adminInfo')
                                          }}>Patient</th>
                                          <th>Blood Group</th>
                                          <th>DOB</th>
                                          <th>Phone</th>
                                          <th>Last Visit</th>
                                          <th className='text-danger fw-bold'>Block</th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                      {
                                          userState?.map((user) => {
                                            return(
                                                <tr>
                                                <td>#{user._id.substr(0,4)}</td>
                                                    <td>
                                                        <h2 className="table-avatar">
                                                            <a className="avatar avatar-sm mr-2">
                                                                <img className="avatar-img rounded-circle" src={user.picture ? user.picture : require('../../../../assets/default Profile.webp')} alt="UserImage" />
                                                            </a>
                                                            <a className='ms-2 fw-bold'>{user.name} {user.lastName}</a>
                                                        </h2>
                                                    </td>
                                                    <td>{user.bloodGroup ? user.bloodGroup : 'Not given'}</td>
                                                    <td> <Badge bg='secondary' >{user.dob ? user.dob.split('T')[0] : 'Not giver'}</Badge> </td>
                                                    <td>{user.phone}</td>
                                                    <td><Badge bg='secondary' >{user.lastVist}</Badge></td>

                                                    
                                                    <td className="text-right">
                                                        <ReactSwitch
                                                            checked={user.status}
                                                            onChange={() => {
                                                                handleToggleChange(user)
                                                            }}
                                                            onColor="#86d3ff"
                                                            onHandleColor="#2693e6"
                                                            handleDiameter={30}
                                                            uncheckedIcon={false}
                                                            checkedIcon={false}
                                                            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                                            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                                            height={15}
                                                            width={40}
                                                            className="react-switch"
                                                            id="material-switch"
                                                        />
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

export default User
