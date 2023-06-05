import React from 'react'
import './pagination.css'

function Pagination({setFilter , filter }) {
  const map = []
  for (let i = 0; i < (Math.ceil(filter.count / filter.perPage)); i++) {
     map.push(i);
  }
  return (
   <>
        <div id="wrapper " className='mb-5'>
          <div className="b-pagination-outer ">
          <div id="pagination" className='ms-5 shadow'>
          <select id="page-select" onChange={(e) => {
            setFilter({
              ...filter ,
              perPage : parseInt(e.target.value)
            })
          }} >
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </div>
            <ul id="border-pagination" className='shadow'>
              {
                filter.page === 1 ? ''
                :
                <li><a className="" href='d' onClick={(e) => {
                  e.preventDefault()
                   setFilter({
                        ...filter ,
                        page : filter.page - 1
                      })
                }}>«</a></li>
              }
              {
                map.map((ele , index) => {
                  return (
                    <li><a  className={`${filter.page === index + 1 ? 'active' : ''}`} onClick={() => {
                      setFilter({
                        ...filter ,
                        page : index + 1
                      })
                    }}>{index + 1 }</a></li>
                  )
                })
              }
              {
                map.length === filter.page ? ''
                : 
                <li onClick={() => {
                   setFilter({
                        ...filter ,
                        page : filter.page + 1
                      })
                }}><a >»</a></li>
              }
            </ul> 
        </div> 
    </div>
   </>
  )
}

export default Pagination
