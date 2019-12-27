import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import home from "./reducers/home";

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    home
  });

export default createRootReducer;
