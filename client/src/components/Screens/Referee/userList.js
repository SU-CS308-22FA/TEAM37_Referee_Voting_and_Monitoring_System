import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Rating from './Rating';
import { requestUsers } from '../../axios';

const userList = ({referee}) => {
  const [users, setusers] = useState([]);
  useEffect(()=>{
   
    requestUsers(users._id).then(res=>{
        setusers(res)
      
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
                <Link to={`/profile/${users._id}/update`}>
                <Card >                   
                  </Card>
                </Link>
                </div>
           
          
        </>
    );
};

export default userList;