import {
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_FAILURE,
  SEARCH_MOVIE,
  SELECT_CATEGORY,
  SELECT_LANGUAGE
} from "../actions";

import { MOVIES_CATEGORIES, MOVIE_LANG_PARAMETER_US } from "../constants";

const initState = {
  movies: [],
  error: null,
  searchQuery: "",
  selectedCategory: MOVIES_CATEGORIES.POPULAR,
  selectedLanguage: MOVIE_LANG_PARAMETER_US
};
export default (state = initState, action) => {
  switch (action.type) {
    case FETCH_MOVIES_SUCCESS:
      return { ...state, movies: action.data };
    case FETCH_MOVIES_FAILURE:
      return { ...state, error: action.error };
    case SEARCH_MOVIE:
      return { ...state, searchQuery: action.query };
    case SELECT_LANGUAGE:
      return { ...state, selectedLanguage: action.language };
    case SELECT_CATEGORY:
      return { ...state, selectedCategory: action.category };
    default:
      return state;
  }
};
