import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { handleDeleteReferee } from '../../axios';


const RefereeList = ({referee}) => {


     function deleteHandler (id)  {
     
           //handleDeleteReferee(id);
           console.log(id);
           
      }
    return (
        <>
            {referee? referee.map(single=>(
                <div key={single._id} className="col-md-4 col-lg-3 mb-5 ref-card">
                
                <Card style={{ width: '10.5rem' }}>
                    <Card.Img variant="top" src={single.imageurl} />
                    <Card.Body>
                      <Card.Title>{single.name}</Card.Title>

                      <Card.Text>
                        {single.description.slice(0,80)+'...'}
                      </Card.Text>               
                      <Card.Link variant ="danger" href={`/refereePanel/updateReferee/${single._id}`}>Update</Card.Link>
                      <Card.Link variant ="danger" href={`/refereePanel/deleteReferee/${single._id}`}>Delete</Card.Link>
                      <Card.Link variant ="danger" href="/refereePanel/addReferee/" >Add </Card.Link>                            
                    </Card.Body>
                  </Card>
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