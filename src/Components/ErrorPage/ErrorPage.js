import React from "react";
import { Link } from "react-router-dom";
import "./Error.css";
const ErrorPage = () => {
  return (
    <div className="error">
      <h1>404</h1>
      <h4>Page Not Found</h4>
      <p>
        The page you are looking for might have been removed had its name <br />
        changed or is temporally unavailable
      </p>
      <button>
        <Link to="/"> Go to Home Page</Link>
      </button>
    </div>
  );
};

export default ErrorPage;
