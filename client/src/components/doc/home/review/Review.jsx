import React from 'react'
import { Badge } from 'react-bootstrap'
import { AiFillStar } from 'react-icons/ai';
import ReviewModelPage from '../../../modal/review'

function Review({ reviewModel, setReviewModel, review, setReview , open }) {
  return (
    <div className='doc-home-dashboard my-4 ms-5 me-2' style={open === false ? {width:'95%'} : open === true ? {display : 'none'} : {}}>
          
          {
            review?.map((review) => {
                return (
                    <div className="doc-review-div col-12 shadow me-5 mb-3">
                        <div className="doc-user-review row ">
                            <div className="doc-user-review-inner-div col-12">
                                <div className="doc-user-review-use-data col-md-8 col-sm-12 row ms-3 mt-3">
                                    <img src={review.userData[0].picture ? review.userData[0].picture : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}
                                        alt="userimage" className='col-3 doc-review-user-image' />
                                    <div className="doc-review-userdata-div col-5">
                                        <b className='col-12 doc-review-user-details'>{review.userData[0].name}</b>
                                        <p className='doc-review-date col-12'><Badge bg='secondary'>{review.reviews.date}</Badge></p>
                                    </div>
                                </div>
                                <div className="doc-user-review-use-data-rating col-md-4 col-sm-12">
                                    <AiFillStar className='star ms-1 ' style={review.reviews.rating >= 1 ? {color:'gold'} : {color:'black'}}/>
                                    <AiFillStar className='star' style={review.reviews.rating >= 2 ? { color: 'gold' } : { color: 'black' }} />
                                    <AiFillStar className='star' style={review.reviews.rating >= 3 ? { color: 'gold' } : { color: 'black' }} />
                                    <AiFillStar className='star' style={review.reviews.rating >= 4 ? { color: 'gold' } : { color: 'black' }} />
                                    <AiFillStar className='star' style={review.reviews.rating >= 5 ? { color: 'gold' } : { color: 'black' }} />
                                </div>
                            </div>
                            <div className="doc-review-review-content">
                                <p className='ms-5 mt-2 me-4 mb-2'>{review.reviews.review}</p>
                            </div>
                            {
                                !review.reviews.reply &&
                                <button className='btn btn-sm col-1 ms-5 doc-review-replay-button py-3' onClick={() => {
                                    setReviewModel({
                                        ...reviewModel,
                                        patientId : review.userData[0]._id,
                                        doctorId : review._id ,
                                        status: true
                                    })
                                }}><i className="fa-solid fa-reply"></i><span className='ms-2'>replay</span></button>
                            }
                        </div>
                        {
                            review.reviews.reply && 
                            <div className="doc-doctor-replay ms-5 col-10">
                                <div className="doc-user-review-inner-div col-12">
                                    <div className="doc-user-review-use-data col-md-8 col-sm-12 row ms-3 mt-3">
                                            <img src={review.picture ? `${process.env.REACT_APP_BACKEND_URL}/${review.picture}` : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}
                                            alt="userimage" className='col-3 doc-review-user-image' />
                                        <div className="doc-review-userdata-div col-5">
                                            <b className='col-12 doc-review-user-details'>Me</b>
                                            <p className='doc-review-date col-12'><Badge bg='secondary'>{review.reviews.replayDate}</Badge></p>
                                        </div>
                                    </div>

                                </div>
                                <div className="doc-review-review-content pb-4">
                                    <p className='ms-5 mt-2 me-2 mb-2'>{review.reviews.reply}</p>
                                </div>
                            </div>
                        }
                    </div>
                )
            })
          }

          
          <ReviewModelPage 
              reviewStatus={reviewModel}
              showReviewStatus={setReviewModel}
              patientId={reviewModel.patientId}
              doctorId={reviewModel.doctorId}
              setReview={setReview}
              review={review}
          />
    </div>
  )
}

export default Review
