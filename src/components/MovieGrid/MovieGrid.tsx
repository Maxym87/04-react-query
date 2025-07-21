import type { Movie } from "../../types/movie";
import styles from "./MovieGrid.module.css";

interface MovieGridProps {
  onSelect: (movie: Movie) => void;
  movies: Movie[];
}

export default function MovieGrid({ onSelect, movies }: MovieGridProps) {
  const imagesBaseUrl = "https://image.tmdb.org/t/p/w500/";
  return (
    <ul className={styles.grid}>
      {movies.map((movie) => (
        <li
          key={movie.id}
          onClick={() => {
            onSelect(movie);
          }}
        >
          <div className={styles.card}>
            <img
              className={styles.image}
              src={imagesBaseUrl + movie.poster_path}
              alt={movie.title}
              loading="lazy"
            />
            <h2 className={styles.title}>{movie.title}</h2>
          </div>
        </li>
      ))}
    </ul>
  );
}
