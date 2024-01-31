import React, { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addNowPlayingMovies } from "../utils/store/moviesSlice";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();
  const nowPlayingMovies = useSelector(
    (store) => store.movies.nowPlayingMovies
  );

  useEffect(() => {
    !nowPlayingMovies && fetchNowPlayingMovies();
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
