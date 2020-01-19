import { API_KEY_BARE as API_KEY } from "../apiKey";

export const API_KEY_PARAM = "?api_key=" + API_KEY;
export const API_KEY_ALT_PARAM = "&api_key=" + API_KEY;
export const APP_NAME = "Popular Movies";
export const URL_BASE = "https://api.themoviedb.org/3";
export const URL_IMAGE_BASE = "https://image.tmdb.org/t/p/";
export const URL_CONFIG = URL_BASE + "/configuration";
export const URL_GENRES = URL_BASE + "/genre/movie/list";
export const URL_MOVIE = URL_BASE + "/movie";
export const URL_MOVIES_LATEST = URL_MOVIE + "/latest";
export const URL_MOVIES_POPULAR = URL_MOVIE + "/popular";
export const URL_MOVIES_NOW_PLAYING = URL_MOVIE + "/now_playing";
export const URL_MOVIES_UPCOMING = URL_MOVIE + "/upcoming";
export const URL_MOVIES_TOP_RATED = URL_MOVIE + "/top_rated";
export const URL_SEARCH = URL_BASE + "/search/movie?query=";
export const URL_YOUTUBE = "https://www.youtube.com/embed/";

export const URL_REVIEWS = "/reviews";
export const MOVIE_DETAILS_EXTRA = [
  "credits",
  "videos",
  "similar",
  "release_dates"
];
export const MOVIE_APPEND_PARAMETER =
  "&append_to_response=" + MOVIE_DETAILS_EXTRA.join(",");

export const IMG_SIZE_XSMALL = "w45/";
export const IMG_SIZE_SMALL = "w150/";
export const IMG_SIZE_LARGE = "w342/";
export const POSTER_SIZE_SMALL = "w154/";
export const CAST_MAX_NUM = 5;
export const TRAILER_MAX_NUM = 3;
export const SIMILAR_MOVIES_MAX_NUM = 3;

export const MOVIE_LANG_PARAMETER_US = "&language=en";
export const MOVIE_LANG_PARAMETER_AR = "&language=ar";

export const MOVIES_CATEGORIES = {
  POPULAR: { code: "POPULAR", name_en: "Popular", name_ar: "شائع" },
  LATEST: { code: "LATEST", name_en: "Latest", name_ar: "احدث الافلام" },
  UPCOMING: { code: "UPCOMING", name_en: "Upcoming", name_ar: "القادمة قريبا" },
  TOP_RATED: {
    code: "TOP_RATED",
    name_en: "Top Rated",
    name_ar: "الاعلى تقييما"
  },
  NOW_PLAYING: {
    code: "NOW_PLAYING",
    name_en: "Now Playing",
    name_ar: "في دور العرض"
  }
};

export const LANGUAGES = {
  ARABIC: { code: MOVIE_LANG_PARAMETER_AR, name: "العربية" },
  ENGLISH: { code: MOVIE_LANG_PARAMETER_US, name: "English" }
};
