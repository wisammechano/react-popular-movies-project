/* 
Actions:
  - Select Category
  - Select Language
  - Fetch Configurations
  - Search Movies
  - Fetch Genres
  - Fetch Movies
  - Fetch Movie
  - Fetch Reviews
*/

import {
  URL_CONFIG,
  URL_SEARCH,
  URL_GENRES,
  URL_MOVIES_POPULAR,
  URL_MOVIES_UPCOMING,
  URL_MOVIES_LATEST,
  URL_MOVIES_NOW_PLAYING,
  URL_MOVIES_TOP_RATED,
  URL_MOVIE,
  MOVIE_APPEND_PARAMETER,
  API_KEY_PARAM as API_KEY,
  API_KEY_ALT_PARAM as API_KEY_ALT,
  MOVIES_CATEGORIES,
  MOVIE_LANG_PARAMETER_AR,
  MOVIE_LANG_PARAMETER_US
} from "../constants";

import { debounce } from "lodash";

export const SELECT_CATEGORY = "SELECT_CATEGORY";

export function changeCategory(category) {
  return {
    type: SELECT_CATEGORY,
    category
  };
}

export function changeLanguage(language) {
  return {
    type: SELECT_LANGUAGE,
    language
  };
}

export const SELECT_LANGUAGE = "SELECT_LANGUAGE";

export const FETCH_CONFIG = "FETCH_CONFIG";
export const FETCH_CONFIG_SUCCESS = "FETCH_CONFIG_SUCCESS";
export const FETCH_CONFIG_FAILURE = "FETCH_CONFIG_FAILURE";

function fetchConfig() {
  return {
    type: FETCH_CONFIG
  };
}

function fetchConfigSuccess(data) {
  return {
    type: FETCH_CONFIG_SUCCESS,
    data
  };
}

function fetchConfigFailure(error) {
  return {
    type: FETCH_CONFIG_FAILURE,
    error
  };
}

export function fetchConfigurations() {
  return dispatch => {
    dispatch(fetchConfig());

    return fetch(URL_CONFIG + API_KEY)
      .then(response => response.json())
      .then(json => dispatch(fetchConfigSuccess(json)))
      .catch(error => dispatch(fetchConfigFailure(error)));
  };
}

export const SEARCH_MOVIE = "SEARCH_MOVIE";
export const SEARCH_MOVIE_SUCCESS = "SEARCH_MOVIE_SUCCESS";
export const SEARCH_MOVIE_FAILURE = "SEARCH_MOVIE_FAILURE";
export const RESET_SERACH = "RESET_SEARCH";

function searchMovie(query) {
  return {
    type: SEARCH_MOVIE,
    query
  };
}

function searchMovieSuccess(data, query) {
  return {
    type: SEARCH_MOVIE_SUCCESS,
    data,
    query
  };
}

function searchMovieFail(error) {
  return {
    type: SEARCH_MOVIE_FAILURE,
    error
  };
}

const debouncedSearch = debounce((dispatch, query) => {
  let url = URL_SEARCH + query + API_KEY_ALT;
  if (query.length === 0) {
    return dispatch(resetSearchMovies());
  }
  dispatch(searchMovie(query));
  return fetch(url)
    .then(response => response.json())
    .then(json => json.results)
    .then(data => dispatch(searchMovieSuccess(data)))
    .catch(error => dispatch(searchMovieFail(error)));
}, 350);

export function searchMovieList(query) {
  return dispatch => {
    return debouncedSearch(dispatch, query);
  };
}

export function resetSearchMovies() {
  return {
    type: RESET_SERACH
  };
}

export const FETCH_GENRES = "FETCH_GENRES";
export const FETCH_GENRES_SUCCESS = "FETCH_GENRES_SUCCESS";
export const FETCH_GENRES_FAILURE = "FETCH_GENRES_FAILURE";

function fetchGenres() {
  return {
    type: FETCH_GENRES
  };
}

function fetchGenresSuccess(data) {
  return {
    type: FETCH_GENRES_SUCCESS,
    data
  };
}

