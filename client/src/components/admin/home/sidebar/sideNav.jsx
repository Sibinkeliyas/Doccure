import React, { useEffect, useState } from 'react'
import './sidebar.css'
import { SidebarData } from './sidebarData'
import { useNavigate } from 'react-router-dom';

function Sidebar({ setMiniSideBar, miniSidebar, sidebarButton, setSidebarButton ,action}) {
   const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate()
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    if (parseInt(windowWidth) <= 723) {
      if(!sidebarButton) {
        setMiniSideBar(true)
      } else {
        setMiniSideBar(false)
      }
    } else {
      setMiniSideBar(false)
    }
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [setMiniSideBar, sidebarButton, windowWidth]);

  return (
    <div className='sidebar ' style={window.innerWidth <= 723 ? {position:'absolute' , zIndex:2 , opacity:'.7'} : {}}>
      {
        !miniSidebar &&
          <label htmlFor="" className='arrow mb-2'  onClick={() => {
            setMiniSideBar(true)
            setSidebarButton(false)
          }}><i className="fa-duotone fa-arrow-left-from-line"></i></label>
      }
      <ul className='sidebarliset'>
      {
        SidebarData?.map((data , key) => {
          return(
            <>
              <li key={key} 
              onClick={() => navigate(data.link)}
              className='row' style={action === data.title ? {backgroundColor:'#00d0f1' ,  width : '88%' , marginLeft:'10px', borderRadius:'10px'} : {}}>
                <div id='icon'>{data.icon}</div>
                <div id='title' className='fw-bold'>{data.title}</div>
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
