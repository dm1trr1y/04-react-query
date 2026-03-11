import { Toaster, toast } from "react-hot-toast";
import { fetchMovies } from "../../services/movieService";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import { useState } from "react";
import type { Movie } from "../../types/movie";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const openModal = (movie: Movie) => {
    setMovie(movie);
  };
  const closeModal = () => {
    setMovie(null);
  };
  const handleSearch = (query: string) => {
    setIsLoading(true);
    setIsError(false);
    fetchMovies(query)
      .then((movies) => {
        console.log(movies);
        if (movies.length === 0) {
          toast.error("No movies found for your request");
          setIsError(true);
        }
        setMovies(movies);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {movies.length > 0 && !isLoading && (
        <MovieGrid movies={movies} onSelect={openModal} />
      )}
      {isError && <ErrorMessage />}
      {movie && <MovieModal movie={movie} onClose={closeModal} />}
      <Toaster />
    </>
  );
}
