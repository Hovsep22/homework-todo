const TodoListItem = ({ todo }) => {
  return (
    <li>
      <span>{todo.text}</span>
      <button>Complete</button>
      <button>Delete</button>
    </li>
  );
};

export default TodoListItem;
