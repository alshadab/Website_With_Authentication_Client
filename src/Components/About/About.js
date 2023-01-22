import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./About.css";
import NavbarAdd from "../Navbar/NavbarAdd";
import user from "../images/user.png";
const About = () => {
  const URL = process.env.REACT_APP_APP_URL;
  const Navigate = useNavigate();
  const [data, setData] = useState({});
  const GetAbout = async () => {
    try {
      const response = await axios.get(`${URL}/api/auth/get`, {
        withCredentials: true,
      });

      if (!response.status === 200) {
        throw new Error(response.error);
      } else {
        setData(response.data);
      }
    } catch (e) {
      console.log(e.message);
      Navigate("/login");
    }
  };
  useEffect(() => {
    GetAbout();
  });

  return (
    <>
      <NavbarAdd />
      <Container className="mt-5 dis ">
        <div className="mainDiv">
          <Row className="d-flex justify-content-around ">
            <Col md={5}>
              <img src={user} alt="user" className="imag" />
            </Col>

            <Col md={6} className="text">
              <h1>
                <span
                  style={{
                    borderBottom: "1px solid black",
                    paddingBottom: "15px",
                    color: "#00337C",
                  }}
                >
                  NAME: {data.name}
                </span>
              </h1>
              <span className="mt-4" style={{ color: "#4E6C50" }}>
                <p>ID: {data._id}</p>
                <p>EMAIL: {data.email}</p>
                <p>PHONE: {data.phone}</p>
                <p>ADDRESS: {data.address}</p>
              </span>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
};

export default About;
