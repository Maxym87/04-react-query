import styles from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Pagination from "../Pagination/Pagination";
import { useState, useEffect } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import { fetchQuery } from "../../services/movieService";
import type { Movie } from "../../types/movie";

export default function App() {
  const [queryMovies, setQueryMovies] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [select, setSelect] = useState<Movie | null>(null);

  const { data, isLoading, isError, isSuccess, isFetching } = useQuery({
    queryKey: ["movies", queryMovies, currentPage],
    queryFn: () => fetchQuery(queryMovies, currentPage),
    enabled: queryMovies !== "",
    placeholderData: keepPreviousData,
  });

  const handleSearch = async (searchMovie: string) => {
    setQueryMovies(searchMovie);
    setCurrentPage(1);
  };

  useEffect(() => {
    if (data?.results.length === 0) {
      toast("No movies found for your request");
    }
  }, [data]);

  const totalPages = data?.total_pages ?? 0;

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
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {isSuccess && totalPages > 1 && (
        <Pagination
          page={currentPage}
          total={totalPages}
          onChange={setCurrentPage}
        />
      )}
      {queryMovies !== "" && isFetching && <Loader />}
      {isSuccess && data.results.length > 0 && (
        <MovieGrid onSelect={handleSelect} movies={data.results} />
      )}
      {select && <MovieModal movie={select} onClose={closeModal} />}
    </div>
  );
}
