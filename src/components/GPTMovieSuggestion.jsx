import React from "react";
import { useSelector } from "react-redux";
import MovieCard from "./MovieCard";
import MovieList from "./MovieList";

const GPTMovieSuggestion = () => {
  const { gptMovieSearchResult, gptRecommendedMovieNames } = useSelector(
    (store) => store.gpt
  );

  if (!gptRecommendedMovieNames) return null;

  return (
    <div className="bg-black/80 m-4 mt-10 ">
      <div className="text-white p-7">
        {gptRecommendedMovieNames.map((movieName, index) => (
          <MovieList
            key={movieName}
            title={movieName}
            movies={gptMovieSearchResult[index]}
          />
        ))}
      </div>
    </div>
  );
};

export default GPTMovieSuggestion;
