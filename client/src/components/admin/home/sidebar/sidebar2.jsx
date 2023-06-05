import React, { useEffect, useState } from 'react'
import './sidebar.css'
import { SidebarData } from './sidebarData'
import { useNavigate } from 'react-router-dom';

function Sidebar({setMiniSideBar ,sidebarButton , setSidebarButton , action}) {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const navigate = useNavigate()
    useEffect(() => {
        const handleResize = () => {
        setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        if (parseInt(windowWidth) > 723) {
            if(sidebarButton) {
                setMiniSideBar(false)
            } else {
                setMiniSideBar(true)
            }
        } else {
            setMiniSideBar(true)
        }
        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }, [setMiniSideBar, sidebarButton, windowWidth]);
  return (
   <div className='mini-sidebar '>
      <label htmlFor="" className='mini-arrow mb-2' onClick={() => {
        setMiniSideBar(false)
        setSidebarButton(true)
      }} ><i className="fa-duotone fa-arrow-left-from-line"></i></label>
      <ul className='sidebarliset'>
      {
        SidebarData?.map((data , key) => {
          return(
            <>
              <li key={key} 
              onClick={() => navigate(data.link)}
              className='row' style={action === data.title ? {backgroundColor:'#00d0f1' ,  width : '88%' , marginLeft:'10px', borderRadius:'10px'} : {}}>
                <div id='icon'>{data.icon}</div>
              </li>
            {
              (data.title === 'Doctor' | data.title === 'Dashboard') ? <hr className='w-100  fw-bold my-3'/> : <></>
            }
            </>
          )
        })
      }
      </ul>
    </div>
  )
}

export default Sidebar
