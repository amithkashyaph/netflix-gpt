import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    movieTrailerVideo: null,
    popularMovies: null,
    topRatedMovies: null,
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    addTopRatedMovies: (state, action) => {
      state.topRatedMovies = action.payload;
    },
    addMovieTrailerVideo: (state, action) => {
      state.movieTrailerVideo = action.payload;
    },
  },
});

export const {
  addNowPlayingMovies,
  addMovieTrailerVideo,
  addPopularMovies,
  addTopRatedMovies,
} = moviesSlice.actions;

export default moviesSlice.reducer;
