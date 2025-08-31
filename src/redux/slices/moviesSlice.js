import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/movieApi";

const defaultListState = {
  items: [],
  page: 1,
  total_pages: 1,
  status: "idle",
  error: null
};

export const fetchPopular = createAsyncThunk(
  "movies/fetchPopular",
  async (page = 1) => {
    const { data } = await api.get("/movie/popular", { params: { page } });
    return data;
  }
);

export const fetchTopRated = createAsyncThunk(
  "movies/fetchTopRated",
  async (page = 1) => {
    const { data } = await api.get("/movie/top_rated", { params: { page } });
    return data;
  }
);

export const fetchUpcoming = createAsyncThunk(
  "movies/fetchUpcoming",
  async (page = 1) => {
    const { data } = await api.get("/movie/upcoming", { params: { page } });
    return data;
  }
);

export const fetchMovieDetail = createAsyncThunk(
  "movies/fetchMovieDetail",
  async (id) => {
    const { data } = await api.get(`/movie/${id}`);
    return data;
  }
);

export const fetchMovieCredits = createAsyncThunk(
  "movies/fetchMovieCredits",
  async (id) => {
    const { data } = await api.get(`/movie/${id}/credits`);
    return data;
  }
);

export const fetchSearch = createAsyncThunk(
  "movies/fetchSearch",
  async ({ query, page = 1 }) => {
    const { data } = await api.get("/search/movie", {
      params: { query, page, include_adult: false }
    });
    return { ...data, query };
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    popular: { ...defaultListState },
    topRated: { ...defaultListState },
    upcoming: { ...defaultListState },
    search: { ...defaultListState, query: "" },
    detail: { item: null, status: "idle", error: null },
    credits: { cast: [], crew: [], status: "idle", error: null }
  },
  reducers: {},
  extraReducers: (builder) => {
    // Popular
    builder
      .addCase(fetchPopular.pending, (state) => {
        state.popular.status = "loading";
      })
      .addCase(fetchPopular.fulfilled, (state, action) => {
        const { results, page, total_pages } = action.payload;
        state.popular = {
          ...state.popular,
          items: results,
          page,
          total_pages,
          status: "succeeded",
          error: null
        };
      })
      .addCase(fetchPopular.rejected, (state, action) => {
        state.popular.status = "failed";
        state.popular.error = action.error.message;
      });

    // Top Rated
    builder
      .addCase(fetchTopRated.pending, (state) => {
        state.topRated.status = "loading";
      })
      .addCase(fetchTopRated.fulfilled, (state, action) => {
        const { results, page, total_pages } = action.payload;
        state.topRated = {
          ...state.topRated,
          items: results,
          page,
          total_pages,
          status: "succeeded",
          error: null
        };
      })
      .addCase(fetchTopRated.rejected, (state, action) => {
        state.topRated.status = "failed";
        state.topRated.error = action.error.message;
      });

    // Upcoming
    builder
      .addCase(fetchUpcoming.pending, (state) => {
        state.upcoming.status = "loading";
      })
      .addCase(fetchUpcoming.fulfilled, (state, action) => {
        const { results, page, total_pages } = action.payload;
        state.upcoming = {
          ...state.upcoming,
          items: results,
          page,
          total_pages,
          status: "succeeded",
          error: null
        };
      })
      .addCase(fetchUpcoming.rejected, (state, action) => {
        state.upcoming.status = "failed";
        state.upcoming.error = action.error.message;
      });

    // Detail
    builder
      .addCase(fetchMovieDetail.pending, (state) => {
        state.detail.status = "loading";
      })
      .addCase(fetchMovieDetail.fulfilled, (state, action) => {
        state.detail.item = action.payload;
        state.detail.status = "succeeded";
        state.detail.error = null;
      })
      .addCase(fetchMovieDetail.rejected, (state, action) => {
        state.detail.status = "failed";
        state.detail.error = action.error.message;
      });

    // Credits
    builder
      .addCase(fetchMovieCredits.pending, (state) => {
        state.credits.status = "loading";
      })
      .addCase(fetchMovieCredits.fulfilled, (state, action) => {
        const { cast = [], crew = [] } = action.payload;
        state.credits.cast = cast;
        state.credits.crew = crew;
        state.credits.status = "succeeded";
        state.credits.error = null;
      })
      .addCase(fetchMovieCredits.rejected, (state, action) => {
        state.credits.status = "failed";
        state.credits.error = action.error.message;
      });

    // Search
    builder
      .addCase(fetchSearch.pending, (state) => {
        state.search.status = "loading";
      })
      .addCase(fetchSearch.fulfilled, (state, action) => {
        const { results, page, total_pages, query } = action.payload;
        state.search = {
          ...state.search,
          items: results,
          page,
          total_pages,
          query,
          status: "succeeded",
          error: null
        };
      })
      .addCase(fetchSearch.rejected, (state, action) => {
        state.search.status = "failed";
        state.search.error = action.error.message;
      });
  }
});

export default moviesSlice.reducer;