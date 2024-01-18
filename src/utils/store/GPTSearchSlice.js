import { createSlice } from "@reduxjs/toolkit";

const GPTSearchSlice = createSlice({
  name: "GPT",
  initialState: {
    showGPTSearch: false,
    gptMovieSearchResult: null,
    gptRecommendedMovieNames: null,
  },
  reducers: {
    toggleGPTSearchView: (state, action) => {
      state.showGPTSearch = !state.showGPTSearch;
    },
    addGPTMovieSearchResult: (state, action) => {
      const { gptMovieSearchResult, gptRecommendedMovieNames } = action.payload;
      state.gptRecommendedMovieNames = gptRecommendedMovieNames;
      state.gptMovieSearchResult = gptMovieSearchResult;
    },
  },
});

export const { toggleGPTSearchView, addGPTMovieSearchResult } =
  GPTSearchSlice.actions;

export default GPTSearchSlice.reducer;
