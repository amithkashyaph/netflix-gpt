import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  if (!movies) return;
  return (
    <div className="mb-8">
      <h1 className="text-xl md:text-3xl md:px-4 py-2">{title}</h1>
      <div className="flex overflow-x-scroll md:p-4">
        <div className="flex gap-5">
          {movies.map((movie) => (
            <MovieCard key={movie.id} imgUrl={movie.poster_path} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
