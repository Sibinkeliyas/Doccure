import React from 'react'
import './body.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { adminFindReport } from '../../../../../redux/actions/admin'
import { useLocation } from 'react-router-dom'
import html2canvas from 'html2canvas';

function Body() {
    const dispatch = useDispatch()
    const location = useLocation()
    console.log(location.state.orderId);
    const bookingData = useSelector((state) => state.adminFindReport.data?.data)
    useEffect(() => {
        dispatch(adminFindReport(location.state.orderId))
    } , [dispatch, location.state.orderId])
    const handleDownload = () => {
        const element = document.getElementById('content-to-download');

        html2canvas(element).then((canvas) => {
            // Convert the canvas to a data URL
            const dataURL = canvas.toDataURL();

            // Create a temporary anchor element
            const anchor = document.createElement('a');
            anchor.href = dataURL;
            anchor.download = 'downloaded_content.png';

            // Programmatically click on the anchor to trigger the download
            anchor.click();
        });
    };
  return (
   <>
          <div className="invoice-container d-flex flex-column justify-center">
              <div className="invoice-body mt-5 ms-5 me-5 mb-5  " id='content-to-download'>
            <div className="hos-image-and-date  col-md-6">
                <div className="hos-image-div">
                    <img className='hos-image' src={require('../../../../assets/img/logo.png')} alt="hosimage" />
                </div>
                <div className="book-date">
                    <h3 className="order-id">Order : <p className="order-id"> #{bookingData?._id?.substr(0 ,4)}</p></h3>
                    <h3 className='issued-date'>Issued : <p className='issued-date'>{bookingData?.orderDate}</p></h3>
                </div>
            </div>
            <hr className='mb-5'/>
            <div className="invoice-from-to col-md-6">
                <div className="invoice-from ms-5">
                    <h4 className="invoice-from-header">Invoice From</h4>
                    <p className="doctor-name-invoice">Dr. {bookingData?.doctorData?.doctorName}</p>
                          <p className="address">{bookingData?.doctorData?.email}</p>
                          <p className="doc-location">{bookingData?.doctorData?.phone}</p>
                </div>
                <div className="invoice-to me-5">
                    <h4 className="invoice-from-header">Invoice To</h4>
                          <p className="doctor-name-invoice">{bookingData?.userData?.name} {bookingData?.userData?.lastName}</p>
                    <p className="address">{bookingData?.userData?.email}</p>
                    <p className="use-location">{bookingData?.userData?.phone}</p>
                </div>
            </div>
            <div className="invoice-payment-method ms-5 mt-5">
                <h4 className="invoice-from-header">Payment Method</h4>
                <p className="doctor-name-invoice">{bookingData?.paymentMethod}</p>
                {/* <p className="address">806 Twin Willow Lane, Old Forge,</p>
                <p className="use-location">Newyork, USA</p> */}
            </div>
            <div className="invoice-payment-method items-table ms-5 mt-5 me-5"> 
                <table className="table table-bordered invoice-table" aria-label="TABLE">
                    <thead role="rowgroup">
                    <tr role="row">
                        <th role="columnheader" scope="col">Description</th>
                        <th role="columnheader" scope="col">Duration</th>
                        <th role="columnheader" scope="col">Vat</th>
                        <th role="columnheader" scope="col">Total</th>
                    </tr>
                    </thead>
                    <tbody role="rowgroup">
                    <tr role="row">
                        <td>Genal Consultaion</td>
                        <td>{bookingData?.time?.duration}</td>
                        <td>$0</td>
                        <td>${bookingData?.doctorData?.consultingFee}</td>
                    </tr>
                    <tr role="row">
                    <td>Video Call</td>
                    <td></td>
                        <td></td>
                        <td>${bookingData?.videoCall ? 50 : 0} </td>
                    </tr>
                    </tbody>
                </table>
            </div>


            <div className="invoice-total-subtotal mt-4">
                <table className="table  invoice-table-sub-table"  aria-label="TABLE">
                    <tbody >
                        <tr role="row">
                            <td><h5 className='invoice-subtotal me-auto'>Sub Total </h5></td>
                            <td></td>
                            <td></td>
                                  <td><p className='invoice-subtotal'>${parseInt(bookingData?.doctorData?.consultingFee) + (bookingData?.videoCall ? 50 : 0)}</p></td>
                        </tr>
                        <tr role="row">
                            <td><h5  className='invoice-distotal'>Discount : </h5></td>
                            <td></td>
                            <td></td>
                                  <td><p className='invoice-subtotal'>${
                                    (parseInt(bookingData?.doctorData?.consultingFee) + (bookingData?.videoCall ? 50 : 0)) - parseInt(bookingData?.totalAmount) > 0 ? 
                                    (parseInt(bookingData?.doctorData?.consultingFee) + (bookingData?.videoCall ? 50 : 0)) - parseInt(bookingData?.totalAmount) : 
                                    bookingData?.totalAmount }</p></td>
                        </tr>
                        <tr role="row">
                            <td><h5  className='invoice-total'> Total : </h5></td>
                            <td></td>
                            <td></td>
                                  <td><p className='invoice-subtotal'>${parseInt(bookingData?.totalAmount)}</p></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="invoice-other-information mt-4 me-5">
                <h4 className="invoice-from-header ms-5 ">Other Information</h4>
                      <p className='ms-5'>Please find attached the invoice for your recent doctor's appointment, detailing the cost of the consultation and any additional services provided.</p>
            </div>
            
        </div>

              <div className='mb-5 w-100'>
                  <button className='btn btn-info text-white download-button 5' onClick={handleDownload}>DownLoad</button>
              </div>
        
      </div>
   </>
  )
}

export default Body
