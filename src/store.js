import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import createRootReducer from "./reducer";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import thunk from "redux-thunk";

export const history = createBrowserHistory();

const middleware = [thunk, routerMiddleware(history)];

if (process.env.NODE_ENV !== "production") {
  middleware.push(createLogger());
}

export function configStore(initState) {
  return createStore(
    createRootReducer(history),
    initState,
    composeWithDevTools(applyMiddleware(...middleware))
  );
}
