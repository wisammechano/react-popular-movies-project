import React, { Component } from "react";
import "./Main.css";

import { fetchMoviesList } from "./actions";

import { connect } from "react-redux";

class Main extends Component {
  render() {
    return (
      <>
        <div className="App">Main Page</div>
        <button onClick={e => this.props.dispatch(fetchMoviesList())}>
          Load Movies
        </button>
      </>
    );
  }
}

export default connect(null, null)(Main);
