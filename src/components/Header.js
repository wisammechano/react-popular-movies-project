import React from "react";
import { Navbar, FormControl, Nav, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./Header.css";
const Header = ({ appName }) => {
  return (
    <Navbar variant="dark" bg="dark" sticky="top">
      <Logo appName={appName} />
      <Form className="ml-auto mr-sm-4" id="search-form">
        <div className="has-search">
          <span className="form-control-feedback">
            <FontAwesomeIcon icon={faSearch} />
          </span>
          <FormControl
            type="text"
            placeholder="Search Movies"
            aria-label="Type your query to search movies"
          />
        </div>
      </Form>
      {/* <CollapsableNavbar /> */}
    </Navbar>
  );
};

export default Header;

const Logo = props => {
  return (
    <>
      <Navbar.Brand href="home" className="brand-font d-none d-sm-inline-block">
        {props.appName}
      </Navbar.Brand>
      <Navbar.Brand href="home" className="brand-font d-sm-none">
        {props.appName
          .split(" ")
          .map(w => w[0])
          .join("")}
      </Navbar.Brand>
    </>
  );
};

const CollapsableNavbar = () => {
  return (
    <>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href="home">Home</Nav.Link>
          <Nav.Link href="features">Features</Nav.Link>
          <Nav.Link href="pricing">Pricing</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </>
  );
};
