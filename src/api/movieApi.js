import axios from "axios";

const API_KEY = process.env.REACT_API_KEY;
if (!API_KEY) {
  // non-fatal warning in console so dev knows to set key
  console.warn("Missing REACT_APP_TMDB_API_KEY env variable");
}

export const IMG_BASE = "https://image.tmdb.org/t/p/w500";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "66294a0c993e956822188cd4ab495a38",   // replace directly
    language: "en-US"
  }
});


export default api;