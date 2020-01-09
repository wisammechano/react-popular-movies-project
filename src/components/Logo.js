import React from "react";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
export const Logo = props => {
  return (
    <>
      <Navbar.Brand
        as={Link}
        to="/"
        className="brand-font d-none d-sm-inline-block"
      >
        {props.appName}
      </Navbar.Brand>
      <Navbar.Brand as={Link} to="/" className="brand-font d-sm-none">
        {props.appName
          .split(" ")
          .map(w => w[0])
          .join("")}
      </Navbar.Brand>
    </>
  );
};
