import axios from "axios";
import type { Movie } from "../types/movie";

const VITE_TMBD_TOKEN = import.meta.env.VITE_TMBD_TOKEN;
interface MoviesHttpResponse {
  results: Movie[];
}

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const response = await axios.get<MoviesHttpResponse>(
    `https://api.themoviedb.org/3/search/movie?query=${query}`,
    {
      headers: {
        Authorization: `Bearer ${VITE_TMBD_TOKEN}`,
      },
    },
  );
  return response.data.results;
};
