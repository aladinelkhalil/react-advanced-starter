import axios from "axios";
import { useEffect, useReducer } from "react";
import { useDocumentTitle, useMode } from "./hooks";
import { todosReducer } from "./todosReducer";
import { TodoForm } from "./TodoForm";
import { Todo } from "./Todo";
import styles from "./App.module.css";

// ...

export function App() {
  const [todos, dispatch] = useReducer(todosReducer, null);

  useDocumentTitle(
    todos ? `Todos (${todos.filter((todo) => !todo.completed).length})` : ""
  );

  // prepare to get the mode (= most frequently used word) in the set of all todo titles.
  const titles = (todos || []).map(({ title }) => title);

  // most frequent word
  const mfw = useMode(titles);

  console.log("Mode: " + (mfw ?? "N/A"));

  const createTodo = (title) => {
    dispatch({
      type: "CREATE_TODO",
      title,
    });
  };

  const deleteTodo = (todoId) => {
    dispatch({
      type: "DELETE_TODO",
      todoId,
    });
  };

  const updateTodo = (todoId) => {
    dispatch({
      type: "UPDATE_TODO",
      todoId,
    });
  };

  useEffect(() => {
    const fetchTodos = async () => {
      const result = await axios("https://jsonplaceholder.typicode.com/todos");

      dispatch({
        type: "FETCH_TODOS",
        todos: result.data,
      });
    };

    fetchTodos();
  }, []);

  return (
    <div className={styles.app}>
      <TodoForm createTodo={createTodo} />

      {todos &&
        todos.map((todo) => (
          <Todo
            key={todo.id}
            {...todo}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
          />
        ))}
    </div>
  );
}
