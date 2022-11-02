import React, { useState } from "react";
import { Button, Form, Row, Col, InputGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { change } from "../axios";
const HomeScreen = ({ user }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: "",
  });

  return (
    <div>
      {user ? (
        <>
          <h1>{"Welcome " + user.fullname}</h1>
          <br></br>
          <h2>My Profile</h2>
          <hr></hr>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              change(formData)
                .then((res) => {
                  navigate("/");
                })
                .catch((err) => console.log(err));
            }}
          >
            <Row className="align-items-center">
              <Col xs="auto">
                <p>
                  <b>My Name: </b>
                  {user.fullname}
                </p>
              </Col>
              <Col xs="auto">
                <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
                  Username
                </Form.Label>
                <InputGroup className="mb-2">
                  <InputGroup.Text></InputGroup.Text>
                  <Form.Control
                  onChange={(e) =>
                    setFormData({ ...formData, fullname: e.target.value })
                  }
                    id="inlineFormInputGroup"
                    placeholder="New Name"
                  />
                </InputGroup>
              </Col>

              <Col xs="auto">
                <Button type="submit" className="mb-2" variant="success">
                  Change my name
                </Button>
              </Col>
            </Row>
          </Form>
        </>
      ) : (
        <h1> HOMEPAGE</h1>
      )}
    </div>
  );
};

export default HomeScreen;
