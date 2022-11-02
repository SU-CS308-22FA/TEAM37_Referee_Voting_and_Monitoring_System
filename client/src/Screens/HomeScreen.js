import React, { useState } from "react";
import { Navbar, Nav, Container, Button, NavDropdown, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const HomeScreen = ({ user }) => {

  const [formData, setFormData] = useState({
    fullname: ""
    
  });

  return <div>
     { user ? (
        <> <h2> {'Welcome '+ user.fullname} </h2>
         <Container>
            <Row className="justify-content-center">
              <Col xs={12} md={6}>
                
              </Col>
            </Row>
         </Container>
        </>
        ) : 
        (
         <h1> HOMEPAGE</h1>
        )}
        </div>;
  

};


export default HomeScreen;
