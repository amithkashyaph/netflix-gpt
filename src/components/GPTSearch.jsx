import React from "react";
import GPTSearchBar from "./GPTSearchBar";
import GPTMovieSuggestion from "./GPTMovieSuggestion";
import { NETFLIX_BG_IMG } from "../utils/constants";
import LanguageSelector from "./LanguageSelector";

const GPTSearch = () => {
  return (
    <div>
      <div className="fixed -z-10">
        <img
          src={NETFLIX_BG_IMG}
          alt="netflix background image"
          className="h-screen w-screen object-cover"
        />
      </div>
      <div className="">
        <GPTSearchBar />
        <GPTMovieSuggestion />
      </div>
    </div>
  );
};

export default GPTSearch;
