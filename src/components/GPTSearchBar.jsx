import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import languageConstants from "../utils/languageConstants";
import openai from "../utils/openAI";
import { API_OPTIONS } from "../utils/constants";
import { addGPTMovieSearchResult } from "../utils/store/GPTSearchSlice";

const GPTSearchBar = () => {
  const searchInputRef = useRef(null);
  const dispatch = useDispatch();
  const language = useSelector((state) => state.config.language);

  const fetchMovieDetailsByNameFromTMDB = async (movieName) => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${movieName}&include_adult=false&language=en-US&page=1`;
    const data = await fetch(url, API_OPTIONS);
    const movie = await data.json();

    return movie.results;
  };

  const handleGPTSearch = async () => {
    const gptQuery =
      "Act as a movie recommendation system and suggest some movies for the query : " +
      searchInputRef.current.value +
      ". Only give me names of 5 movies, comma separated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });

    if (!chatCompletion.choices) {
      // handle the error scenario here
    }

    const gptRecommendedMovieString =
      chatCompletion.choices[0]?.message.content;
    const gptRecommendedMovieList = gptRecommendedMovieString.split(",");

    const tmdbResultPromises = gptRecommendedMovieList.map((movie) =>
      fetchMovieDetailsByNameFromTMDB(movie)
    );

    const tmdbMovieResults = await Promise.all(tmdbResultPromises);

    dispatch(
      addGPTMovieSearchResult({
        gptRecommendedMovieNames: gptRecommendedMovieList,
        gptMovieSearchResult: tmdbMovieResults,
      })
    );
  };

  return (
    <div className="pt-[40%] md:pt-[10%]">
      <form
        className="w-full px-2 py-3 md:w-1/2 md:m-auto bg-black/80 grid grid-cols-12 md:p-5"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchInputRef}
          type="text"
          className="px-4 py-3 m-1 rounded-md md:rounded-xl text-sm md:m-4 md:p-4 border col-span-9 md:text-lg"
          placeholder={languageConstants[language].gptSearchPlaceHolder}
        />
        <button
          type="submit"
          className="px-4 py-3 m-1 md:p-4 rounded-md md:rounded-xl md:m-4 bg-red-700 text-white col-span-3 md:text-lg"
          onClick={handleGPTSearch}
        >
          {languageConstants[language].search}
        </button>
      </form>
    </div>
  );
};

export default GPTSearchBar;
