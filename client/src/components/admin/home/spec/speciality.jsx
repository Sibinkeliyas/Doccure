/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import Nav from '../../../user/home/Navbar/Navbar'
import Sidebar from '../sidebar/sideNav'
import Sidebar2 from '../sidebar/sidebar2'
import { useState } from 'react'
import Pagination from '../../../Pagination/Pagination'
import '../home.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {   adminDeleteSpeciality,   adminFindSpeciality, } from '../../../../redux/actions/admin'
import swal from 'sweetalert'
import AddSpeciality from '../../../modal/addSpecility'
import { ToastContainer, toast } from 'react-toastify'

function Spciality() {
    const [filter , setFilter] = useState({
        page : 1 ,
        perPage : 10 ,
        count : 0 ,
        search : '' 
    })
    const dispatch = useDispatch()
    const [miniSidebar , setMiniSideBar] = useState(false)
    const [sidebarButton , setSidebarButton] = useState()
    const [showModel, setShowModel] = useState()
    const specialities = useSelector((state) => state.adminSpecialities.data)
    const deleteSpecialityMessage = useSelector((state) => state.adminDeleteSpeciality)

    useEffect(() => {
        dispatch(adminFindSpeciality(filter))
    } , [dispatch, filter.perPage , filter.page , filter.search ])
   
    useEffect(() => {
        if (specialities?.count) {
            setFilter({
                ...filter , 
                count: specialities?.count
            })
        }
    }, [ specialities ])


    const deleteSpeciality = (specialityId) => {
        swal({
            title: "Are you sure?",
            text: "do you want to change the status!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
                if (willDelete) {
                    dispatch(adminDeleteSpeciality(specialityId, filter))
                } else {
                    swal("Doctor is there!");
                }
            });
    }
    const editSpeciality = (action , speciality) => {
        console.log("Ddddd");
        setShowModel({
            ...showModel ,
            status : true,
            action : action ,
            speciality : speciality.speciality ,
            specialityId : speciality._id
        })
    }
    useEffect(() => {
        if(deleteSpecialityMessage?.error) {
            toast.error(deleteSpecialityMessage?.error)
            deleteSpecialityMessage.error = false
        }
    }, [ deleteSpecialityMessage.error ])

   return (
    <>
        <Nav admin={true} />
        <div className="d-flex w-100" >
        <ToastContainer />

                   {
                        miniSidebar ? <Sidebar2 
                            action={'Speciality'}
                            setSidebarButton={setSidebarButton} 
                            sidebarButton={sidebarButton} 
                            miniSidebar={miniSidebar} 
                            setMiniSideBar={setMiniSideBar}/> 
                        : 
                        <Sidebar 
                            action={'Speciality'}
                            setSidebarButton={setSidebarButton} 
                            sidebarButton={sidebarButton}           
                            setMiniSideBar={setMiniSideBar} 
                            miniSidebar={miniSidebar}/>
                        }
              <div className="tab-content admin-tab-content p-2  mt-5" style={miniSidebar ? {marginLeft:'8%'} : {}}>
                        { 
                       showModel?.status &&
                                <AddSpeciality 
                                    setShowModel={setShowModel}
                                    showModel={showModel}
                                    filter={filter}
                                />
                        }
                  {/* <!-- Appointment Tab --> */}
                  <div className="card card-table mb-0 shadow ms-5 w-100 rounded fade show ">
                       <div className="filter m-4  row col-12 w-100 speciality-filter-div">
                             <div className="form-input col-md-3 col-sm-5 col-12 " style={{float:'right'}}>
                                   <input type="text" name="" id="" className='form-control col-12  mt-3 ' placeholder='&#xf002;Search' style={{ fontFamily: 'Arial, FontAwesome' , float:'right' }}
                                       onChange={(e) => {
                                           setFilter({
                                               ...filter,
                                               search: e.target.value
                                           })
                                       }}
                                   />
                                </div>
                                <button className='btn col-md-2 col-sm-5 col-11   ms-auto me-5 btn-info text-white mt-3' onClick={() => {
                                    setShowModel({
                                        ...showModel,
                                        status: true,
                                        action: 'add'
                                    })
                                }}>Add </button>
                          </div>
                      <hr />
                      <div className="card-body w-100">
                          <div className="table-responsive">
                              <table className="table table-hover table-center mb-0">
                                  <thead>
                                      <tr>
                                            <th>SpecialityId</th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th>Speciality</th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th className=''>Actions</th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                      {
                                          specialities?.data?.map((speciality) => {
                                            return(
                                                <tr key={speciality._id}>
                                                <td>#{speciality._id.substr(0,4)}</td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td>{speciality.speciality}</td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td> <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td className="text-right">
                                                        <div className="table-action">
                                                            <a className="btn btn-sm bg-warning-light bg-light text-warning me-2" onClick={() => {
                                                                editSpeciality('edit', speciality)
                                                            }}>
                                                            <i className="fa-solid fa-edit" style={{fontSize:'15px'}} ></i> Edit
                                                        </a>
                                                            <a className="btn btn-sm bg-danger-light bg-light text-danger" onClick={() => {
                                                                deleteSpeciality(speciality._id)
                                                            }}>
                                                            <i className="fa-solid fa-trash" ></i> Delete
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

export default Spciality
