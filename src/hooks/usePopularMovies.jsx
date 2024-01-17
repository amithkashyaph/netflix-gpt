import React, { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addPopularMovies } from "../utils/store/moviesSlice";

const usePopularMovies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  const fetchPopularMovies = async () => {
    const url =
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";

    const data = await fetch(url, API_OPTIONS);
    const movies = await data.json();

    dispatch(addPopularMovies(movies.results));
  };
};

export default usePopularMovies;
