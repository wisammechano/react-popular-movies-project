import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import reducer from "./reducers";
import { routerMiddleware } from "react-router-redux";
import createHistory from "history/createBrowserHistory";

export const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const myRouterMiddleware = routerMiddleware(history);

const getMiddleware = () => {
  if (process.env.NODE_ENV === "production") {
    return applyMiddleware(myRouterMiddleware);
  } else {
    // Enable additional logging in non-production environments.
    return applyMiddleware(myRouterMiddleware, createLogger());
  }
};

export const store = createStore(reducer, composeWithDevTools(getMiddleware()));
