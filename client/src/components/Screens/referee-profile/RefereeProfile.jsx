import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router-dom';
import { fetchReview, getRefereeDetails, handleAddReview } from '../../axios';
import Rating from '../Referee/Rating';
const RefereeProfile = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    let { id } = useParams();
    const [referee, setReferee] = useState({});
    const [reviews, setReviews] = useState([]);
    const [data, setData] = useState({referee:id, writtenBy: user.fullname , comment:'', rating:'' });

 
  
   
    useEffect(()=>{
      getRefereeDetails(id).then(res=>{
        setReferee(res)
      })
      fetchReview(id).then(res=>{
        setReviews(res)
      })
    },[id])

    let totalReview=0;
 

    if (reviews.length>0) {
        totalReview= reviews.reduce((accumulator, object) => {
            return (accumulator + object.rating);
          },0);
        totalReview/=reviews.length;
        
    }
    const handleChange = ({ currentTarget: input }) => {
        if (input.name==='') {
            setData({ ...data, comment: input.value });
        }
        setData({ ...data, [input.name]: input.value });
      };
    const handleSubmit=(e)=>{
        e.preventDefault()
       if (data.comment==='' || data.rating==='' || data.rating==='choose here') {
        return
       }
        handleAddReview(data)
                      .then((res) => { 
                        getRefereeDetails(id).then(res=>{
                            setReferee(res)
                          })
                          fetchReview(id).then(res=>{
                            setReviews(res)
                          })
                        alert('review added successfully!')
                        setData({...data, comment:'', rating:'' })
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
            
            <div className="row review-section mt-5">
                <div className="col-md-6 review-list ">

                    {reviews&& reviews.map(single=>(
                        <div key={single._id} className='single-review p-2'>
                        <h6>{single.writtenBy}</h6>
                        <span><Rating rating={single.rating}/></span>
                        <span className='text-muted'>{single.createdAt.slice(0,10)}</span>
                        <p>{single.comment}</p>
                    </div>
                    ))}

                </div>



                <div className="col-md-6">
                    <form onSubmit={handleSubmit}>
                    

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
        <Form.Label>Example textarea</Form.Label>
        <Form.Control as="textarea" onChange={handleChange} required name='comment' rows={3} value={data.comment} />
      </Form.Group>
      <button type='submit' className='btn btn-primary'>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RefereeProfile;