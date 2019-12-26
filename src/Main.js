import React, { Component } from "react";
import { fetchMoviesList } from "./actions";
import "./Main.css";

import { connect } from "react-redux";

const mapStateToProps = (state, ownProps) => ({});

//const mapDispatchToProps = dispatch => ({});
class Main extends Component {
  render() {
    const { dispatch } = this.props;

    return (
      <div className="App">
        <button onClick={e => dispatch(fetchMoviesList())}>Load</button>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Main);
