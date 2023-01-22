import axios from "axios";
import React, { useEffect, useState } from "react";
import NavbarAdd from "../Navbar/NavbarAdd";
import "./Home.css";
const Home = () => {
  const URL = process.env.REACT_APP_APP_URL;
  const [name, setName] = useState("");

  const GetAbout = async () => {
    try {
      const response = await axios.get(`${URL}/api/auth/get`, {
        withCredentials: true,
      });

      if (!response.status === 200) {
        throw new Error(response.error);
      } else {
        setName(response.data.name);
      }
    } catch (e) {
      console.log(e.message);
    }
  };
  useEffect(() => {
    GetAbout();
  });
  return (
    <>
      <NavbarAdd />
      <div className="home ">
        <div>
          <h3>Welcome</h3>
          <h1>{name}</h1>

          <h1 className="mt-3">
            {name ? "Nice to see you back" : "Web Developer Page"}
          </h1>
        </div>
      </div>
    </>
  );
};

export default Home;
