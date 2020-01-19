export function getImagesUrl(obj, config) {
  const images = config.images;

  const base_url = images.base_url.split(":")[1];
  const urls = {};

  if (obj.backdrop_path) {
    urls.backdrop = {};
    images.backdrop_sizes.forEach(size => {
      urls.backdrop[size] = base_url + size + obj.backdrop_path;
    });
  }

  if (obj.poster_path) {
    urls.poster = {};
    images.poster_sizes.forEach(size => {
      urls.poster[size] = base_url + size + obj.poster_path;
    });
  }

  if (obj.profile_path) {
    urls.profile = {};
    images.profile_sizes.forEach(size => {
      urls.profile[size] = base_url + size + obj.profile_path;
    });
  }

  if (obj.logo_path) {
    urls.logo = {};
    images.logo_sizes.forEach(size => {
      urls.logo[size] = base_url + size + obj.logo_path;
    });
  }

  if (obj.still_path) {
    urls.still = {};
    images.still_sizes.forEach(size => {
      urls.still[size] = base_url + size + obj.still_path;
    });
  }

  return urls;
}

export const fetchJson = (url, options = {}) => {
  return fetch(url, options)
    .then(res => {
      if (res.headers.get("content-type").indexOf("application/json") !== -1)
        return res.json();
      throw new HttpError(res.statusText, res.status);
    })
    .catch(err => {
      if (err instanceof TypeError) {
        //network error
        throw new TypeError(
          "Couldn't connect. Check your network connection and try again"
        );
      } else if (err instanceof SyntaxError) {
        //JSON parsing error
        throw new SyntaxError("Invalid JSON. " + err.message);
      } else throw err; //other errors
    })
    .then(json => {
      if (json.status_message) throw new ApiError(json);
      return json;
    });
};

export class HttpError extends Error {
  constructor(message, status_code) {
    super(message);
    this.status_code = status_code;
    this.name = "HttpError";
  }
}

export class ApiError extends Error {
  constructor(message) {
    super(message.status_message);
    this.status_code = message.status_code;
    this.name = "HttpError";
  }
}
