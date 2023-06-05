import React, { useState } from 'react'
import Select from 'react-select';
import TimeShedule from '../../../modal/timeShedul';


function Schedule({ durations, times, timeShedule, setTimeSchedule, addTime, deleteTime, setAddTime , addtimeState , open}) {
    const [timeState , setTimeState] = useState(times?.data?.timeSchedule)
    const [timeSchedule , showTimeScheduleStatus] = useState({
        status : false
    })
   
  return (
    <div className='doc-home-dashboard my-4 ms-5 me-2' style={open === false ? {width:'95%'} : open === true ? {display : 'none'} : {}}>
      <div className="doc-time-schedule shadow mx-3 ">
        <h4 className='p-3'>Schedule Timing</h4>
        <h5 className='px-3 '>Timing Slot Duration</h5>
        <hr className='w-25 ms-3'/>
        <div className="doc-time-duration w-25 ms-3">
            <Select
                className="basic-single"
                classNamePrefix="select"
                isLoading={true}
                isClearable
                isSearchable={true}
                name="duration"
                options={durations}
                onChange={(value) => {
                    setTimeSchedule({
                        ...timeShedule ,
                        duration : value.value
                    })
                }}
            />
        </div>
        <div className="doc-time-day-and-time p-2 m-3">
            <div className="doc-time-day doc-time-day-hove row col-12 p-2">
                <div className="day col-1 btn px-4 me-2 col-md-1 col-sm-3 col-5 m-2" onClick={() => {
                    setTimeSchedule({
                        ...timeShedule ,
                        day : 'Monday' ,
                        no : 1
                    })
                      }} style={timeShedule.day === 'Monday' ? { backgroundColor:'#0ce0ff', color :'white' , border:'none' } : {}}>
                    Monday
                </div>
                <div className="day col-1 btn px-4 mx-2 col-md-1 col-sm-3 col-5 m-2" onClick={() => {
                          setTimeSchedule({
                              ...timeShedule,
                              day: 'Tuesday',
                              no : 2
                          })
                      }} style={timeShedule.day === 'Tuesday' ? { backgroundColor: '#0ce0ff', color: 'white', border: 'none' } : {}}>
                    Tuesday
                </div>
                <div className="day col-1 btn px-4 mx-2 col-md-1 col-sm-3 col-5 m-2" onClick={() => {
                          setTimeSchedule({
                              ...timeShedule,
                              day: 'Wednesday',
                              no : 3
                          })
                      }} style={timeShedule.day === 'Wednesday' ? { backgroundColor: '#0ce0ff', color: 'white', border: 'none' } : {}}>
                    Wednesday
                </div>
                <div className="day col-1 btn px-4 mx-2 col-md-1 col-sm-3 col-5 m-2" onClick={() => {
                          setTimeSchedule({
                              ...timeShedule,
                              day: 'Thursday',
                              no : 4
                          })
                      }} style={timeShedule.day === 'Thursday' ? { backgroundColor: '#0ce0ff', color: 'white', border: 'none' } : {}}>
                    Thursday
                </div>
                <div className="day col-1 btn px-4 mx-2 col-md-1 col-sm-3 col-5 m-2" onClick={() => {
                          setTimeSchedule({
                              ...timeShedule,
                              day: 'Friday',
                              no : 4
                          })
                      }} style={timeShedule.day === 'Friday' ? { backgroundColor: '#0ce0ff', color: 'white', border: 'none' } : {}}>
                    Friday
                </div>
                <div className="day col-1 btn px-4 mx-2 col-md-1 col-sm-3 col-5 m-2" onClick={() => {
                          setTimeSchedule({
                              ...timeShedule,
                              day: 'Saturday',
                              no : 5
                          })
                      }} style={timeShedule.day === 'Saturday' ? { backgroundColor: '#0ce0ff', color: 'white', border: 'none' } : {}}>
                    Saturday
                </div>
            </div>
            <hr className='w-100'/>
                  <div className="doc-time-slots doc-time-day row row col-12 p-2">
                      <div className="d-flex border-0 my-3 mb-4 w-100">
                            <h4>Time slot</h4>
                            <button className='ms-auto btn doc-time-edit-button' onClick={() => {
                                showTimeScheduleStatus({
                                    ...timeSchedule ,
                                    status : true
                                })
                          }}>Edit <i className="fa-solid fa-pen-to-square ms-2"></i></button>
                      </div>
                      {
                        times?.data?.timeSchedule?.map((time) => {
                            return(
                               time.day === timeShedule.day && time.duration === timeShedule.duration &&
                                <div key={time.timeId} className="day col-1 col-md-3 btn px-2 mx-2 mb-2 me-2 text-white">
                                    <p className='text-align-centre m-0'>{time.startingTime + ' - ' + time.endingTime}</p>
                                    <i className="fa-sharp fa-solid fa-x ms-2" onClick={() => {
                                        deleteTime(time.timeId)
                                    }}></i>
                                </div>
                            )
                        })
                      } 
            </div>
                {
                      timeSchedule.status && <TimeShedule
                          timeSchedule={timeSchedule}
                          showTimeScheduleStatus={showTimeScheduleStatus} 
                          times={timeState}
                          day={timeShedule.day}
                          setTimeState ={setTimeState}
                          setTime = {setTimeSchedule}
                          scheduleTime = {timeShedule}
                          addTime={addTime}
                          deleteTime={deleteTime}
                          setAddTime={setAddTime}
                          timeState={addtimeState}
                          />
                }
        </div>
      </div>
    </div>
  )
}

export default Schedule
