import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import "./Main.css";
import { fetchConfigurations, fetchGenresList } from "../actions";

const Main = props => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchGenresList());
    dispatch(fetchConfigurations());
  });

  return (
    <div className="App">
      <Header appName={props.appName} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" render={() => <div>About</div>} />
      </Switch>
      <Footer />
    </div>
  );
};

export default Main;
