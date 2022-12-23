import React, { useRef, useState } from 'react'
import axios from '../axios';
import { Navbar, Button, Nav, NavDropdown, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import { logout, resetNotifications } from '../storeService/userSlice';
import {Link} from 'react-router-dom';
import '../styles/Navigation.css'

function Navigation() {
  const user = useSelector((state) => state.user);
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logout());
  }

  const unreadNotifications = user?.notifications?.reduce((acc, current) => {
    if (current.status === "unread") return acc + 1;
    return acc;
}, 0);

  return (

    <Navbar className="navbar navbar-light"  style={{backgroundColor: "#ffa812"}} expand="lg">
      <Container>
               <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">

            {/* if no user */}

            {!user && (
              <LinkContainer to="/login">
                <Nav.Link><b>LOGIN</b></Nav.Link>              
              </LinkContainer>
            )}
            
                      {/* if it is a user */}
            {user && (
                <>
                             <NavDropdown title={`${user.name}`} id="basic-nav-dropdown">
             
                    <LinkContainer to="/profiles">
                      <NavDropdown.Item>Dashboard</NavDropdown.Item>
                    </LinkContainer>
                
              
                            <NavDropdown.Divider />
                <Button variant="danger" onClick={handleLogout} className="logout-btn">
                  Logout
                </Button>
              </NavDropdown>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
         </Navbar>

  )
}
export default Navigation