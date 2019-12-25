import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Main from "./Main";
import { Provider } from "react-redux";
import configStore, { history } from "./store";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";

const store = configStore(/* provide initial or preloaded state if any*/);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/about" render={() => <div>About</div>} />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
