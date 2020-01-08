import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import home from "./reducers/home";
import genres from "./reducers/genres";
import configurations from "./reducers/configurations";

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    genres,
    configurations,
    home
  });

export default createRootReducer;
