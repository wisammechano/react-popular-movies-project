import React from "react";
import { useDispatch } from "react-redux";
import { Navbar, Button } from "react-bootstrap";
import { SearchForm } from "./SearchForm";
import { Logo } from "./Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { toggleSettingsModal } from "../actions";

const Header = ({ appName, className }) => {
  const dispatch = useDispatch();
  const showSettings = e => {
    dispatch(toggleSettingsModal(true));
  };
  return (
    <Navbar variant="dark" bg="dark" sticky="top" className={className}>
      <Logo appName={appName} />
      <Button
        variant="link"
        onClick={showSettings}
        className="p-0 mr-3 text-secondary"
      >
        <FontAwesomeIcon icon={faCog} />
      </Button>
      <SearchForm />
    </Navbar>
  );
};

export default Header;
