import React, { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addTopRatedMovies } from "../utils/store/moviesSlice";

const useTopRatedMovies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchTopRatedMovies();
  }, []);

  const fetchTopRatedMovies = async () => {
    const url =
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";

    const data = await fetch(url, API_OPTIONS);
    const movies = await data.json();

    dispatch(addTopRatedMovies(movies.results));
  };
};

export default useTopRatedMovies;
