import React  from 'react';
import { useDispatch } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { user_add_review } from '../../redux/actions/user'
import { AiFillStar } from 'react-icons/ai';
import './review.css'
import { dateFormat } from '../../helpers/date';
import { replay_user_review } from '../../redux/actions/doctor';

function View(args) {
  const { reviewStatus, showReviewStatus, patientId , doctorId , setReview , userData , setReviewButton , type } = args
  const dispatch = useDispatch()
  const date = dateFormat(new Date())
  const toggle = (status = false , user) => {
    if(status && type === 'user') {
        const data = []
        data.push(userData)
        dispatch(user_add_review( patientId , doctorId , reviewStatus.review , reviewStatus.rating , date  ))
        const reviewData = { 
            reviews: {
                review: reviewStatus.review ,
                patientId , 
                rating : reviewStatus.rating ,
                date : dateFormat(new Date())
            }, 
           userData : data
        }
        setReview((review) => [...review, reviewData]);
        setReviewButton(true)
    } else {
      dispatch(replay_user_review(doctorId , patientId , reviewStatus.review , date))
    }
        showReviewStatus({
            ...reviewStatus,
            status: false
        })
  }


  return (
    <div>
      <Modal isOpen={reviewStatus.status} toggle={() => {
              toggle(false)
      }} {...args}>
              <ModalHeader toggle={() => {
                  toggle(false)
              }}>Add Review</ModalHeader>
        <ModalBody>
          <textarea name="" id="" cols="30" rows="6" className='col-12' onChange={(e) => {
            showReviewStatus({
                ...reviewStatus ,
                review : e.target.value
            })
          }}></textarea>
          { type === 'user' &&
            <div className="ratingstar d-flex justify-content-center w-100 p-3 " >
              <AiFillStar className='star' onClick={() => {
                showReviewStatus({
                  ...reviewStatus ,
                  rating : 1
                })
              }} style={reviewStatus.rating >= 1 ? { color : 'gold' } : {color : 'black'}}/>
              <AiFillStar className='star' onClick={() => {
                showReviewStatus({
                  ...reviewStatus ,
                  rating : 2
                })
              }} style={reviewStatus.rating >= 2 ? { color : 'gold' } : {color : 'black'}}/>
              <AiFillStar className='star' onClick={() => {
                showReviewStatus({
                  ...reviewStatus ,
                  rating : 3
                })
              }} style={reviewStatus.rating >= 3 ? { color : 'gold' } : {color : 'black'}}/>
              <AiFillStar className='star' onClick={() => {
                showReviewStatus({
                  ...reviewStatus ,
                  rating : 4
                })
              }} style={reviewStatus.rating >= 4 ? { color : 'gold' } : {color : 'black'}}/>
              <AiFillStar className='star' onClick={() => {
                showReviewStatus({
                  ...reviewStatus ,
                  rating : 5
                })
              }} style={reviewStatus.rating >= 5 ? { color : 'gold' } : {color : 'black'}}/>
          </div>}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => {
            toggle(true )
          }}>
            Add Review
          </Button>{' '}
          <Button color="secondary" onClick={(e) => {
            toggle(false , 'user')
          }}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default View;