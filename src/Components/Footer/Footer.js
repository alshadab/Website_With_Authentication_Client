import React from "react";
import "./Footer.css";
const Footer = () => {
  const year = new Date().getFullYear();
  return <footer>All Rights Reserved By Al Shadab Arnab | {year}</footer>;
};

export default Footer;
