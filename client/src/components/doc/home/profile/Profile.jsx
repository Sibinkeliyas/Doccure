import Select from 'react-select';
import React from 'react'

function Profile({ speciality, gender, setConsultingFeeStatus, consultingFeeStatus, profileEditData, 
                   setProfileEditData, profile_edit, setTemporaryPicture, temporaryPicture , open , error , setError }) {
  return (
    <div className='doc-home-dashboard my-4 ms-5 me-2 ' style={open === false ? {width:'95%'} : open === true ? {display : 'none'} : {}}>
      <div className=" mb-5 shadow rounded w-100" >
                <div className="user-profile-edit">
                  <img src={temporaryPicture ? temporaryPicture : profileEditData.picture ? `${process.env.REACT_APP_BACKEND_URL}/${profileEditData.picture}` : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'} style={{width:'8em'}} alt=''/>
                    <div className="file-input mt-4">
                        <input type="file" id="file-input" className='user-profile-select-edit' name='image' onChange={(e) => {
                          setTemporaryPicture(URL.createObjectURL(e.target.files[0]))
                          setProfileEditData({
                            ...profileEditData ,
                            picture : e.target.files[0]
                          })
                        }}/>
                        <label className="file-input__label" htmlFor="file-input"><i className="fa-solid fa-upload me-2 ms-2"></i>
                        <span>Upload file</span></label>
                    </div>
                </div>
                 <div className="doc-profile-edit w- row">
                  <div className="col-md-6 col-12 ms-4 me-3 mb-3 card-label ">
                      <label htmlFor="doctorName">Name *</label>
                      <input type="text" name="doctorName" id="doctorName" className='w-100' value={profileEditData.doctorName} onChange={(e) => {
                            setProfileEditData({
                                ...profileEditData ,
                                doctorName : e.target.value
                            })
                            setError({
                                ...error ,
                                doctorName : ''
                            })
                        }}/>
                      {
                        error?.doctorName &&  <small className='text-danger mx-3 mt1 fw-bold'>{error?.doctorName} *</small>
                      }
                  </div>
                  <div className="col-md-6 ms-4 me-3 mb-3 mt-3 card-label ">
                      <Select
                          placeholder='Speciality'
                          className="basic-single"
                          classNamePrefix="Speciality"
                          isLoading={true}
                          isSearchable={true}
                          name="speciality"
                          options={speciality}
                          defaultValue={profileEditData.speciality}
                          onChange={(value) => {
                            setProfileEditData({
                                ...profileEditData ,
                                speciality : value ,
                                specialityId : value._id
                            })
                              setError({
                                  ...error,
                                  speciality: ''
                              })
                          }}
                      />
                      {
                          error?.speciality && <small className='text-danger mx-3 mt1 fw-bold'>{error?.speciality} *</small>
                      }
                  </div>

                  <div className="col-md-6 col-12 ms-4 me-3 mb-3 card-label ">
                      <label htmlFor="email">Email</label>
                      <input type="text" name="email" id="email" className='w-100' value={profileEditData.email} onChange={(e) => {
                            setProfileEditData({
                                ...profileEditData ,
                                email : e.target.value
                            })
                          setError({
                              ...error,
                              email: ''
                          })
                        }}/>
                      {
                          error?.email && <small className='text-danger mx-3 mt1 fw-bold'>{error?.email} *</small>
                      }
                  </div>
                  <div className="col-md-6 ms-4 me-3 mb-3 card-label mt-3 ">
                      <Select
                          placeholder='Gender'
                          className="basic-single"
                          classNamePrefix="gender"
                          isLoading={true}
                          isSearchable={true}
                          name="gender"
                          options={gender}
                          defaultValue={profileEditData.gender}
                          onChange={(value) => {
                            setProfileEditData({
                                ...profileEditData ,
                                gender : value,
                            })
                              setError({
                                  ...error,
                                  gender: ''
                              })
                        }}
                      />
                      {
                          error?.gender && <small className='text-danger mx-3 mt1 fw-bold'>{error?.gender} *</small>
                      }
                  </div>

                  <div className="col-md-6 col-12 ms-4 me-3 mb-3 card-label ">
                      <label htmlFor="phone">Phone</label>
                      <input type="text" name="phone" id="phone" className='w-100' value={profileEditData.phone} onChange={(e) => {
                            setProfileEditData({
                                ...profileEditData ,
                                phone : e.target.value
                            })
                          setError({
                              ...error,
                              phone: ''
                          })
                        }}/>
                      {
                          error?.phone && <small className='text-danger mx-3 mt1 fw-bold'>{error?.phone} *</small>
                      }
                  </div>
                  <div className="col-md-6 ms-4 me-3 mb-5 card-label ">
                      <label htmlFor="dob">DOB</label>
                      <input type="text" name="dob" id="dob" className='w-100' value={profileEditData.dob} onChange={(e) => {
                            setProfileEditData({
                                ...profileEditData ,
                                dob : e.target.value
                            })
                          setError({
                              ...error,
                              dob: ''
                          })
                        }} />
                      {
                          error?.dob && <small className='text-danger mx-3 mt1 fw-bold'>{error?.dob} *</small>
                      }
                  </div>
                 </div>
            </div>
            <div className="w-100 shadow rounded mb-5">
                <h5 className='ms-2 mt-2 p-3 fw-bold'>Consulting Fee </h5>
              <div className="form-check form-check-inline ms-5 mt-3 mb-3 py-3">
                  <label htmlFor="firstName">Free</label>
                  <input className="form-check-input" type="radio" id="inlineCheckbox1" value="option1" name='consultingFee' checked={consultingFeeStatus.free} onChange={(e) => {
                    setConsultingFeeStatus({
                        ...consultingFeeStatus ,
                        free : e.target.checked ,
                        consulting : false
                    })
                    setProfileEditData({
                        ...profileEditData ,
                        consultingFee : 0
                    })
                  }}/>
              </div>
              <div className="form-check form-check-inline ms-3 mt-3 mb-3">
                  <label htmlFor="firstName">Consulting Fee (For 30 min)</label>
                  <input className="form-check-input" type="radio" id="inlineCheckbox2" name='consultingFee' value="option2" checked={consultingFeeStatus.consulting} onChange={(e) => {
                      setConsultingFeeStatus({
                          ...consultingFeeStatus,
                          free : false ,
                          consulting: e.target.checked
                      })
                  }} />
                 
              </div>
              {
                consultingFeeStatus.consulting  &&
                 <div>                  
                    <div className="col-md-6 ms-4 me-3 mb-5 card-label ">
                        <label htmlFor="lastName">Custome Price</label>
                              <input type="text" name="lastName" id="lastName" className='w-100' value={profileEditData.consultingFee ? profileEditData.consultingFee : '' } onChange={(e) => {
                            setProfileEditData({
                                ...profileEditData ,
                                consultingFee: parseInt(e.target.value) 
                            })
                                  setError({
                                      ...error,
                                      consultingFee: ''
                                  })
                        }}/>
                              {
                                  error?.consultingFee && <small className='text-danger mx-3 mt1 fw-bold'>{error?.consultingFee} *</small>
                              }
                    </div>
                 </div>
              }
            </div>

          <div className="w-100 shadow rounded mb-5">
              <h5 className='ms-2 mt-2 p-3 fw-bold'>About Me </h5>
                  <div>
                      <div className="col-md-12 ms-4 me-3 mb-5 card-label w-100">
                          <textarea name="about me" id=""  rows="5" className='w-75 col-12' value={profileEditData.aboutMe} onChange={(e) => {
                            setProfileEditData({
                                ...profileEditData ,
                                aboutMe : e.target.value
                            })
                        }}></textarea>
                      </div>
                  </div>
          </div>
          <div className="w-100 shadow rounded mb-5">
              <h5 className='ms-2 mt-2 p-3 fw-bold'>Education </h5>
              <div className="doc-profile-edit w- row">
                <div className="col-md-6 col-12 ms-4 me-3 mb-3 card-label ">
                    <label htmlFor="degree">Degree</label>
                    <input type="text" name="degree" id="degree" className='w-100' value={profileEditData.education?.degree} onChange={(e) => {
                            setProfileEditData({
                                ...profileEditData ,
                                education :{
                                    ...profileEditData.education ,
                                    degree : e.target.value
                                }
                            })
                        }}/>
                </div>
                <div className="col-md-6 ms-4 me-3 mb-5 card-label ">
                    <label htmlFor="collage">Collage</label>
                      <input type="text" name="collage" id="collage" className='w-100' value={profileEditData.education?.collage} onChange={(e) => {
                            setProfileEditData({
                                ...profileEditData ,
                                education :{
                                    ...profileEditData.education ,
                                    collage : e.target.value
                                }
                            })
                        }}/>
                </div>
                 <div className="col-md-6 ms-4 me-3 mb-5 card-label ">
                    <label htmlFor="year">Year of Pass</label>
                      <input type="text" name="year" id="year" className='w-100' value={profileEditData.education?.year} onChange={(e) => {
                            setProfileEditData({
                                ...profileEditData ,
                                education :{
                                    ...profileEditData.education ,
                                    year : e.target.value
                                }
                            })
                        }}/>
                </div>
              </div>
              
          </div>

          <div className="button w-100 ms- p-3">
              <button className='btn btn-info text-white fw-bold ms-auto profile-submit-button m-3' onClick={profile_edit}>Submit</button>
          </div>
    </div>
  )
}

export default Profile
