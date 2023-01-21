import React, { useState } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import login from "../images/clipboard_vectorized.png";

const Login = () => {
  const [validated, setValidated] = useState(false);
  const Navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",

    password: "",
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
        email: user.email,

        password: user.password,
      };

      const response = await axios.post(
        "http://localhost:5000/api/auth/signin",
        Info,
        { withCredentials: true }
      );
      if (response.status === 200) {
        alert(`${response.data.user} ${response.data.message}`);

        Navigate("/");
      }
    } catch (e) {
      if (e.response.status === 400) {
        alert(e.response.data);
      } else {
        alert(e.message);
      }
    }
  };
  return (
    <div className="form-div">
      <div className="form-box">
        <Row className="d-flex justify-content-center align-items-center row">
          <Col md={5}>
            <div className="file">
              <h1>Login</h1>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
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

                <Button variant="warning" className="mt-3 mb-3" type="submit">
                  Log In
                </Button>
              </Form>
            </div>
          </Col>
          <Col md={6}>
            <div className="information">
              <img src={login} alt="login" />
              <p>
                New?{" "}
                <Link style={{ color: "white" }} to="/signup">
                  Create an account
                </Link>
              </p>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Login;
