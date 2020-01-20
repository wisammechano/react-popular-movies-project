import { SELECT_CATEGORY, SELECT_LANGUAGE } from "./actions";

export const localStorageMiddleware = store => next => action => {
  let settings = JSON.parse(window.localStorage.getItem("settings")) || {};
  if (action.type === SELECT_CATEGORY) {
    window.localStorage.setItem(
      "settings",
      JSON.stringify({
        ...settings,
        selectedCategory: action.category
      })
    );
  } else if (action.type === SELECT_LANGUAGE) {
    window.localStorage.setItem(
      "settings",
      JSON.stringify({
        ...settings,
        selectedLanguage: action.language
      })
    );
  }
  next(action);
};
