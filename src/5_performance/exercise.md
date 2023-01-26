# Exercise: Profiling, useCallback, useMemo and React.memo()

This exercise introduces profiling React components and how to optimize rendering in common scenarios.

## Part 1 - Fixing rendering bottlenecks

After having identified the code that has an adverse effect on rendering (through profiling), try to mitigate the following issue(s):

1. Even though `useDocumentTitle` does not currently impact performance (and premature optimization is the root of all evil!), it's nonetheless worthwhile to reason about how this hook can be reimplemented, for the purpose of performing potentially time-consuming tasks outside the render.

   Rewrite `useDocumentTitle` so that computing the completed count occurs outside the render.

2. `useMode` has been identified as a performance culprit, as computing the mode _inside_ the render slows the component rendering down substantially.

   There is a key thing to consider about _when_ the mode should be computed: it should only occur when the _number of todos_ change, i.e. when a todo is created or deleted from the list of todos (editing a todo is currently not supported).

   In `hooks.js`, copy the `useMode` hook to create a new `useMemoMode` hook. Change the new hook so that it memoizes the computed mode (hint: use `useMemo`), and only recomputes it when `titles.length` changes.

   Change the hook in the App component from `useMode` to `useMemoMode`.

   Run the React Profiler and mark a todo as completed; compare the rendering time using `useMemoMode` with using `useMode`.

3. The previous improvement helped somewhat but the problem remains when the list of todos _does_ change.

   The better solution is to put the entire computation _outside the render_, with `useEffect`.

   In `hooks.js`, copy the `useMode` hook to create a new `useAsyncMode` hook. Change the new hook to have the following:

   - `useState` to store the computed mode as (local) state.

   - `useEffect` to run the computation when `titles.length` changes.

   - To avoid an ESLint warning, store the incoming `titles` in a reference:

     ```javascript
     const ref = useRef();
     ref.current = titles;
     ```

     and access inside the `useEffect` via `ref.current`.

     Change the hook in the App component from `useMemoMode` to `useAsyncMode`.

     Run the React Profiler and perform several todo operations; compare the rendering time (and the general application responsiveness) using `useAsyncMode` with the previous hooks.

## Part 2 - Optimizing list rendering

Now that some bottlenecks have been alleviated, let's turn to another issue, namely rendering the list of Todo components.

1. To avoid rendering Todo components unnecessarily, wrap Todo in [React.memo](https://reactjs.org/docs/react-api.html#reactmemo).

   Run React Profiler and determine if it helped (if not, _why_ not?).

2. **Memoize any necessary props that are passed to Todo**

   > Hint: Use `useCallback`.

   Run React Profiler again - the list should now render significantly faster.

3. An additional application requirement has surfaced; when the user hovers over a todo, focus (highlight) it by displaying a border around it.

   In `App.jsx`, add the following:

   ```javascript
   // state to store the id of the currently focused todo.
   const [focusedTodo, setFocusedTodo] = useState(null);
   ```

   ```javascript
   // pass the following props to each Todo when iterating over the list:
   <Todo
     key={todo.id}
     {...todo}
     updateTodo={updateTodo}
     deleteTodo={deleteTodo}
     focused={focusedTodo}
     setFocused={setFocusedTodo}
   />
   ```

   In `Todo.jsx`, add the following:

   ```javascript
   // determine whether the focused todo matches the current todo.
   const style = {
     border: focused === id ? "2px solid" : "none",
   };

   return (
     <div css={todo} style={style} onMouseEnter={() => setFocused(id)}>
       // ...
     </div>
   );
   ```

   Run the React Profiler; what is the result (and why)?

   Come up with a solution to fix the problem (hint: "lift up" the logic for determining if a todo is focused). Verify with the React Profiler.
