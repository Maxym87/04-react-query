import styles from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";
import toast, { Toaster } from "react-hot-toast";
import { fetchQuery } from "../../services/movieService";
import type { Movie } from "../../types/movie";

export default function App() {
  const [queryMovies, setQueryMovies] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [select, setSelect] = useState<Movie | null>(null);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["movies", queryMovies, currentPage],
    queryFn: () => fetchQuery(queryMovies, currentPage),
  });

  const handleSearch = async (searchMovie: string) => {
    setQueryMovies(searchMovie);
    setCurrentPage(1);
  };

  // const totalPages = data.?total_pages ?? 0;

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
      {isSuccess && (
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setCurrentPage(selected + 1)}
          forcePage={currentPage - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
          renderOnZeroPageCount={null}
        />
      )}
      {select && <MovieModal movie={select} onClose={closeModal} />}
    </div>
  );
}
