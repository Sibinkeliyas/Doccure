import React from 'react'
import './body.css'

function Body() {
  return (
   <>
      <div className="invoice-container">
        <div className="invoice-body mt-5 ms-5 me-5 mb-5">
            <div className="hos-image-and-date  col-md-6">
                <div className="hos-image-div">
                    <img className='hos-image' src={require('../../../../assets/img/logo.png')} alt="hos-image" />
                </div>
                <div className="book-date">
                    <h3 className="order-id">Order : <p className="order-id"> #00124</p></h3>
                    <h3 className='issued-date'>Issued : <p className='issued-date'>20/07/2019</p></h3>
                </div>
            </div>
            <hr className='mb-5'/>
            <div className="invoice-from-to col-md-6">
                <div className="invoice-from ms-5">
                    <h4 className="invoice-from-header">Invoice From</h4>
                    <p className="doctor-name-invoice">Dr. Darren Elder</p>
                    <p className="address">806 Twin Willow Lane, Old Forge,</p>
                    <p className="doc-location">Newyork, USA</p>
                </div>
                <div className="invoice-to me-5">
                    <h4 className="invoice-from-header">Invoice To</h4>
                    <p className="doctor-name-invoice">Walter Roberstern</p>
                    <p className="address">806 Twin Willow Lane, Old Forge,</p>
                    <p className="use-location">Newyork, USA</p>
                </div>
            </div>
            <div className="invoice-payment-method ms-5 mt-5">
                <h4 className="invoice-from-header">Payment Method</h4>
                <p className="doctor-name-invoice">Pay Pal</p>
                {/* <p className="address">806 Twin Willow Lane, Old Forge,</p>
                <p className="use-location">Newyork, USA</p> */}
            </div>
            <div className="invoice-payment-method items-table ms-5 mt-5 me-5"> 
                <table className="table table-bordered invoice-table" aria-label="TABLE">
                    <thead role="rowgroup">
                    <tr role="row">
                        <th role="columnheader" scope="col">Description</th>
                        <th role="columnheader" scope="col">Quantity</th>
                        <th role="columnheader" scope="col">Vat</th>
                        <th role="columnheader" scope="col">Total</th>
                    </tr>
                    </thead>
                    <tbody role="rowgroup">
                    <tr role="row">
                        <td>Genal Consultaion</td>
                        <td>1</td>
                        <td>$0</td>
                        <td>$100</td>
                    </tr>
                    <tr role="row">
                    <td>Genal Consultaion</td>
                        <td>1</td>
                        <td>$0</td>
                        <td>$100</td>
                    </tr>
                    </tbody>
                </table>
            </div>


            <div className="invoice-total-subtotal mt-4">
                <table className="table  invoice-table-sub-table"  aria-label="TABLE">
                    <tbody role="rowgroup">
                        <tr role="row">
                            <td><h5 className='invoice-subtotal me-auto'>Sub Total </h5></td>
                            <td></td>
                            <td></td>
                            <td><p  className='invoice-subtotal'>$200</p></td>
                        </tr>
                        <tr role="row">
                            <td><h5  className='invoice-distotal'>Discount : </h5></td>
                            <td></td>
                            <td></td>
                            <td><p  className='invoice-subtotal'>$200</p></td>
                        </tr>
                        <tr role="row">
                            <td><h5  className='invoice-total'> Total : </h5></td>
                            <td></td>
                            <td></td>
                            <td><p  className='invoice-subtotal'>$200</p></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="invoice-other-information mt-4 me-5">
                <h4 className="invoice-from-header ms-5 ">Other Information</h4>
                <p className='ms-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae similique autem sapiente harum nisi numquam, 
                adipisci laborum sint incidunt ipsam deleniti omnis aliquam soluta dolore eos labore cum eius iusto.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero adipisci unde fugit fugiat incidunt esse molestiae minima accusantium, soluta, ducimus odit modi vitae libero. Molestiae nemo culpa velit tempore quae!</p>
            </div>
        </div>
      </div>
   </>
  )
}

export default Body
