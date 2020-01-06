import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import "./Main.css";

const Main = props => {
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
