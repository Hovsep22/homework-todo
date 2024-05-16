import { useState } from "react";
import { useAppDispatch } from "../hooks";
import { addTodo } from "../features/todo/todoSlice";

const AddTodo = () => {
  const [text, setText] = useState("");
  const dispatch = useAppDispatch();

  const handleAddTodo = () => {
    dispatch(addTodo(text));

    setText("");
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Add todo"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add</button>
    </div>
  );
};

export default AddTodo;
