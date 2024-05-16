import { useAppSelector } from "../hooks";
import TodoListItem from "./TodoListItem";

const TodoList = () => {
  const todos = useAppSelector((state) => state.todos);

  return (
    <ul>
      {todos.map((todo) => (
        <TodoListItem todo={todo} key={todo.id} />
      ))}
    </ul>
  );
};

export default TodoList;
