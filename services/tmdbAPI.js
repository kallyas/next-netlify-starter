
import axios from 'redaxios';

import {
  TMDB_API_KEY,
  TMDB_API_BASE_URL,
  TMDB_API_READ_ACCESS_TOKEN
} from 'config/tmdb';


const tmdbAPI = axios.create({
  baseURL: TMDB_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    Authorization: `Bearer ${TMDB_API_READ_ACCESS_TOKEN}`
  }
});

const alternativeTmdbAPI = axios.create({
  baseURL: TMDB_API_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
  }
});

export {
  alternativeTmdbAPI
};

export default tmdbAPI;
