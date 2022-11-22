import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Rating from './Rating';

const RefereeList = ({referee}) => {

    return (
        <>
            {referee? referee.map(single=>(
                <div key={single._id} className="col-md-4 col-lg-3 mb-5 ref-card">
                <Link to={`/referee/${single._id}`}>
                <Card >
                    <Card.Img variant="top" src={single.imageurl} />
                    <Card.Body>
                      <Card.Title>{single.name}</Card.Title>
                      {single.reviewcount>0 && <Rating rating={single.rating/single.reviewcount}/>}

                      <Card.Text>
                        {single.description.slice(0,80)+'...'}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
                </div>
            )):
            <div class="alert alert-warning" role="alert">
  No referee found!
</div>
            }
        </>
    );
};

export default RefereeList;