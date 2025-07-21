import styles from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { fetchQuery } from "../../services/movieService";
import type { Movie } from "../../types/movie";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [select, setSelect] = useState<Movie | null>(null);
  const [isError, setIsError] = useState(false);
  const [isLoad, setIsLoad] = useState(false);

  const handleSearch = async (searchMovie: string) => {
    try {
      setIsLoad(true);
      setIsError(false);
      setMovies([]);
      const data = await fetchQuery(searchMovie);

      if (data.length === 0) {
        toast("No movies found for your request.", {
          duration: 3000,
          position: "top-center",
        });
      }
      setMovies(data);
    } catch {
      setIsError(true);
    } finally {
      setIsLoad(false);
    }
  };

  const handleSelect = (movie: Movie) => {
    setSelect(movie);
  };

  const closeModal = () => {
    setSelect(null);
  };
  return (
    <div className={styles.app}>
      <SearchBar onSubmit={handleSearch} />
      <Toaster
        toastOptions={{
          className: "",
          style: {
            border: "1px solid #713200",
            padding: "16px",
            color: "red",
          },
        }}
      />
      {isLoad && <Loader />}
      {isError && <ErrorMessage />}
      {movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={handleSelect} />
      )}
      {select && <MovieModal movie={select} onClose={closeModal} />}
    </div>
  );
}
