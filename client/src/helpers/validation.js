export const doctorProfileValidation = (data , from , setError) => {
    const err = { }
    if(from === 'profile') {
        if(!data?.doctorName) {
        err.doctorName = 'Fill the field'
        }
        if(!data?.email) {
            err.email = 'Fill the field'
        }
        if(!data?.phone) {
            err.phone = 'Fill the field'
        }
        if(!data?.gender?.value) {
            err.gender = 'Fill the field'
        }
        if(!data?.speciality?.value) {
            err.speciality = 'Fill the field'
        }
        if(!data?.consultingFee) {
            err.consultingFee = 'Fill the field'
        }
    } else {
        if(!data?.oldPassword) {
            err.oldPassword = 'Fill the field'
        } 
        if(!data?.newPassword) {
            err.newPassword = 'Fill the field'
        }
        if(!data?.reEnterPassword) {
            err.reEnterPassword = 'Fill the field'
        }
        if(data?.newPassword !== data?.reEnterPassword) {
            err.reEnterPassword = 'Re Enter password is not Matching with new Password'
        }
    }
    
    setError(err)
}

export const loginValidation = (data , setError) => {
    const regexPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let err = {}
        if(!data?.email) {
            err.email = 'Fill the field'
        } else if(!regexPattern.test(data.email)) {
            err.email = 'Email should be valid'
        }
        if(!data?.phone) {
            err.phone = 'Fill the field'
        }
        if(!data?.password) {
            err.password = 'Fill the field'
        }
        if(!data?.name) {
            err.name = 'Fill the field'
        }
        if(!data?.doctorName) {
            err.doctorName = 'Fill the field'
        }
        if(!data?.gender) {
            err.gender = 'Fill the field'
        }
        if(!data?.speciality) {
            err.speciality = 'Fill the field'
        }
        setError(err)
}