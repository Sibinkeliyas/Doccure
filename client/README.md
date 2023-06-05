# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)




<div className="heading-for-dash-board col-md-12">
                      <div className="row px-3 mb-3 col-12 ms-auto" style={{float:'right' , }}>
                          <div className="col-3 px-3 mb-3">
                              <input type="date" name="" id="" className='form-control' onChange={(e) => {
                                  setGdate(e.target.value)
                              }}  />
                          </div>
                          <div className="col-3 px-3 mb-3">
                              <input type="date" className="form-control px-3 mb-3" name="" id="" onChange={(e) => {
                                  setLdate(e.target.value)
                              }}  />
                          </div>
                          <div className="col-3 px-5 mb-3" >
                              <select value={filter.appointmentStatus} onChange={(value) => {
                                  handleChange(value)
                              }} className="dropdown form-control col-3 px-3 mb-3">
                                  <option value='false'>All</option>
                                  <option value="accepted">Accepted</option>
                                  <option value="canceled">Canceled</option>
                                  <option value="pending">Pending</option>
                              </select>
                          </div>
                      </div>
                    </div> 
    
                     {/* column */}
    
                    
                                            <div id="pat_appointments" className="tab-pane fade show active mb-5 ">
                                                <div className="card card-table mb-0">
                                                    <div className="card-body table-card-body">
                                                    
                                                        <div className="table-responsive">
                                                            <table className="table table-hover table-center appointment-table mb-0" style={appointORbilling === 'appointment' ? {} : {display:'none'}}>
                                                                <thead>
                                                                    <tr>
                                                                        <th>Doctor</th>
                                                                        <th>Appt Date</th>
                                                                        <th>Booking Date</th>
                                                                        <th>Amount</th>
                                                                        <th>Payment </th>
                                                                        <th>Status</th>
                                                                        <th></th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {
                                                                        allOrders?.data?.[0]?.map((ele) => {
                                                                            return (
                                                                                  <tr>
                                                                                        <td>
                                                                                            <h2 className="table-avatar">
                                                                                                <a  className="avatar avatar-sm mr-2">
                                                                                                    <img className="avatar-img rounded-circle" src={require('../../../../assets/img/doctors/doctor-thumb-01.jpg')} alt="User Image" />
                                                                                                </a>
                                                                                                <a className='doctor-name-in-user-dashboard'>Dr. {ele.doctor?.doctorName} <span>{ele.doctor?.speciality}</span></a>
                                                                                            </h2>
                                                                                        </td>
                                                                                        <td>{ele.orderDate} <span className="d-block text-info">{ele.time.startingTime}</span></td>
                                                                                        <td>{ele.orderDate}</td>
                                                                                        <td>$ {ele.totalAmount}</td>
                                                                                        <td>{ele.paymentMethod}</td>
                                                                                        <td><span className="badge badge-pill bg-success-light bg-light text-success">{ele.appointmentStatus}</span></td>
                                                                                        <td className="text-right">
                                                                                            <div className="table-action">
                                                                                                <a  className="btn btn-sm bg-primary-light bg-light text-primary">
                                                                                                    <i className="fas fa-print"></i> Print
                                                                                                </a>
                                                                                                <a  className="btn btn-sm bg-info-light bg-light text-success ms-2">
                                                                                                    <i className="far fa-eye"></i> View
                                                                                                </a>
                                                                                            </div>
                                                                                        </td>
                                                                                    </tr>
                                                                            )
                                                                        })
                                                                    }
                                                                    
                                                                </tbody>
                                                            </table>
    
    
    
                                                            {/* for billing */}
    
                                                            <table className="table table-hover table-center appointment-table mb-0" style={appointORbilling === 'billing' ? {} : {display:'none'}}>
                                                                <thead>
                                                                    <tr>
                                                                        <th>Ivoice Number</th>
                                                                        <th>Doctor</th>
                                                                        <th>Amount</th>
                                                                        <th>Paid On</th>
                                                                        <th>Status</th>
                                                                        <th></th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td>#1234 </td>
                                                                        <td>
                                                                            <h2 className="table-avatar">
                                                                                <a  className="avatar avatar-sm mr-2">
                                                                                    <img className="avatar-img rounded-circle" src={require('../../../../assets/img/doctors/doctor-thumb-01.jpg')} alt="User Image" />
                                                                                </a>
                                                                                <a className='doctor-name-in-user-dashboard'>Dr. Ruby Perrin <span>Dental</span></a>
                                                                            </h2>
                                                                        </td>
                                                                        <td>$160</td>
                                                                        <td>12 Nov 2019</td>
                                                                        <td>16 Nov 2019</td>
                                                                        <td className="text-right">
                                                                            <div className="table-action">
                                                                                <a  className="btn btn-sm bg-primary-light bg-light text-primary">
                                                                                    <i className="fas fa-print"></i> Print
                                                                                </a>
                                                                                <a  className="btn btn-sm bg-info-light bg-light text-success ms-2" onClick={view_navigate}>
                                                                                    <i className="far fa-eye" ></i> View
                                                                                </a>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>#1234 </td>
                                                                        <td>
                                                                            <h2 className="table-avatar">
                                                                                <a  className="avatar avatar-sm mr-2">
                                                                                    <img className="avatar-img rounded-circle" src={require('../../../../assets/img/doctors/doctor-thumb-01.jpg')} alt="User Image" />
                                                                                </a>
                                                                                <a className='doctor-name-in-user-dashboard'>Dr. Ruby Perrin <span>Dental</span></a>
                                                                            </h2>
                                                                        </td>
                                                                        <td>$160</td>
                                                                        <td>12 Nov 2019</td>
                                                                        <td>16 Nov 2019</td>
                                                                        <td className="text-right">
                                                                            <div className="table-action">
                                                                                <a  className="btn btn-sm bg-primary-light bg-light text-primary">
                                                                                    <i className="fas fa-print"></i> Print
                                                                                </a>
                                                                                <a  className="btn btn-sm bg-info-light bg-light text-success ms-2">
                                                                                    <i className="far fa-eye"></i> View
                                                                                </a>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>#1234 </td>
                                                                        <td>
                                                                            <h2 className="table-avatar">
                                                                                <a  className="avatar avatar-sm mr-2">
                                                                                    <img className="avatar-img rounded-circle" src={require('../../../../assets/img/doctors/doctor-thumb-01.jpg')} alt="User Image" />
                                                                                </a>
                                                                                <a className='doctor-name-in-user-dashboard'>Dr. Ruby Perrin <span>Dental</span></a>
                                                                            </h2>
                                                                        </td>
                                                                        <td>$160</td>
                                                                        <td>12 Nov 2019</td>
                                                                        <td>16 Nov 2019</td>
                                                                        <td className="text-right">
                                                                            <div className="table-action">
                                                                                <a  className="btn btn-sm bg-primary-light bg-light text-primary">
                                                                                    <i className="fas fa-print"></i> Print
                                                                                </a>
                                                                                <a  className="btn btn-sm bg-info-light bg-light text-success ms-2">
                                                                                    <i className="far fa-eye"></i> View
                                                                                </a>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>#1234 </td>
                                                                        <td>
                                                                            <h2 className="table-avatar">
                                                                                <a  className="avatar avatar-sm mr-2">
                                                                                    <img className="avatar-img rounded-circle" src={require('../../../../assets/img/doctors/doctor-thumb-01.jpg')} alt="User Image" />
                                                                                </a>
                                                                                <a className='doctor-name-in-user-dashboard'>Dr. Ruby Perrin <span>Dental</span></a>
                                                                            </h2>
                                                                        </td>
                                                                        <td>$160</td>
                                                                        <td>12 Nov 2019</td>
                                                                        <td>16 Nov 2019</td>
                                                                        <td className="text-right">
                                                                            <div className="table-action">
                                                                                <a  className="btn btn-sm bg-primary-light bg-light text-primary">
                                                                                    <i className="fas fa-print"></i> Print
                                                                                </a>
                                                                                <a  className="btn btn-sm bg-info-light bg-light text-success ms-2">
                                                                                    <i className="far fa-eye"></i> View
                                                                                </a>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>#1234 </td>
                                                                        <td>
                                                                            <h2 className="table-avatar">
                                                                                <a  className="avatar avatar-sm mr-2">
                                                                                    <img className="avatar-img rounded-circle" src={require('../../../../assets/img/doctors/doctor-thumb-01.jpg')} alt="User Image" />
                                                                                </a>
                                                                                <a className='doctor-name-in-user-dashboard'>Dr. Ruby Perrin <span>Dental</span></a>
                                                                            </h2>
                                                                        </td>
                                                                        <td>$160</td>
                                                                        <td>12 Nov 2019</td>
                                                                        <td>16 Nov 2019</td>
                                                                        <td className="text-right">
                                                                            <div className="table-action">
                                                                                <a  className="btn btn-sm bg-primary-light bg-light text-primary">
                                                                                    <i className="fas fa-print"></i> Print
                                                                                </a>
                                                                                <a  className="btn btn-sm bg-info-light bg-light text-success ms-2">
                                                                                    <i className="far fa-eye"></i> View
                                                                                </a>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>#1234 </td>
                                                                        <td>
                                                                            <h2 className="table-avatar">
                                                                                <a  className="avatar avatar-sm mr-2">
                                                                                    <img className="avatar-img rounded-circle" src={require('../../../../assets/img/doctors/doctor-thumb-01.jpg')} alt="User Image" />
                                                                                </a>
                                                                                <a className='doctor-name-in-user-dashboard'>Dr. Ruby Perrin <span>Dental</span></a>
                                                                            </h2>
                                                                        </td>
                                                                        <td>$160</td>
                                                                        <td>12 Nov 2019</td>
                                                                        <td>16 Nov 2019</td>
                                                                        <td className="text-right">
                                                                            <div className="table-action">
                                                                                <a  className="btn btn-sm bg-primary-light bg-light text-primary">
                                                                                    <i className="fas fa-print"></i> Print
                                                                                </a>
                                                                                <a  className="btn btn-sm bg-info-light bg-light text-success ms-2">
                                                                                    <i className="far fa-eye"></i> View
                                                                                </a>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>#1234 </td>
                                                                        <td>
                                                                            <h2 className="table-avatar">
                                                                                <a  className="avatar avatar-sm mr-2">
                                                                                    <img className="avatar-img rounded-circle" src={require('../../../../assets/img/doctors/doctor-thumb-01.jpg')} alt="User Image" />
                                                                                </a>
                                                                                <a className='doctor-name-in-user-dashboard'>Dr. Ruby Perrin <span>Dental</span></a>
                                                                            </h2>
                                                                        </td>
                                                                        <td>$160</td>
                                                                        <td>12 Nov 2019</td>
                                                                        <td>16 Nov 2019</td>
                                                                        <td className="text-right">
                                                                            <div className="table-action">
                                                                                <a  className="btn btn-sm bg-primary-light bg-light text-primary">
                                                                                    <i className="fas fa-print"></i> Print
                                                                                </a>
                                                                                <a  className="btn btn-sm bg-info-light bg-light text-success ms-2">
                                                                                    <i className="far fa-eye"></i> View
                                                                                </a>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>#1234 </td>
                                                                        <td>
                                                                            <h2 className="table-avatar">
                                                                                <a  className="avatar avatar-sm mr-2">
                                                                                    <img className="avatar-img rounded-circle" src={require('../../../../assets/img/doctors/doctor-thumb-01.jpg')} alt="User Image" />
                                                                                </a>
                                                                                <a className='doctor-name-in-user-dashboard'>Dr. Ruby Perrin <span>Dental</span></a>
                                                                            </h2>
                                                                        </td>
                                                                        <td>$160</td>
                                                                        <td>12 Nov 2019</td>
                                                                        <td>16 Nov 2019</td>
                                                                        <td className="text-right">
                                                                            <div className="table-action">
                                                                                <a  className="btn btn-sm bg-primary-light bg-light text-primary">
                                                                                    <i className="fas fa-print" ></i> Print
                                                                                </a>
                                                                                <a  className="btn btn-sm bg-info-light bg-light text-success ms-2">
                                                                                    <i className="far fa-eye" ></i> View
                                                                                </a>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>#1234 </td>
                                                                        <td>
                                                                            <h2 className="table-avatar">
                                                                                <a  className="avatar avatar-sm mr-2">
                                                                                    <img className="avatar-img rounded-circle" src={require('../../../../assets/img/doctors/doctor-thumb-01.jpg')} alt="User Image" />
                                                                                </a>
                                                                                <a className='doctor-name-in-user-dashboard'>Dr. Ruby Perrin <span>Dental</span></a>
                                                                            </h2>
                                                                        </td>
                                                                        <td>$160</td>
                                                                        <td>12 Nov 2019</td>
                                                                        <td>16 Nov 2019</td>
                                                                        <td className="text-right">
                                                                            <div className="table-action">
                                                                                <a  className="btn btn-sm bg-primary-light bg-light text-primary">
                                                                                    <i className="fas fa-print"></i> Print
                                                                                </a>
                                                                                <a  className="btn btn-sm bg-info-light bg-light text-success ms-2">
                                                                                    <i className="far fa-eye"></i> View
                                                                                </a>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
    
                                                                </tbody>
                                                            </table>
    
    
                                                            {/* for billing */}
    
    
                                                        </div>
                                                       
                                                    </div>
                                                     <Pagination setFilter={setFilter}  filter={filter}/>
                                                </div>
                                            </div>