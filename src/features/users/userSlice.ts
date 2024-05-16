import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface UserState {
  users: unknown[];
  page: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  page: 1,
  totalPages: 1,
  loading: false,
  error: null,
};

const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (page: number) => {
    const response = await axios.get(
      `https://swapi.dev/api/people/?page=${page}`
    );

    return response.data;
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload.results;
      state.totalPages = Math.ceil(action.payload.count / 10);
    });

    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch users";
    });
  },
});

export const { setPage } = userSlice.actions;
export { fetchUsers };

export default userSlice.reducer;
