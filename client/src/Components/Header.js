import React, { useEffect } from "react";
import { Navbar, Nav, Container, Button, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
const Header = ({ user, setUser }) => {
  useEffect(() => {
    if (localStorage.getItem("user") && !user) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, [user]);
  return (
    <Navbar className="py-4 " bg="success" expand="lg">
      <Container>
        <Navbar.Brand className="text-white">
          Referee Voting and Monitoring System
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className="text-white">Homepage</Nav.Link>
            <Nav.Link></Nav.Link>
            <NavDropdown
              title={<span className="text-white">About Us</span>}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item>About Football</NavDropdown.Item>
              <NavDropdown.Item>Referee List</NavDropdown.Item>
              <NavDropdown.Item>Our Team </NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        {user ? (
        <> <h2> {user.fullname} </h2>
          <Button
            variant="outline-light"
            onClick={(e) => {
              localStorage.removeItem("user");
              setUser(null);
            }}
          >
            {" "}
            Sign Out{" "}
          </Button>
        </>
        ) : (
          <Button variant="outline-light">
            <Link className="text-white text-decoration-none" to="/signin">
              Sign In
            </Link>
          </Button>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
