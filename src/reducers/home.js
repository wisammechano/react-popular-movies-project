import {
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_FAILURE,
  SEARCH_MOVIE,
  SEARCH_MOVIE_FAILURE,
  SEARCH_MOVIE_SUCCESS,
  SELECT_CATEGORY,
  SELECT_LANGUAGE,
  RESET_SERACH,
  FETCH_GENRES_SUCCESS,
  FETCH_CONFIG_SUCCESS
} from "../actions";

import { MOVIES_CATEGORIES, MOVIE_LANG_PARAMETER_US } from "../constants";

const initState = {
  movies: [],
  searchResults: [],
  searchError: null,
  error: null,
  searchQuery: "",
  selectedCategory: MOVIES_CATEGORIES.POPULAR,
  selectedLanguage: MOVIE_LANG_PARAMETER_US,
  configsLoaded: false,
  genresLoaded: false
};

export default (state = initState, action) => {
  switch (action.type) {
    case FETCH_MOVIES_SUCCESS:
      return { ...state, movies: action.data };
    case FETCH_MOVIES_FAILURE:
      return { ...state, error: action.error };
    case SEARCH_MOVIE:
      return {
        ...state,
        searchQuery: action.query,
        searchResults: [],
        searchError: null
      };
    case RESET_SERACH:
      return {
        ...state,
        searchQuery: "",
        searchResults: [],
        searchError: null
      };
    case SELECT_LANGUAGE:
      return { ...state, selectedLanguage: action.language };
    case SELECT_CATEGORY:
      return { ...state, selectedCategory: action.category };
    case SEARCH_MOVIE_SUCCESS:
      return {
        ...state,
        searchResults: action.data,
        searchError: null
      };
    case SEARCH_MOVIE_FAILURE:
      return { ...state, searchError: action.error };
    case FETCH_CONFIG_SUCCESS:
      return { ...state, configsLoaded: true };
    case FETCH_GENRES_SUCCESS:
      return { ...state, genresLoaded: true };
    default:
      return state;
  }
};
