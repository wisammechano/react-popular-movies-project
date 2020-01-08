import { object } from "prop-types";

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

  if (object.profile_path) {
    urls.profile = {};
    images.profile_sizes.forEach(size => {
      urls.profile[size] = base_url + size + obj.profile_path;
    });
  }

  if (object.logo_path) {
    urls.logo = {};
    images.logo_sizes.forEach(size => {
      urls.logo[size] = base_url + size + obj.logo_path;
    });
  }

  if (object.still_path) {
    urls.still = {};
    images.still_sizes.forEach(size => {
      urls.still[size] = base_url + size + obj.still_path;
    });
  }

  return urls;
}
