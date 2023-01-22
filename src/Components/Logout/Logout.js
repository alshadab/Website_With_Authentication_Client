import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const URL = process.env.REACT_APP_APP_URL;
  const Navigate = useNavigate();

  const Get = async () => {
    try {
      const response = await axios.get(`${URL}/api/auth/logout`, {
        withCredentials: true,
      });

      if (!response.status === 200) {
        throw new Error(response.error);
      } else {
        Navigate("/login");
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    Get();
  });
  return <div>Logout</div>;
};

export default Logout;
