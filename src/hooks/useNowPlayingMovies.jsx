import React, { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../utils/store/moviesSlice";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchNowPlayingMovies();
  }, []);

  const fetchNowPlayingMovies = async () => {
    const url =
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";

    const data = await fetch(url, API_OPTIONS);
    const movies = await data.json();

    dispatch(addNowPlayingMovies(movies.results));
  };
};

export default useNowPlayingMovies;
