import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Home.css";
const Home = () => {
  const [name, setName] = useState("");

  const GetAbout = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/auth/get", {
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
    <div className="home ">
      <div>
        <h3>Welcome</h3>
        <h1>{name}</h1>

        <h1 className="mt-3">
          {name ? "Nice to see you back" : "Web Developer Page"}
        </h1>
      </div>
    </div>
  );
};

export default Home;