import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import "./Navbar.css";
const NavbarAdd = () => {
  const [state, setState] = useState(false);
  const URL = process.env.REACT_APP_APP_URL;
  const [info, setInfo] = useState({});
  const GetAbout = async () => {
    try {
      const response = await axios.get(`${URL}/api/auth/get`, {
        withCredentials: true,
      });

      if (!response.status === 200) {
        throw new Error(response.error);
      } else {
        setInfo(response.data);
        setState(true);
      }
    } catch (e) {
      console.log(e.message);
    }
  };
  useEffect(() => {
    GetAbout();
  });

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
            <h3>MERN Project</h3>
          </NavLink>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="bar" id="basic-navbar-nav">
          <Nav>
            {state ? (
              <>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/contact">Contact</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/logout">Logout</NavLink>
              </>
            ) : (
              <>
                {" "}
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/signup">Signup</NavLink>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarAdd;
