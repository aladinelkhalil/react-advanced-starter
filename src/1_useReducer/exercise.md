# Exercise: useReducer

This exercise introduces the _useReducer_ hook; according to the [documentation](https://reactjs.org/docs/hooks-reference.html#usereducer)

> useReducer is usually preferable to useState when you have complex state logic that involves multiple sub-values or when the next state depends on the previous one.

## Part 1: The disadvantages of useState

This part of the exercise, aside from recapitulating the _useEffect_ hook, illustrates some of the issues that may arise when there is complex state logic in your application.

- Implement the section(s) marked with _TODO_ in `part1.jsx`.

- Add an _input_ element (in the Counter component) to change _by how much_ the counter should be updated.

## Part 2: The capabilities of useReducer

To mitigate the problems explored in the previous exercise part, implement the same example with the _useReducer_ hook, now in `part2.jsx`.

Use the counter example from the [documentation](https://reactjs.org/docs/hooks-reference.html#usereducer) as a guide.

### Bonus exercise

Implement the `useState` hook from scratch using `useReducer`. See further instructions in `index.jsx` in the bonus folder.
