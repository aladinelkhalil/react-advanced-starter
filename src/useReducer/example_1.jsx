import { useState } from "react";

// ...

function Counter() {
  const [count, setCount] = useState(0);

  // TODO:
  //
  // Implement a timer that increments the count by 1 every second (using setInterval/clearInterval).
  //
  // If the user hides the Counter component, the timer must stop (in order to avoid getting an error for trying to
  // update the state of an unmounted component).
  //
  // When working with the useEffect hook, you'll probably notice the timer getting frequently created / destroyed (try
  // logging the calls to setInterval/clearInterval). Investigate the functional update variant of setCount to resolve
  // this (see also: https://reactjs.org/docs/hooks-reference.html#functional-updates).

  return <p>Count: {count}</p>;
}

export function App() {
  const [show, setShow] = useState(true);

  return (
    <>
      <button onClick={() => setShow(true)}>Show Counter</button>
      <button onClick={() => setShow(false)}>Hide Counter</button>
      {show && <Counter />}
    </>
  );
}
