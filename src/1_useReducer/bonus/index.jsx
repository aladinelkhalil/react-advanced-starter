import {
  useState, // comment out when using your custom useState.
  useReducer,
} from "react";

// ...

// TODO:
//
// Implement the useState hook using useReducer (hint: Not a lot of code required!).
//
// Should support both setCount variants.
//
// function useState(initialValue) {
//  // implement the hook with useReducer...
// }

export function App() {
  const [count, setCount] = useState(0);

  const inc = () => setCount(count + 1);
  // const inc = () => setCount(prevCount => prevCount + 1);

  return (
    <>
      <p>Count: {count}</p>
      <button onClick={inc}>Increment</button>
    </>
  );
}
