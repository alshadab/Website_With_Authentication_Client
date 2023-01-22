import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import axios from "axios";
import login from "../images/clipboard_vectorized.png";
import "../Login/Login.css";
import NavbarAdd from "../Navbar/NavbarAdd";
const SignUp = () => {
  const URL = process.env.REACT_APP_APP_URL;
  const [validated, setValidated] = useState(false);

  const Navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    cPassword: "",
  });

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    try {
      const Info = {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        password: user.password,
        cPassword: user.cPassword,
      };

      const response = await axios.post(`${URL}/api/auth/signup`, Info);
      if (response.status === 201) {
        alert(response.data.message);
        Navigate("/login");
      }
    } catch (e) {
      if (e.response.status === 400) {
        alert(e.response.data.message);
      } else {
        alert(e.message);
      }
    }
  };
  return (
    <>
      <NavbarAdd />
      <div className="form-div">
        <div className="form-box">
          <Row className="d-flex justify-content-center align-items-center row">
            <Col md={5}>
              <div className="file">
                <h1>Sign Up</h1>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
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
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                      Please provide a Name.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="validationCustom02">
                    <Form.Control
                      required
                      type="number"
                      placeholder="Phone start without 0"
                      value={user.phone}
                      onChange={handleChange}
                      name="phone"
                      className="control"
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                      Please provide Phone Number.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="validationCustom05">
                    <Form.Control
                      required
                      type="text"
                      placeholder="Address"
                      value={user.address}
                      onChange={handleChange}
                      name="address"
                      className="control"
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                      Please provide a Address.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="validationCustomUsername">
                    <InputGroup hasValidation>
                      <Form.Control
                        type="email"
                        placeholder="User Email"
                        aria-describedby="inputGroupPrepend"
                        required
                        value={user.email}
                        onChange={handleChange}
                        name="email"
                        className="control"
                      />
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid">
                        Please choose a Email.
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>

                  <Form.Group controlId="validationCustom03">
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      required
                      value={user.password}
                      onChange={handleChange}
                      name="password"
                      className="control"
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                      Please provide a Password.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="validationCustom04">
                    <Form.Control
                      type="password"
                      placeholder="Confirm Password"
                      required
                      value={user.cPassword}
                      onChange={handleChange}
                      name="cPassword"
                      className="control"
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                      Please provide Confirm Password.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Button variant="warning" className="mt-3 mb-3" type="submit">
                    Sign Up
                  </Button>
                </Form>
              </div>
            </Col>
            <Col md={6}>
              <div className="information">
                <img src={login} alt="login" />
                <p>
                  <Link style={{ color: "white" }} to="/login">
                    Already Have an Account?
                  </Link>
                </p>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default SignUp;
