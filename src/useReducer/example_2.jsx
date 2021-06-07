import { 
  useState, 
  useEffect, 
  useReducer 
} from 'react';

// ...

function Counter() {
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        // TODO:
        // 
        // Return updated state by handling actions:
        // 
        // UPDATE: Increments the count by incBy.
        // CHANGE: Change the incBy value.  

        default:
          return state;
      }
    },
    {
      count: 0,
      incBy: 1
    }
  );

  // TODO:
  //
  // Refactor useEffect callback to dispatch an UPDATE action.

  return (
    <>
      <p>Count: {state.count}</p>
      <input
        type="number"
        value={state.incBy}
        onChange={e => {
          const incBy = +e.target.value;

          // TODO:
          // 
          // Dispatch a CHANGE action.
        }}
      />
    </>
  );
}

export function App() {
  const [show, setShow] = useState(true);

  return (
    <>
      <button onClick={() => setShow(true)}>Show Counter</button>
      <button onClick={() => setShow(false)}>Hide Counter</button>
      {show && <Counter />}
    </>
  )
}