import React from "react";
import { MOVIE_IMG_URL } from "../utils/constants";

const MovieCard = ({ imgUrl }) => {
  return (
    <div className="w-36 md:w-48">
      <img src={MOVIE_IMG_URL + imgUrl} alt="" className="" />
    </div>
  );
};

export default MovieCard;
