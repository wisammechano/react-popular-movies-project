import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Main from "./components/Main";
import { Provider } from "react-redux";
import configStore, { history } from "./store";
import { ConnectedRouter } from "connected-react-router";
import { APP_NAME } from "./constants";

const store = configStore(/* provide initial or preloaded state if any*/);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Main appName={APP_NAME} />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
