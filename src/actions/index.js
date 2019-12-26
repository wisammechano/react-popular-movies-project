export const SEARCH_MOVIE = "SEARCH_MOVIE";
export const SEARCH_MOVIE_SUCCESS = "SEARCH_MOVIE_SUCCESS";
export const SEARCH_MOVIE_FAILURE = "SEARCH_MOVIE_FAILURE";

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

export function searchMovieList(query) {
  let url = URL_SEARCH + query + API_KEY_ALT;

  return dispatch => {
    dispatch(searchMovie());

    return fetch(url)
      .then(response => response.json())
      .then(json => json.results)
      .then(data => dispatch(searchMovieSuccess(data, keyword)))
      .catch(error => dispatch(searchMovieFail(error)));
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

export function fetchMovieList(option) {
  let url;
  if (option) url = URL_LIST + API_KEY + "&with_cast=" + option;
  else url = URL_LIST + API_KEY;
  return dispatch => {
    dispatch(fetchMovies());
    return fetch(url)
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
  const url_movie = URL_DETAIL + id + API_KEY;
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
  const url_trailers = URL_DETAIL + id + URL_VIDEO + API_KEY;
  return function(dispatch) {
    dispatch(fetchReviews());
    return fetch(url_trailers)
      .then(response => response.json())
      .then(json => json.results)
      .then(data => {
        dispatch(fetchReviewsSuccess(data));
      })
      .catch(error => dispatch(fetchReviewsFail(error)));
  };
}
