import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import createRootReducer from "./reducer";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import thunk from "redux-thunk";

import { localStorageMiddleware } from "./middleware";

export const history = createBrowserHistory();

// Build the middleware for intercepting and dispatching navigation actions
const myRouterMiddleware = routerMiddleware(history);

const middleware = [thunk, myRouterMiddleware, localStorageMiddleware];

const getMiddleware = () => {
  if (process.env.NODE_ENV === "production") {
    return applyMiddleware(...middleware);
  } else {
    // Enable additional logging in non-production environments.
    return applyMiddleware(...middleware, createLogger());
  }
};

//read more at https://redux.js.org/api/createstore
export default function configureStore(preloadedState) {
  const store = createStore(
    createRootReducer(history),
    preloadedState,
    composeWithDevTools(getMiddleware())
  );

  return store;
}
