import React from "react";
import { useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import HomePage from "./HomePage";
import MoviePage from "./MoviePage";
import "./Main.css";
import FilmBar from "./ProgressBarOverlay";

const Main = props => {
  const isLoading = useSelector(
    state => !state.home.genresLoaded && !state.home.configsLoaded
  );

  return (
    <div className="App">
      {isLoading && <FilmBar />}
      <Header appName={props.appName} />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/movie/:id" component={MoviePage} />
      </Switch>
      <Footer />
    </div>
  );
};

export default Main;
