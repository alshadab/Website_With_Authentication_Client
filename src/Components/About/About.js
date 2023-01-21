import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const About = () => {
  const Navigate = useNavigate();
  const [data, setData] = useState({});
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
  return (
    <Container className="mt-5">
      <h1>ID: {data._id}</h1>
      <h1>Name: {data.name}</h1>
      <h1>Phone: {data.phone}</h1>
      <h1>Email: {data.email}</h1>
    </Container>
  );
};

export default About;
