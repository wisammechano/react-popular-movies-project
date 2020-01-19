import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import languages from "../constants/languages";
import { find } from "lodash";
import { getImagesUrl } from "../utils";
import { Badge, Container, Row, Col } from "react-bootstrap";
import PageNavigator from "./PageNavigator";
import RatingCircle from "./RatingCircle";
import ColorThief from "colorthief";
import Color from "color";

export const Movie = ({ movie }) => {
  // Set the window title to the movie title
  document.title = movie.title;

  const config = useSelector(state => state.configurations);

  const images = getImagesUrl(movie, config);

  return (
    <>
      <Overview movie={movie} images={images} />
      <PageNavigator
        offsetElementTop={0}
        offsetContainerTop={0}
        offsetContainerBottom={0}
        items={["Overview", "Cast", "Details", "Reviews", "Recommendations"]}
      />
    </>
  );
};

const Overview = ({ movie, images }) => {
  const [prominentColor, setProminentColor] = useState(null);

  const original_language = find(languages, {
    iso_639_1: movie.original_language
  }).english_name;

  const release_date = movie.release_date
    ? movie.release_date.split("-")[0]
    : "Unknown";

  // Load background based on window width
  let backdropSize = "w1280";
  if (window.innerWidth < 1000) {
    backdropSize = "w780";
  }

  const updateColors = e => {
    let color = Color.rgb(new ColorThief().getColor(e.target));
    color = color.saturate(0.8);
    if (color.isLight()) color = color.darken(0.5);
    setProminentColor(color);
  };

  // This will be used to extract the prominent color from the
  // backdrop image to apply a pleasant customization to the page
  useEffect(() => {
    if (!images.backdrop) return;

    const img = new Image();
    img.crossOrigin = "anonymous";

    img.addEventListener("load", updateColors);

    img.src = images.backdrop.w300;

    return () => {
      //clean up the listener
      img.removeEventListener("load", updateColors);
    };
  }, [images]);

  const style = {};
  if (images.backdrop)
    style.backgroundImage = `url(${images.backdrop[backdropSize]})`;

  return (
    <div className="movie-overview" style={style} id="overview">
      <div
        className={images.backdrop ? "has-backdrop" : ""}
        style={{
          backgroundColor: prominentColor ? prominentColor.hex() : "#e3e3e3"
        }}
      >
        <Container as="main" id="movie-body-container">
          <Row>
            <Col>
              <div id="overview" className="py-2">
                <Row>
                  <Col xs={12} md={5}>
                    <div className="my-2 my-md-5">
                      <MoviePoster poster={images.poster.w500}></MoviePoster>
                    </div>
                  </Col>
                  <Col>
                    <div className="movie-body-overview my-2 my-md-5">
                      <div className="mb-5">
                        <h3>{movie.title}</h3>
                        <span>
                          {release_date} | {original_language}
                        </span>
                        <div>
                          {movie.genres.map(genre => (
                            <React.Fragment key={genre.id}>
                              <Badge variant="dark">{genre.name}</Badge>{" "}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                      <h4>Score</h4>
                      <div className="my-2 d-flex align-items-center">
                        <RatingCircle
                          color="#d8454c"
                          width={60}
                          value={movie.vote_average * 10}
                        />

                        <div className="mx-3">{movie.vote_count} votes</div>
                      </div>
                      <h4>Tagline</h4>
                      <p>{movie.tagline}</p>
                      <h4>Overview</h4>
                      <p>{movie.overview}</p>
                    </div>
                  </Col>
                </Row>
              </div>
              <div id="cast"></div>
              <div id="details"></div>
              <div id="reviews"></div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

/* Movie body will have these sections
    - Overview
    - Cast
    - Meta details:
        - Budget
        - Revenue
        - Run time
        - Production Countries
        - Status & date
        - Has a sequel? https://www.themoviedb.org/collection/645
        - Language
    - Reviews
    - Recommendations
*/
export const MovieBody = ({ movie, images }) => (
  <Container as="main" id="movie-body-container">
    <Row>
      <Col>
        <div id="overview" className="py-2">
          <Row>
            <Col xs={12} md={5}>
              <MoviePoster poster={images.poster.w500}></MoviePoster>
            </Col>
            <Col>
              <div className="movie-body-overview my-2 my-md-5">
                <h4>Score</h4>
                <div className="my-2 d-flex align-items-center justify-content-center justify-content-md-start">
                  <RatingCircle
                    color="#d8454c"
                    width={60}
                    value={movie.vote_average * 10}
                  />

                  <div className="mx-3">{movie.vote_count} votes</div>
                </div>
                <h4>Tagline</h4>
                <p>{movie.tagline}</p>
                <h4>Overview</h4>
                <p>{movie.overview}</p>
              </div>
            </Col>
          </Row>
        </div>
        <div id="cast"></div>
        <div id="details"></div>
        <div id="reviews"></div>
      </Col>
    </Row>
  </Container>
);

export const MoviePoster = ({ poster }) => (
  <div className="movie-poster my-2 mx-auto m-md-2">
    <img src={poster} alt="Movie Poster" />
  </div>
);

export const MovieCover = ({
  backdrop_url,
  title,
  release_date,
  original_language,
  genres
}) => (
  <div
    className="movie-cover"
    style={{
      backgroundImage: backdrop_url ? `url(${backdrop_url})` : "",
      backgroundColor: !backdrop_url ? "#fff" : ""
    }}
  >
    <div className="movie-cover-overlay">
      <div className="container movie-cover-meta">
        <div className="m-3">
          <h3>{title}</h3>
          <span>
            {release_date} | {original_language}
          </span>
          <div>
            {genres.map(genre => (
              <React.Fragment key={genre.id}>
                <Badge variant="dark">{genre.name}</Badge>{" "}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);