function fetchGenresFail(error) {
  return {
    type: FETCH_GENRES_FAILURE,
    error
  };
}

export function fetchGenresList() {
  return dispatch => {
    dispatch(fetchGenres());
    return fetch(URL_GENRES + API_KEY)
      .then(response => response.json())
      .then(json => json.genres)
      .then(data => dispatch(fetchGenresSuccess(data)))
      .catch(error => dispatch(fetchGenresFail(error)));
  };
}

export const FETCH_MOVIES = "FETCH_MOVIES";
export const FETCH_MOVIES_SUCCESS = "FETCH_MOVIES_SUCCESS";
export const FETCH_MOVIES_FAILURE = "FETCH_MOVIES_FAILURE";

function fetchMovies() {
  return {
    type: FETCH_MOVIES
  };
}

function fetchMoviesSuccess(data) {
  return {
    type: FETCH_MOVIES_SUCCESS,
    data
  };
}

function fetchMoviesFail(error) {
  return {
    type: FETCH_MOVIES_FAILURE,
    error
  };
}

export function fetchMoviesList() {
  return (dispatch, getState) => {
    dispatch(fetchMovies());

    const category = getState().home.selectedCategory;
    let url;

    switch (category) {
      case MOVIES_CATEGORIES.LATEST:
        url = URL_MOVIES_LATEST;
        break;
      case MOVIES_CATEGORIES.UPCOMING:
        url = URL_MOVIES_UPCOMING;
        break;
      case MOVIES_CATEGORIES.NOW_PLAYING:
        url = URL_MOVIES_NOW_PLAYING;
        break;
      case MOVIES_CATEGORIES.TOP_RATED:
        url = URL_MOVIES_TOP_RATED;
        break;
      case MOVIES_CATEGORIES.POPULAR:
      default:
        url = URL_MOVIES_POPULAR;
    }

    return fetch(url + API_KEY)
      .then(response => response.json())
      .then(json => json.results)
      .then(data => dispatch(fetchMoviesSuccess(data)))
      .catch(error => dispatch(fetchMoviesFail(error)));
  };
}

export const FETCH_MOVIE = "FETCH_MOVIE";
export const FETCH_MOVIE_SUCCESS = "FETCH_MOVIE_SUCCESS";
export const FETCH_MOVIE_FAILURE = "FETCH_MOVIE_FAILURE";

function fetchMovie() {
  return {
    type: FETCH_MOVIE
  };
}

function fetchMovieSuccess(data) {
  return {
    type: FETCH_MOVIE_SUCCESS,
    data
  };
}

function fetchMovieFail(error) {
  return {
    type: FETCH_MOVIE_FAILURE,
    error
  };
}

export function fetchMovieDetail(id) {
  const url_movie = URL_MOVIE + id + API_KEY + MOVIE_APPEND_PARAMETER;
  return dispatch => {
    dispatch(fetchMovie());
    return fetch(url_movie)
      .then(response => response.json())
      .then(data => dispatch(fetchMovieSuccess(data)))
      .catch(error => dispatch(fetchMovieFail(error)));
  };
}

export const FETCH_REVIEWS = "FETCH_REVIEWS";
export const FETCH_REVIEWS_SUCCESS = "FETCH_REVIEWS_SUCCESS";
export const FETCH_REVIEWS_FAILURE = "FETCH_REVIEWS_FAILURE";

function fetchReviews() {
  return {
    type: FETCH_REVIEWS
  };
}

function fetchReviewsSuccess(data) {
  return {
    type: FETCH_REVIEWS_SUCCESS,
    data
  };
}

function fetchReviewsFail(error) {
  return {
    type: FETCH_REVIEWS_FAILURE,
    error
  };
}

export function fetchReviewsList(id) {
  return function(dispatch) {
    dispatch(fetchReviews());
    return fetch(URL_GENRES + API_KEY)
      .then(response => response.json())
      .then(json => json.results)
      .then(data => {
        dispatch(fetchReviewsSuccess(data));
      })
      .catch(error => dispatch(fetchReviewsFail(error)));
  };
}
