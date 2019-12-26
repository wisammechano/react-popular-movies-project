export const RESET_MOVIES = "RESET_MOVIES";

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

export const FETCH_STAR = "FETCH_STAR";
export const FETCH_STAR_SUCCESS = "FETCH_STAR_SUCCESS";
export const FETCH_STAR_FAILURE = "FETCH_STAR_FAILURE";

function fetchStar() {
  return {
    type: FETCH_STAR
  };
}

function fetchStarSuccess(data) {
  return {
    type: FETCH_STAR_SUCCESS,
    data
  };
}

function fetchStarFail(error) {
  return {
    type: FETCH_STAR_FAILURE,
    error
  };
}

export function fetchStarDetail(id) {
  const url_star = URL_PERSON + id + API_KEY;
  return function(dispatch) {
    dispatch(fetchStar());
    return fetch(url_star)
      .then(response => response.json())
      .then(data => dispatch(fetchStarSuccess(data)))
      .catch(error => dispatch(fetchStarFail(error)));
  };
}

export const FETCH_CASTS = "FETCH_CASTS";
export const FETCH_CASTS_SUCCESS = "FETCH_CASTS_SUCCESS";
export const FETCH_CASTS_FAILURE = "FETCH_CASTS_FAILURE";

function fetchCasts() {
  return {
    type: FETCH_CASTS
  };
}

function fetchCastsSuccess(data) {
  return {
    type: FETCH_CASTS_SUCCESS,
    data
  };
}

function fetchCastsFail(error) {
  return {
    type: FETCH_CASTS_FAILURE,
    error
  };
}

export function fetchCastList(id) {
  const url_casts = URL_DETAIL + id + URL_CAST + API_KEY;
  return function(dispatch) {
    dispatch(fetchCasts());
    return fetch(url_casts)
      .then(response => response.json())
      .then(json => json.cast)
      .then(data => dispatch(fetchCastsSuccess(data)))
      .catch(error => dispatch(fetchCastsFail(error)));
  };
}

export const FETCH_SIMILAR_MOVIES = "FETCH_SIMILAR_MOVIES";
export const FETCH_SIMILAR_MOVIES_SUCCESS = "FETCH_SIMILAR_MOVIES_SUCCESS";
export const FETCH_SIMILAR_MOVIES_FAILURE = "FETCH_SIMILAR_MOVIES_FAILURE";

function fetchSimilarMovies() {
  return {
    type: FETCH_SIMILAR_MOVIES
  };
}

function fetchSimilarMoviesSuccess(data) {
  return {
    type: FETCH_SIMILAR_MOVIES_SUCCESS,
    data
  };
}

function fetchSimilarMoviesFail(error) {
  return {
    type: FETCH_SIMILAR_MOVIES_FAILURE,
    error
  };
}

export function fetchSimilarMovieList(id) {
  const url_similarMovies = URL_DETAIL + id + URL_SIMILAR_MOVIE + API_KEY;
  return function(dispatch) {
    dispatch(fetchSimilarMovies());
    return fetch(url_similarMovies)
      .then(response => response.json())
      .then(json => json.results)
      .then(data => dispatch(fetchSimilarMoviesSuccess(data)))
      .catch(error => dispatch(fetchSimilarMoviesFail(error)));
  };
}

export const FETCH_TRAILERS = "FETCH_TRAILERS";
export const FETCH_TRAILERS_SUCCESS = "FETCH_TRAILERS_SUCCESS";
export const FETCH_TRAILERS_FAILURE = "FETCH_TRAILERS_FAILURE";

function fetchTrailers() {
  return {
    type: FETCH_TRAILERS
  };
}

function fetchTrailersSuccess(data) {
  return {
    type: FETCH_TRAILERS_SUCCESS,
    data
  };
}

function fetchTrailersFail(error) {
  return {
    type: FETCH_TRAILERS_FAILURE,
    error
  };
}

export function fetchTrailerList(id) {
  const url_trailers = URL_DETAIL + id + URL_VIDEO + API_KEY;
  return function(dispatch) {
    dispatch(fetchTrailers());
    return fetch(url_trailers)
      .then(response => response.json())
      .then(json => json.results)
      .then(data => {
        let youtubeTrailers = data.filter(function(trailer) {
          return trailer.site === "YouTube";
        });
        dispatch(fetchTrailersSuccess(youtubeTrailers));
      })
      .catch(error => dispatch(fetchTrailersFail(error)));
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
