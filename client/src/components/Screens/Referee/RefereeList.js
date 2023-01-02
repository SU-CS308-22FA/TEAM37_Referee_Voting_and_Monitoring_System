import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Rating from './Rating';
import { fetchReview } from '../../axios';

const RefereeList = ({referee}) => {
  const [reviews, setReviews] = useState([]);
  useEffect(()=>{
   
    fetchReview(referee._id).then(res=>{
      setReviews(res)
      
    })
  },[])

  let totalReview=0;
    if (reviews.length>0) {
        totalReview= reviews.reduce((accumulator, object) => {
            return (accumulator + object.rating*1);
          },0);
        totalReview/=reviews.length;
        
    }
    return (
        <>
           
                <div  className="col-md-4 col-lg-3 mb-5 ref-card">
                <Link to={`/referee/${referee._id}`}>
                <Card >
                    <Card.Img variant="top" src={referee.imageurl} />
                    <Card.Body>
                      <Card.Title>{referee.name}</Card.Title>
                      {referee.reviewcount>0 && <Rating rating={totalReview}/>}

                      <Card.Text>
                        {referee.description.slice(0,80)+'...'}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
                </div>
           
          
        </>
    );
};

export default RefereeList;