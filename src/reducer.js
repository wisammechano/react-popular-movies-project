import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

export default function(history) {
  return combineReducers({
    router: connectRouter(history)
  });
}
