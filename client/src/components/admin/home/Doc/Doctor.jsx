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
import { adminBlockDoctor, adminDeleteDoctors, adminFindDoctors, adminFindSpecialities, } from '../../../../redux/actions/admin'
import ReactSwitch from 'react-switch'
import SelectTag from 'react-select';
import swal from 'sweetalert'
import AddDoctor from '../../../modal/addDoctor'

function Doctor() {
    const [filter , setFilter] = useState({
        page : 1 ,
        perPage : 10 ,
        count : 0 ,
        search : '' ,
        gender : '' ,
        specialities : ''
    })
    const genderOptions = [
       { value : 'male' , label : 'Male' } ,
       { value : 'female' , label : 'Female' } ,
       { value : 'other' , label : 'Other' }
    ]
    const dispatch = useDispatch()
    const [speciality , setSpeciality] = useState()
    const [miniSidebar , setMiniSideBar] = useState(false)
    const [sidebarButton , setSidebarButton] = useState()
    const [doctorState , setDoctorState] = useState()
    const [selectTagValue , setSelectTagValue] = useState({
        gender : {} ,
        specialities : {}
    })
    const [addDoctorModelStatus, showaddDoctorModelStatus] = useState()
    const doctorData = useSelector((state) => state.adminFindDoctors.data)
    const specialities = useSelector((state) => state.adminSpecialities.data)

    useEffect(() => {
        dispatch(adminFindDoctors(filter))
        dispatch(adminFindSpecialities())
    } , [dispatch, filter.perPage , filter.page , filter.search , filter.gender , filter.specialities])
   
    useEffect(() => {
        if(specialities) {
            for(let i=0;i<specialities.length;i++) {
                specialities[i].value = specialities[i].speciality
                specialities[i].label = specialities[i].speciality
            }
            setSpeciality(specialities)
        }
    } , [ specialities ])
    useEffect(() => {
        if (doctorData?.data?.length !== 0) {
            setDoctorState(doctorData?.data)
        }
        if (doctorData?.count) {
            setFilter({
                ...filter,
                count: doctorData?.count
            })
        }
    } , [ doctorData ])
    const handleToggleChange = (doctorData) => {
        dispatch(adminBlockDoctor(doctorData._id, !doctorData.status))
        doctorData.status = !doctorData.status
        setDoctorState([...doctorState] , 
            doctorData)
    }
    const handleGenderChange = (event) => {
        setFilter({
            ...filter ,
            gender :event.value
        })
        setSelectTagValue({
            ...selectTagValue ,
            gender : event
        })
    }
    const handleSpeciality = (value) => {
        setFilter({
            ...filter ,
            specialities : value.label
        })
        setSelectTagValue({
            ...selectTagValue ,
            specialities : value
        })
    }


    const deleteDoctor = (doctorId) => {
        swal({
            title: "Are you sure?",
            text: "do you want to change the status!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
                if (willDelete) {
                    dispatch(adminDeleteDoctors(doctorId, filter))
                } else {
                    swal("Doctor is there!");
                }
            });
    }
    const addDoctor = () => {
        showaddDoctorModelStatus({
            status : true
        })
    }
   return (
    <>
        <Nav admin={true} />
        <div className="d-flex w-100" >

                   {
                        miniSidebar ? <Sidebar2 
                            action={'Doctor'}
                            setSidebarButton={setSidebarButton} 
                            sidebarButton={sidebarButton} 
                            miniSidebar={miniSidebar} 
                            setMiniSideBar={setMiniSideBar}/> 
                        : 
                        <Sidebar 
                            action={'Doctor'}
                            setSidebarButton={setSidebarButton} 
                            sidebarButton={sidebarButton}           
                            setMiniSideBar={setMiniSideBar} 
                            miniSidebar={miniSidebar}/>
                        }
              <div className="tab-content admin-tab-content p-2  mt-5" style={miniSidebar ? {marginLeft:'8%'} : {}}>
                        { 
                            addDoctorModelStatus &&
                                <AddDoctor 
                                    showaddDoctorModelStatus={showaddDoctorModelStatus}
                                    addDoctorModelStatus={addDoctorModelStatus}
                                    speciality={specialities}
                                    genderOptions={genderOptions}
                                    filter={filter}
                                />
                        }
                  {/* <!-- Appointment Tab --> */}
                  <div className="card card-table mb-0 shadow ms-5 w-100 rounded fade show ">
                      <div className="filter m-4  row col-12">
              
                                <div className="doc-filter-status col-md-7 col-sm-9 col-12 row">
                                <SelectTag
                                    className="basic-single col-4 col-sm-6 col-12 mt-3 border-0"
                                    classNamePrefix="Speiciality"
                                    isSearchable
                                    name="Speiciality"
                                    options={speciality}
                                    onChange={handleSpeciality}
                                    placeholder='Speciality'
                                />

                                 <SelectTag
                                    className="basic-single col-4 col-sm-6 col-12 mt-3 border-0"
                                    classNamePrefix="Gender"
                                    isSearchable
                                    name='Gender'
                                    options={genderOptions}
                                    placeholder='Gender'
                                    onChange={handleGenderChange}
                                />
                            </div>
                            <div className="doc-filter search col-md-5  col-12 row" style={{float :'right'}}>
                               <div className="form-input col-md-8 col-sm-5 ">
                                   <input type="text" name="" id="" className='form-control col-12  mt-3' placeholder='&#xf002;Search' style={{ fontFamily: 'Arial, FontAwesome' }}
                                       onChange={(e) => {
                                           setFilter({
                                               ...filter,
                                               search: e.target.value
                                           })
                                       }}
                                   />
                                </div>
                                <button className='btn  col-md-3 col-sm-5 col-12 bg-info text-white fw-bold mt-3' onClick={addDoctor}>Add Doctor</button>
                            </div>
                          </div>
                      <hr />
                      <div className="card-body w-100">
                          <div className="table-responsive">
                              <table className="table table-hover table-center mb-0">
                                  <thead>
                                      <tr>
                                      <th>DoctorId</th>
                                          <th >Doctor</th>
                                          <th >Email</th>
                                          <th>Speciality</th>
                                          <th>Phone</th>
                                          <th>Last Visit</th>
                                          <th className='text-danger fw-bold'>Block</th>
                                           <th className='text-danger fw-bold'>Delete</th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                      {
                                          doctorState?.map((doctor) => {
                                            return(
                                                <tr key={doctor._id}>
                                                <td>#{doctor._id.substr(0,4)}</td>
                                                    <td>
                                                        <h2 className="table-avatar">
                                                            <a className="avatar avatar-sm mr-2">
                                                                <img className="avatar-img rounded-circle" src={doctor.picture ? `${process.env.REACT_APP_BACKEND_URL}/${doctor.picture}` : require('../../../../assets/default Profile.webp')} alt="UserImage" style={{height :'48px'}}/>
                                                            </a>
                                                            <a className='ms-2 fw-bold'>{doctor.doctorName} </a>
                                                        </h2>
                                                    </td>
                                                    <td>{doctor.email}</td>
                                                    <td>{doctor.speciality}</td>
                                                    <td>{doctor.phone}</td>
                                                    <td><Badge bg='secondary' >{doctor.lastvisit}</Badge></td>

                                                    
                                                    <td className="text-right">
                                                        <ReactSwitch
                                                            checked={doctor.status}
                                                            onChange={() => {
                                                                handleToggleChange(doctor)
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
                                                    <td className="text-right">
                                                        <div className="table-action">
                                                            <a className="btn btn-sm bg-danger-light bg-light text-danger" onClick={() => {
                                                                deleteDoctor(doctor._id)
                                                            }} >
                                                                <i className="fa-solid fa-trash"></i> Delete
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

export default Doctor
