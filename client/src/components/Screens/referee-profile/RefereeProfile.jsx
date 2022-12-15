import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { AiFillDislike,AiFillLike } from "react-icons/ai";
import { useParams } from 'react-router-dom';
import { addDislike, addLike, fetchReview, getRefereeDetails, handleAddReview, removeDislike, removeLike } from '../../axios';
import Rating from '../Referee/Rating';
import SelectWeek from './SelectWeek';
const RefereeProfile = () => {

   // getting user profile from localstorage

    const user = JSON.parse(localStorage.getItem("user"));

    // referee id from route
    let { id } = useParams();

     // declaring necessary useState hooks
    const [referee, setReferee] = useState({});
    const [reviews, setReviews] = useState([]);
    const [likeCount, setLikeCount] = useState(0);
    const [filteredReviews, setFilteredReviews] = useState([]);
    const [week, setWeek] = useState('week1');
    const [data, setData] = useState({referee:id, writtenBy: user.fullname , comment:'', rating:'', week:'' });

 
  
   
    useEffect(()=>{
    
      getRefereeDetails(id).then(res=>{
        setReferee(res)
      })

      // fetching reviews by it's id when this page first render
      fetchReview(id, week).then(res=>{
        setReviews(res)

        // set filteredreview as per seleted week. initial week is 'week1' in the state
        setFilteredReviews(res.filter(e=>e.week===week))
      })
    },[id])
    

// this function is responsible for handle like to a comment/review
const handleLikeDislike=(id)=>{


// getting all the users array who liked this comment/review
const usersLiked= filteredReviews.filter(e=> e._id ===id)[0].likedislike

setLikeCount(usersLiked.length)

// check if current user has liked this comment or not
// this block of code execute if user already liked the review
if (usersLiked.length>0 && usersLiked.includes(user._id)) {
  const isLiked= usersLiked.includes(user._id)
  if (isLiked) {
    alert('you already liked this!')
    return
    
  }
  
}else{
  
  const usersDisliked= filteredReviews.filter(e=> e._id ===id)[0].dislike

// this block of code will be executed if the user did not liked the review before
  const isDisliked= usersDisliked.includes(user._id)
  if (isDisliked) {
      // if user dislike this review before : then first remove dislike then add like
    const r= filteredReviews.filter(e=> {
      if (e._id ===id) {
        e.dislike.pop(user._id)
        e.likedislike.push(user._id)
        return [...filteredReviews, e]
      }
    })

    // removing dislike from DB
    removeDislike(id, user._id)
    // adding like to DB
    addLike(id, user._id)
    // updating filtered review list with latest like dislike update
    setFilteredReviews(filteredReviews.map(obj=> r.find(o=> o._id===obj._id)|| obj))
    setLikeCount(likeCount+1)
  }else{
    // if user did not dislike this review before : then directly add like
    const r= filteredReviews.filter(e=> {
      if (e._id ===id) {
        e.likedislike.push(user._id)
        return [...filteredReviews, e]
      }
    })
    // adding like to DB
    addLike(id, user._id)
    // updating filtered review list with latest like dislike update
    setFilteredReviews(filteredReviews.map(obj=> r.find(o=> o._id===obj._id)|| obj))
    setLikeCount(likeCount+1)}  // increment the like count
  }
  


}
// this function is responsible for handle dislike to a comment/review
const handleDislike=(id)=>{

  // getting list of user(s) who dislike this review
  const usersDisliked= filteredReviews.filter(e=> e._id ===id)[0].dislike
  const isdisLiked= usersDisliked.includes(user._id)
  // checking if current user already disliked this review 
  if (isdisLiked) {
    alert('You already disliked this!')
    return;
  }
  // getting the list of users who liked this review
  const usersLiked= filteredReviews.filter(e=> e._id ===id)[0].likedislike

if (usersLiked.length>0 && usersLiked.includes(user._id)) {
  const isLiked= usersLiked.includes(user._id)
  if (isLiked) {
    // if the current user liked this : then execute this block of code
    // so first remove like from DB
    removeLike(id, user._id)
    // after that add dislike to DB
    addDislike(id, user._id)
    const r= filteredReviews.filter(e=> {
      if (e._id ===id) {
        e.likedislike.pop(user._id)
        e.dislike.push(user._id)
        return [...filteredReviews, e]
      }
    })
    // updating filtered review list with the latest like dislike update
    setFilteredReviews(filteredReviews.map(obj=> r.find(o=> o._id===obj._id)|| obj))
    setLikeCount(likeCount-1)  // decrement the like count
  }
  
}else{
// if the current user did not like this review : then execute this block of code
// therefore directly add dislike to DB
  addDislike(id, user._id)
    const r= filteredReviews.filter(e=> {
      if (e._id ===id) {
        e.dislike.push(user._id)
        return [...filteredReviews, e]
      }
    })
    // updating filtered review list with the latest like dislike update
    setFilteredReviews(filteredReviews.map(obj=> r.find(o=> o._id===obj._id)|| obj))
    setLikeCount(likeCount-1)   // decrement the like count


}

}


/**
* Change week according to the user selection
* @param {object} data Week to be selected
* @returns {string} Week that selected 
 
*/
const handleWeek=(data)=>{
setWeek(data)

const filteredReview= reviews.filter(single => single.week == data.toString())

// update filtered review list due to the change of the week
setFilteredReviews(filteredReview)

}
// console.log(reviews);

    let totalReview=0;
 

/**
* calculating of total review 
*/

    if (reviews.length>0) {
        totalReview= reviews.reduce((accumulator, object) => {
            return (accumulator + object.rating);
          },0);
        totalReview/=reviews.length;
        
    }
    const handleChange = ({ currentTarget: input }) => {
        if (input.name==='') {
            setData({ ...data, comment: input.value, week:week });
        }
        setData({ ...data, [input.name]: input.value, week: week });
      };

      // adding new review when user click on the submit button
    const handleSubmit=(e)=>{
        e.preventDefault()
        
        
       if (data.comment==='' || data.rating==='' || data.week==='' || data.rating==='choose here') {
        return
       }

       //  this function adds new review to DB
        handleAddReview(data)
                      .then((res) => { 
                        getRefereeDetails(id).then(res=>{
                            setReferee(res)
                          })
                          fetchReview(id).then(res=>{
                            setReviews(res)
                            setFilteredReviews(res.filter(single => single.week == week))
                          })
                        alert('review added successfully!')
                        setData({...data, comment:'', rating:'' })
                        // e.target.reset()
                      })
                      .catch((err) => console.log(err.response.data.message)) 
    }

    return (
        <div className='container ref-profile referee-container'>
            <div className="row my-5">
                <div className="col-md-6 d-flex justify-content-center">
                    <img src={referee.imageurl && referee.imageurl} width={280} height={260} alt="" />
                </div>
                <div className="col-md-6">
                    <div>
                    <h5>{referee.name&& referee.name}</h5>
                    <p>{referee.description&& referee.description}</p>
                    </div>

                    <div className='stats mt-5'>
                        <div className="row col-12">
                        <div className="col-8">Age</div>
                        <div className="col-4">{referee.age&& referee.age}</div>
                        </div>
                        <div className="row col-12">
                        <div className="col-8">Matches</div>
                        <div className="col-4">{referee.matches&& referee.matches}</div>
                        </div>
                        <div className="row col-12">
                        <div className="col-8">Yellow cards</div>
                        <div className="col-4">{referee.yellowcard&& referee.yellowcard}</div>
                        </div>
                        <div className="row col-12">
                        <div className="col-8">Red cards</div>
                        <div className="col-4">{referee.redcard&& referee.redcard}</div>
                        </div>

                        <div className="row col-12">
                        <div className="col-8">Rating</div>
                        <div className="col-4">
                           {referee.reviewcount>0 ?  <Rating rating={totalReview}/> :
                           'No Rating'}
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
            
            <div className="row review-section mt-5 mb-5">
                <div className="col-md-6 review-list ">
                  <p className='p-1 bg-primary col-6 text-center'>Displaying reviews for week {week.split('week')[1]}</p>

                    {filteredReviews.length>0 ? filteredReviews.map(single=>(
                        <div key={single._id} className='single-review p-2'>
                        <h6>{single.writtenBy}</h6>
                        <span><Rating rating={single.rating}/></span>
                        <span className='text-muted'>{single.createdAt.slice(0,10)}</span>
                        <p>{single.comment}</p>
                        <div className='like-icon'>
                          <span>{single.likedislike.length +' Like! '}</span>
                          {single.likedislike.includes(user._id)? <AiFillLike title='Like' className='bg-info likedislike-active font-size-25' onClick={()=>{ handleLikeDislike(single._id)}}></AiFillLike> :
                          <AiFillLike title='Like' className='bg-info font-size-25' onClick={()=>{ handleLikeDislike(single._id)}}></AiFillLike>  }
                          
                        </div>

                        <div className='like-icon'>
                          <span>{single.dislike.length +' Dislike! '}</span>
                          {single.dislike.includes(user._id)? <AiFillDislike title='Dislike' className='bg-danger likedislike-active font-size-25' onClick={()=>{ handleDislike(single._id)}}></AiFillDislike> : <AiFillDislike title='Dislike' className='bg-danger font-size-25' onClick={()=>{ handleDislike(single._id)}}></AiFillDislike>  }

                        </div>


                    </div>
                    )): <div className="alert alert-warning" role="alert">
                    No revies found for week {week.split('week')[1]}
                  </div>  }

                </div>



                <div className="col-md-6">
                    <form onSubmit={handleSubmit}>
                    
{/* this is week component here all the week list is showing. 
this component takes the handleweek function as it's props */}
    <SelectWeek handleWeek={handleWeek}/>



    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Rating</Form.Label>
        <Form.Select name='rating' aria-label="Default select example" required defaultValue={'choose here'} onChange={handleChange}>
      <option>Choose here</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
    </Form.Select>
      </Form.Group>
    <Form.Group className="mb-3" name='comment' controlId="exampleForm.ControlTextarea1">
        <Form.Label>Comment</Form.Label>
        <Form.Control as="textarea" onChange={handleChange} required name='comment' rows={3} value={data.comment} />
      </Form.Group>
      <button type='submit' className='btn btn-primary mb-5'>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RefereeProfile;