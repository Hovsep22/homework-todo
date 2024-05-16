import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const initialState: Todo[] = [];

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: {
      reducer: (state, action: PayloadAction<Todo>) => {
        state.push(action.payload);
      },
      prepare: (text: string) => ({
        payload: {
          id: new Date().toISOString(),
          text,
          completed: false,
        },
      }),
    },
  },
});

export const { addTodo } = todoSlice.actions;

export default todoSlice.reducer;
