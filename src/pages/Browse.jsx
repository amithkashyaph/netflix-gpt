import React from "react";
import Header from "../components/Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "../components/MainContainer";
import SecondaryContainer from "../components/SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import GPTSearch from "../components/GPTSearch";
import { useSelector } from "react-redux";

const Browse = () => {
  const showGPTSearch = useSelector((state) => state.gpt.showGPTSearch);
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();

  return (
    <div>
      <Header />
      {showGPTSearch ? (
        <GPTSearch />
      ) : (
        <>
          <MainContainer />
          <SecondaryContainer />
        </>
      )}
    </div>
  );
};

export default Browse;
