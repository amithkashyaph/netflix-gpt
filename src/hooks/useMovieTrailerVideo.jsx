import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addMovieTrailerVideo } from "../utils/store/moviesSlice";
import { API_OPTIONS } from "../utils/constants";

const useMovieTrailerVideo = (movieId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchMovieVideos();
  }, []);

  const fetchMovieVideos = async () => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`;

    const data = await fetch(url, API_OPTIONS);

    const videosData = await data.json();

    const filterData = videosData.results.filter((v) => v.type === "Trailer");

    const movieTrailer = filterData.length
      ? filterData[0]
      : videosData.results[0];

    dispatch(addMovieTrailerVideo(movieTrailer));
  };
};

export default useMovieTrailerVideo;
