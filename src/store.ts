import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./features/todo/todoSlice";
import userReducer from "./features/users/userSlice";
import planetReducer from "./features/planets/planetSlice";

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    users: userReducer,
    planets: planetReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
