import axios from "axios";
import type { Movie } from "../types/movie";

interface FetchQueryResponse {
  results: Movie[];
}

export const fetchQuery = async (query: string): Promise<Movie[]> => {
  const myKey = import.meta.env.VITE_API_KEY;
  axios.defaults.baseURL = "https://api.themoviedb.org/3";

  const response = await axios.get<FetchQueryResponse>("/search/movie", {
    params: { query, page: 1 },
    headers: { accept: "application/json", Authorization: `Bearer ${myKey}` },
  });
  return response.data.results;
};
