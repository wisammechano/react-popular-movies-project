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

export const Movie = ({ movie }) => {
  // Set the window title to the movie title
  document.title = movie.title;

  const config = useSelector(state => state.configurations);

  const images = getImagesUrl(movie, config);

  return (
    <>
      <Overview movie={movie} images={images} id="overview" />
      <PageNavigator
        offsetElementTop={0}
        offsetContainerTop={0}
        offsetContainerBottom={0}
        items={["Overview", "Cast", "Details", "Reviews", "Recommendations"]}
      />
    </>
  );
};

const Overview = ({ movie, images, id }) => {
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

  // This will be used to extract the prominent color from the
  // backdrop image to apply a pleasant customization to the page
  useEffect(() => {
    if (!images.backdrop) return;

    // We create this image only to extract colors from it
    const img = new Image();

    //This line is required for the color thief library to work
    img.crossOrigin = "anonymous";

    const onLoad = e => {
      // Get the prominent color and saturate it
      let color = Color.rgb(new ColorThief().getColor(e.target)).saturate(0.8);

      // Adjust the color, since the text is white so if light color darken it
      if (color.isLight()) color = color.darken(0.5);

      // Set the state
      setProminentColor(color);
    };

    // We tell the image, when you load, call the function that extracts the colors
    img.addEventListener("load", onLoad);

    // This will init image loading
    img.src = images.backdrop.w300;

    return () => {
      //clean up the listener
      img.removeEventListener("load", onLoad);
    };
  }, [images]); // adding [images] to the useCallback arguments is to make sure the callback will be called only if images change

  // Main div styling
  const style = {};
  if (images.backdrop)
    style.backgroundImage = `url(${images.backdrop[backdropSize]})`;

  return (
    <div className="movie-overview" style={style} id={id}>
      <div
        className={images.backdrop ? "has-backdrop" : ""}
        style={{
          // If there is a backdrop and prominent color extracted, otherwise gray
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
                      <div className="movie-poster my-2 mx-auto m-md-2">
                        <img src={images.poster.w500} alt="Movie Poster" />
                      </div>
                    </div>
                  </Col>
                  <Col>
                    <div className="my-2 my-md-5">
                      <section className="mb-5">
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
                      </section>
                      <section className="mb-5">
                        <h4>Overview</h4>
                        <p>{movie.overview || "Not available"}</p>
                      </section>
                      {movie.tagline && (
                        <section className="mb-4">
                          <h4>Tagline</h4>
                          <p>{movie.tagline || "Not available"}</p>
                        </section>
                      )}
                      <section>
                        <h4>Score</h4>
                        <div className="my-2 d-flex align-items-center">
                          <RatingCircle
                            color="#d8454c"
                            width={60}
                            value={movie.vote_average * 10}
                          />
                          <div className="mx-3">{movie.vote_count} votes</div>
                        </div>
                      </section>
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
