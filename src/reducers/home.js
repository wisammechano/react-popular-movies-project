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
  FETCH_CONFIG_SUCCESS,
  TOGGLE_SETTINGS_MODAL,
} from '../actions';

import { MOVIES_CATEGORIES, LANGUAGES } from '../constants';

const settings = JSON.parse(window.localStorage.getItem('settings')) || {};

const initState = {
  movies: [],
  searchResults: [],
  isSearching: false,
  searchError: null,
  error: null,
  searchQuery: '',
  selectedCategory: settings.selectedCategory || MOVIES_CATEGORIES.POPULAR,
  selectedLanguage: settings.selectedLanguage || LANGUAGES.ENGLISH,
  configsLoaded: false,
  genresLoaded: false,
  showSettings: false,
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
        isSearching: true,
        searchResults: [],
        searchError: null,
      };
    case RESET_SERACH:
      return {
        ...state,
        searchQuery: '',
        isSearching: false,
        searchResults: [],
        searchError: null,
      };
    case SELECT_LANGUAGE:
      return { ...state, selectedLanguage: action.language };
    case SELECT_CATEGORY:
      return { ...state, selectedCategory: action.category };
    case SEARCH_MOVIE_SUCCESS:
      return {
        ...state,
        searchResults: action.data,
        isSearching: false,
        searchError: null,
      };
    case SEARCH_MOVIE_FAILURE:
      return { ...state, searchError: action.error, isSearching: false };
    case FETCH_CONFIG_SUCCESS:
      return { ...state, configsLoaded: true };
    case FETCH_GENRES_SUCCESS:
      return { ...state, genresLoaded: true };
    case TOGGLE_SETTINGS_MODAL:
      return { ...state, showSettings: action.toggle };
    default:
      return state;
  }
};
