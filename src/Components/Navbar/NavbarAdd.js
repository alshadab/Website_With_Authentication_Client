import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
const NavbarAdd = () => {
  return (
    <Navbar
      fixed="top "
      bg="white"
      className="d-flex justify-content-between"
      expand="lg"
    >
      <Container>
        <Navbar.Brand>
          <NavLink style={{ textDecoration: "none", color: "#61876E" }} to="/">
            Develop Verse
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="bar" id="basic-navbar-nav">
          <Nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/contact">Contact</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup">Signup</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarAdd;
