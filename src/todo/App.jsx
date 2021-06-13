import {
  useEffect,
  useReducer
} from 'react'

import axios from 'axios'

import {
  useDocumentTitle,
  useMode
} from './hooks';

import {
  TodoForm
} from './TodoForm';

import {
  Todo
} from './Todo';

import {
  todosReducer
} from './todosReducer';

import styles from './App.module.css';

// ...

export function App() {
  const [todos, dispatch] = useReducer(todosReducer, null);

  useDocumentTitle(
    todos
      ? `Todos (${todos.reduce(
        (count, todo) => (!todo.completed ? ++count : count),
        0
      )})`
      : ''
  );

  // prepare to get the mode (= most frequently used word) in the set of all todo titles.
  const titles = (todos || []).map(({ title }) => title);

  // ...
  const mfw = useMode(titles);

  console.log('Mode: ' + (mfw ?? 'N/A'));

  const createTodo = title => {
    dispatch({
      type: 'CREATE_TODO',
      title,
    });
  };

  const deleteTodo = todoId => {
    dispatch({
      type: 'DELETE_TODO',
      todoId,
    });
  };

  const updateTodo = todoId => {
    dispatch({
      type: 'UPDATE_TODO',
      todoId,
    });
  };

  useEffect(() => {
    const fetchTodos = async () => {
      const result = await axios('http://jsonplaceholder.typicode.com/todos');

      dispatch({
        type: 'FETCH_TODOS',
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
