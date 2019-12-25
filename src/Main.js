import React, { Component } from "react";
import "./Main.css";

import { connect } from "react-redux";

const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = dispatch => ({});
class Main extends Component {
  render() {
    return (
      <div className="App">
        <h1>Hello World!</h1>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
