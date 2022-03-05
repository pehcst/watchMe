import { useEffect, useState } from "react";
import { api } from "../services/api";
import { MovieCard } from "./MovieCard";

 interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface GenreProps {
  genderId: number;
}


export function Content({genderId}: GenreProps) {
  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${genderId}`).then(response => {
      setMovies(response.data);
    });
  }, [genderId]);

  const [movies, setMovies] = useState<MovieProps[]>([]);
  // Complete aqui
  return(
    <main>
      <div className="movies-list">
        {movies.map(movie => (
          <MovieCard key ={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
        ))}
      </div>
    </main>
  )
}