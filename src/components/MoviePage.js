import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  URL_MOVIE,
  API_KEY_PARAM as API_KEY,
  MOVIE_APPEND_PARAMETER
} from "../constants";
import { Alert, Badge } from "react-bootstrap";
import ContentLoader from "react-content-loader";
import languages from "../constants/languages";
import { find, map } from "lodash";
import { getImagesUrl } from "../utils";
import "./MoviePage.css";

const MoviePage = props => {
  const lang = useSelector(state => state.home.selectedLanguage.code);
  const [state, setState] = useState({
    movie: null,
    error: null,
    isLoading: true
  });

  const id = useParams().id;

  useEffect(() => {
    const url_movie =
      URL_MOVIE + "/" + id + API_KEY + MOVIE_APPEND_PARAMETER + lang;
    setState({ movie: null, isLoading: true, error: null });

    fetch(url_movie)
      .then(response => {
        if (response.ok) return response.json();
        throw response;
      })
      .then(data => setState({ error: null, movie: data, isLoading: false }))
      .catch(err =>
        err.json().then(err =>
          setState({
            error: err.status_message,
            isLoading: false,
            movie: null
          })
        )
      );
  }, [id, lang]);

  return (
    <div id="movie-page" className="app-page">
      {state.isLoading && !state.error && <Loader />}
      {state.error && !state.isLoading && (
        <Alert variant="danger">
          <Alert.Heading>Oh Snap!</Alert.Heading>
          <p>{state.error}</p>
        </Alert>
      )}
      {!state.isLoading && !state.error && <Movie movie={state.movie} />}
    </div>
  );
};

export default MoviePage;

const Loader = props => {
  return (
    <ContentLoader speed={2} primaryColor="#f3f3f3" secondaryColor="#ecebeb">
      <rect x="0" y="0" width="100%" height="480" />
    </ContentLoader>
  );
};

const Movie = ({ movie }) => {
  const config = useSelector(state => state.configurations);

  const images = getImagesUrl(movie, config);
  const original_language = find(languages, {
    iso_639_1: movie.original_language
  }).english_name;
  const release_date = movie.release_date
    ? movie.release_date.split("-")[0]
    : "Unknown";

  return (
    <>
      <MovieCover
        backdrop_url={images.backdrop ? images.backdrop.original : "#fff"}
        title={movie.title}
        release_date={release_date}
        original_language={original_language}
        genres={movie.genres}
      />
      <img src={images.poster.w342} alt={movie.title + " poster"}></img>
    </>
  );
};

const MovieCover = ({
  backdrop_url,
  title,
  release_date,
  original_language,
  genres
}) => (
  <div
    className="movie-cover"
    style={{
      backgroundImage: `url(${backdrop_url})`
    }}
  >
    <div className="movie-cover-overlay">
      <div className="movie-cover-meta">
        <h3>{title}</h3>
        <span>
          {release_date} | {original_language}
        </span>
        <div>
          {genres.map(genre => (
            <>
              <Badge variant="dark" key={genre.id}>
                {genre.name}
              </Badge>{" "}
            </>
          ))}
        </div>
      </div>
    </div>
  </div>
);
