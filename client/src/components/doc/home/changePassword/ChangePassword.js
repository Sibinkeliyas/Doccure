import React from 'react'
import { useEffect } from 'react'
import { toast , ToastContainer } from 'react-toastify'

function ChangePassword({ setChangepassword, changePassword, changePasswordSState, handleChangePassword , open , setError , error}) {
  useEffect(() => {
    if(changePassword.err) {
      toast.error(changePassword.err)
      changePassword.err = null
    } else if(changePassword.data) {
      toast.success('Password changed succesfully')
    }
  } , [changePassword, changePassword.err] )
  return (
    <div className='doc-home-dashboard my-4 ms-5 me-2' style={open === false ? {width:'95%'} : open === true ? {display : 'none'} : {}}>
    <ToastContainer />
          <div className="w-100 shadow rounded mb-5 ">
              <div className="doc-profile-edit w- row mt-5">
                <div className="col-md-6 col-12 ms-4 me-3 mb-3 card-label ">
                    <label htmlFor="oldpassword">Old password</label>
                    <input type="text" name="oldpassword" id="oldpassword" className='w-100' value={changePasswordSState?.oldPassword} onChange={(e) => {
                      setChangepassword({
                        ...changePasswordSState ,
                        oldPassword : e.target.value
                      })
                        setError({
                          ...error,
                          oldPassword: ''
                      })
                    }}/>
                    {
                          error?.oldPassword && <small className='text-danger mx-3 mt1 fw-bold'>{error?.oldPassword} *</small>
                    }
                </div>
                <div className="col-md-6 ms-4 me-3 mb-5 card-label ">
                    <label htmlFor="newPassword">New Password</label>
                    <input type="text" name="newPassword" id="newPassword" className='w-100' value={changePasswordSState?.newPassword} onChange={(e) => {
                      setChangepassword({
                        ...changePasswordSState ,
                        newPassword : e.target.value
                      })
                         setError({
                          ...error,
                          newPassword: ''
                      })
                    }}/>
                      {
                          error?.newPassword && <small className='text-danger mx-3 mt1 fw-bold'>{error?.newPassword} *</small>
                    }
                </div>
                 <div className="col-md-6 ms-4 me-3 mb-5 card-label ">
                    <label htmlFor="newPassword">Re-Enter New password</label>
                    <input type="text" name="newPassword" id="newPassword" className='w-100' value={changePasswordSState?.reEnterPassword} onChange={(e) => {
                      setChangepassword({
                        ...changePasswordSState ,
                        reEnterPassword : e.target.value
                      })
                         setError({
                          ...error,
                          reEnterPassword: ''
                      })
                    }}/>
                      {
                          error?.reEnterPassword && <small className='text-danger mx-3 mt1 fw-bold'>{error?.reEnterPassword} *</small>
                    }
                </div>
              </div>
        <div className="button w-100 ms- p-3">
          <button className='btn btn-info text-white fw-bold ms-auto profile-submit-button m-3' onClick={handleChangePassword}>Submit</button>
        </div>
          </div>
    </div>
  )
}

export default ChangePassword
