import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface PlanetState {
  planets: unknown[];
  page: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
}

const initialState: PlanetState = {
  planets: [],
  page: 1,
  totalPages: 1,
  loading: false,
  error: null,
};

const fetchPlanets = createAsyncThunk(
  "planets/fetchPlanets",
  async (page: number) => {
    const response = await axios.get(
      `https://swapi.dev/api/planets/?page=${page}`
    );
    
    return response.data;
  }
);

const planetsSlice = createSlice({
  name: "planets",
  initialState,
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPlanets.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(fetchPlanets.fulfilled, (state, action) => {
      state.loading = false;
      state.planets = action.payload.results;
      state.totalPages = Math.ceil(action.payload.count / 10);
    });

    builder.addCase(fetchPlanets.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch users";
    });
  },
});

export const { setPage } = planetsSlice.actions;
export { fetchPlanets };

export default planetsSlice.reducer;
