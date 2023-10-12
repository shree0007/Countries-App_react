import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';
import { auth, logout } from '../auth/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';




const Layout = () => {

  const [user] = useAuthState(auth);
  return (
    <Container fluid>
      <Row>
        <Navbar bg="success" variant="dark">
          <Container className="justify-content-end">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav>
                <LinkContainer to="/">
                  <Nav.Link>Home</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/countries">
                  <Nav.Link>Countries</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/favourites">
                  <Nav.Link>Favourites</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link>Register</Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
            {user ? (
              <Button variant='success' className='border-white' onClick={logout}>Logout</Button>) :
              <Link to="/login"> <Button variant='success' className='border-white'>Login</Button></Link>
            }

          </Container>
        </Navbar>
      </Row>
      <Row >
        <Outlet />
      </Row>
      <Row className='sm py-5 bg-dark text-center'>
        <div className='footer' style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <small className='text-white-50'>&copy; Copyright Shree's Countries App 2023  </small>
          <div className='icons mx-5'>
            <a href="https://www.facebook.com/groups/768403813253721"><FaFacebook className='icon fs-4  mx-2 text-success' /></a>
            <a href='https://twitter.com/'><FaTwitter className='icon fs-4 mx-2 text-success' /></a>
            <a href='https://www.instagram.com/countries_pictures/'><FaInstagram className='icon fs-4 mx-2 text-success' /></a>
          </div>
        </div>
      </Row>
    </Container>
  );
};

export default Layout;
