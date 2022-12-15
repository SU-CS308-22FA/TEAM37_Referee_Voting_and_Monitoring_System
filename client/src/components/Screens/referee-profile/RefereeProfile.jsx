import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { AiFillDislike,AiFillLike } from "react-icons/ai";
import {GoReport as GoReport} from "react-icons/go";
import { useParams } from 'react-router-dom';
import { addDislike, addLike, fetchReview, getRefereeDetails, handleAddReview, removeDislike, removeLike,addReport } from '../../axios';
import Rating from '../Referee/Rating';
import SelectWeek from './SelectWeek';
const RefereeProfile = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    let { id } = useParams();
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
      fetchReview(id, week).then(res=>{
        setReviews(res)
        setFilteredReviews(res.filter(e=>e.week===week))
      })
    },[id])
    
   
const handleLikeDislike=(id)=>{

const usersLiked= filteredReviews.filter(e=> e._id ===id)[0].likedislike

setLikeCount(usersLiked.length)
if (usersLiked.length>0 && usersLiked.includes(user._id)) {
  const isLiked= usersLiked.includes(user._id)
  if (isLiked) {
    removeLike(id, user._id)
    const r= filteredReviews.filter(e=> {
      if (e._id ===id) {
        
        e.likedislike.pop(user._id)
        return [...filteredReviews, e]
      }
    })
    setFilteredReviews(filteredReviews.map(obj=> r.find(o=> o._id===obj._id)|| obj))
    setLikeCount(likeCount-1)
    
  }
  
}else{
  
  const usersDisliked= filteredReviews.filter(e=> e._id ===id)[0].dislike
  const isDisliked= usersDisliked.includes(user._id)
  if (isDisliked) {
    const r= filteredReviews.filter(e=> {
      if (e._id ===id) {
        e.dislike.pop(user._id)
        e.likedislike.push(user._id)
        return [...filteredReviews, e]
      }
    })
    removeDislike(id, user._id)
    addLike(id, user._id)
    setFilteredReviews(filteredReviews.map(obj=> r.find(o=> o._id===obj._id)|| obj))
    setLikeCount(likeCount+1)
  }else{
    const r= filteredReviews.filter(e=> {
      if (e._id ===id) {
        e.likedislike.push(user._id)
        return [...filteredReviews, e]
      }
    })
    addLike(id, user._id)
    setFilteredReviews(filteredReviews.map(obj=> r.find(o=> o._id===obj._id)|| obj))
    setLikeCount(likeCount+1)}
  }
  


}

const handleDislike=(id)=>{

  const usersDisliked= filteredReviews.filter(e=> e._id ===id)[0].dislike
  const isdisLiked= usersDisliked.includes(user._id)
  if (isdisLiked) {
    
    removeDislike(id, user._id)
    const r= filteredReviews.filter(e=> {
      if (e._id ===id) {
        
        e.dislike.pop(user._id)
        return [...filteredReviews, e]
      }
    })
    setFilteredReviews(filteredReviews.map(obj=> r.find(o=> o._id===obj._id)|| obj))
    setLikeCount(likeCount-1)
    
  }
  else{
    const usersLiked= filteredReviews.filter(e=> e._id ===id)[0].likedislike

    if (usersLiked.length>0 && usersLiked.includes(user._id)) {
      const isLiked= usersLiked.includes(user._id)
      if (isLiked) {
        
        removeLike(id, user._id)
        addDislike(id, user._id)
        const r= filteredReviews.filter(e=> {
          if (e._id ===id) {
            e.likedislike.pop(user._id)
            e.dislike.push(user._id)
            return [...filteredReviews, e]
          }
        })
        setFilteredReviews(filteredReviews.map(obj=> r.find(o=> o._id===obj._id)|| obj))
        setLikeCount(likeCount-1)
      }
      
    }else{
    
      addDislike(id, user._id)
        const r= filteredReviews.filter(e=> {
          if (e._id ===id) {
            e.dislike.push(user._id)
            return [...filteredReviews, e]
          }
        })
        setFilteredReviews(filteredReviews.map(obj=> r.find(o=> o._id===obj._id)|| obj))
        setLikeCount(likeCount-1)
  }

  

}

}
/**
 * Get color corresponding to a id report comment
 * @param {string} id Report the comment with respect to the comments Object id.
 * @returns [...filteredReviews, e]  
 *  
 */
const handleReport=(id)=>{
  
  const userReport= filteredReviews.filter(e=> e._id ===id)[0].report
  const userReported= userReport.includes(user._id)
  if(userReported){
    alert('You have already reported this comment, thanks for supporting us for improving our community')
    return;
    
  }
  else{
    addReport(id, user._id)
    const r= filteredReviews.filter(e=> {
      if (e._id ===id && window.confirm("Are you sure you want to report the comment?")) {
        alert('You have reported this comment')
        e.report.push(user._id)     
        return [...filteredReviews, e]        
      }
    })
    setFilteredReviews(filteredReviews.map(obj=> r.find(o=> o._id===obj._id)|| obj))
  }

}

const handleWeek=(data)=>{
setWeek(data)

const filteredReview= reviews.filter(single => single.week == data.toString())

setFilteredReviews(filteredReview)

}
// console.log(reviews);

    let totalReview=0;
 

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
    const handleSubmit=(e)=>{
        e.preventDefault()
        
        
       if (data.comment==='' || data.rating==='' || data.week==='' || data.rating==='choose here') {
        return
       }
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
                        <div className= 'report-icon'>
                        <span>{'REPORT! '}</span>
                        {single.report.includes(user._id)? <GoReport title='Report' className='bg-info report-icon font-size-25' onClick={()=>{ handleReport(single._id)}}></GoReport> :
                          <GoReport title='Report' className='bg-info font-size-25' onClick={()=>{ handleReport(single._id)}}></GoReport>  }
                          
                          </div>


                    </div>
                    )): <div className="alert alert-warning" role="alert">
                    No reviews found for week {week.split('week')[1]}
                  </div>  }

                </div>



                <div className="col-md-6">
                    <form onSubmit={handleSubmit}>
                    

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