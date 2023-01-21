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
import { useNavigate } from "react-router-dom";
const Contact = () => {
  const Navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [data, setData] = useState({});
  const [validated, setValidated] = useState(false);
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({ ...user, [name]: value });
  };
  //Get Data
  const GetAbout = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/auth/get", {
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
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <Container>
      <div className="main-div">
        <Row>
          <Col md={4}>
            <div className="box">
              <p>
                <FontAwesomeIcon style={{ color: "#8EA7E9" }} icon={faPhone} />
              </p>
              <p>{data.phone}</p>
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
              <p>{data.email}</p>
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
              <p>{data.address}</p>
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
  );
};

export default Contact;