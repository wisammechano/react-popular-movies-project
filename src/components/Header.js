import React from "react";
import { Navbar } from "react-bootstrap";
import { SearchForm } from "./SearchForm";
import { Logo } from "./Logo";

const Header = ({ appName }) => {
  return (
    <Navbar variant="dark" bg="dark" sticky="top">
      <Logo appName={appName} />
      <SearchForm />
    </Navbar>
  );
};

export default Header;
