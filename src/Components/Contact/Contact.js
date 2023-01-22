import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

import {
  faEnvelope,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import "./Contact.css";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";

import NavbarAdd from "../Navbar/NavbarAdd";
const Contact = () => {
  const URL = process.env.REACT_APP_APP_URL;

  const [data, setData] = useState({});
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [state, setState] = useState(false);
  const [validated, setValidated] = useState(false);

  //Get Input Value
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser({ ...user, [name]: value });
  };
  //Get Data
  const GetAbout = async () => {
    try {
      const response = await axios.get(`${URL}/api/auth/get`, {
        withCredentials: true,
      });

      if (!response.status === 200) {
        throw new Error(response.error);
      } else {
        setData(response.data);
        setState(true);
      }
    } catch (e) {
      console.log(e.message);
    }
  };
  useEffect(() => {
    GetAbout();
  });

  //Submit Data
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);
    try {
      const Info = {
        name: user.name,
        email: user.email,
        phone: user.phone,
        message: user.message,
      };

      const response = await axios.post(`${URL}/api/auth/contact`, Info, {
        withCredentials: true,
      });
      if (response.status === 201) {
        alert(response.data);
        setUser({ ...user, message: "" });
      }
    } catch (e) {
      if (e.response.status === 400) {
        alert(e.response.data.error);
        console.log(e);
      } else {
        alert(e.message);
        console.log(e);
      }
    }
  };

  return (
    <>
      <NavbarAdd />
      <Container>
        <div className="main-div">
          <Row>
            <Col md={4}>
              <div className="box">
                <p>
                  <FontAwesomeIcon
                    style={{ color: "#8EA7E9" }}
                    icon={faPhone}
                  />
                </p>
                <p>{state ? data.phone : "Phone"}</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="box">
                <p>
                  <FontAwesomeIcon
                    style={{ color: "#8EA7E9" }}
                    icon={faEnvelope}
                  />
                </p>
                <p>{state ? data.email : "Email"}</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="box">
                <p>
                  <FontAwesomeIcon
                    style={{ color: "#8EA7E9" }}
                    icon={faLocationDot}
                  />
                </p>
                <p>{state ? data.address : "Address"}</p>
              </div>
            </Col>
          </Row>
        </div>
        <div className="text-box">
          <Container>
            <h1>Get in Touch</h1>
            <div>
              <Form
                className="text-field"
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
              >
                <Row>
                  <Col md={12}>
                    <Row>
                      <Col md={4}>
                        <Form.Group controlId="validationCustom01">
                          <Form.Control
                            required
                            type="text"
                            placeholder="Name"
                            value={user.name}
                            onChange={handleChange}
                            name="name"
                            className="control"
                          />
                          <Form.Control.Feedback>
                            Looks good!
                          </Form.Control.Feedback>
                          <Form.Control.Feedback type="invalid">
                            Please provide a Name.
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group controlId="validationCustom02">
                          <Form.Control
                            required
                            type="number"
                            placeholder="Phone"
                            value={user.phone}
                            onChange={handleChange}
                            name="phone"
                            className="control"
                          />
                          <Form.Control.Feedback>
                            Looks good!
                          </Form.Control.Feedback>
                          <Form.Control.Feedback type="invalid">
                            Please provide Phone Number.
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group controlId="validationCustom01">
                          <Form.Control
                            required
                            type="email"
                            placeholder="Email"
                            value={user.email}
                            onChange={handleChange}
                            name="email"
                            className="control"
                          />
                          <Form.Control.Feedback>
                            Looks good!
                          </Form.Control.Feedback>
                          <Form.Control.Feedback type="invalid">
                            Please provide a Email.
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                  </Col>
                  <Col md={12}>
                    <InputGroup
                      controlId="validationCustom01"
                      className="inputGroup"
                    >
                      <Form.Control
                        value={user.message}
                        required
                        onChange={handleChange}
                        name="message"
                        rows="7"
                        placeholder="Type Here Message"
                        as="textarea"
                        aria-label="With textarea"
                      />
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid">
                        Please provide Message.
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Col>
                  <Button
                    variant="warning"
                    className="mt-3 mb-3 btstyle"
                    type="submit"
                  >
                    Send Message
                  </Button>
                </Row>
              </Form>
            </div>
          </Container>
        </div>
      </Container>
    </>
  );
};

export default Contact;
