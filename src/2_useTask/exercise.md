# Exercise: Building a custom hook for task execution

In this exercise a _task executor_ will be implemented as a custom _useTask_ hook.

A _task_ is an asynchronous operation represented by a Promise, e.g. fetching data or accessing the user's current location.

_useTask_ will allow you to run and cancel tasks, and also receive status information during task execution.

## Part 1: Implementing useTask

There are three steps in this part of the exercise:

- Implement a reducer that manages the state of a **single task** while it's being run.

  The reducer is implemented as a standalone function in `taskReducer.js`, with associated unit tests in `shared/__tests__/taskReducer.spec.js`. Run the tests with `npm run test` and make sure that all five tests pass before moving on. You can use the test results and errors as a guide to help you implement the `taskReducer`. Note that the first test _should throw an error for an unsupported action_ is already passing. Do NOT change anything in the test file.

- Once the reducer has been implemented and tested, it can be utilized within _useTask_ (in conjunction with the _useReducer_ hook)

  Add the logic indicated by the _TODO_ comments.

  **A note about task cancellation**:
  The _run_ method exposed by the _useTask_ API accepts a Promise (the object representing a task). A Promise, once it has commenced, cannot be interrupted but rather will run to completion, ending up either resolved or rejected.

  In the context of _useTask_, this implies that if a task is to be cancelled, it needs to be marked as such to _prevent further state updates for it_; in essence, we ignore the result of the Promise.

  This is accomplished by setting, and subsequently checking for, a custom `cancelled` property on the Promise object, in the _useEffect_ callback that encapsulates task execution.

- Complete the _App_ component in `part1/App.jsx` by implementing the sections marked with _TODO_.

  The `fetchUser` function in `shared/util.js` accepts a user ID and returns a Promise.

- Currently, no user is fetched upon the _App_ component's first render. Add support for fetching _both_ an initial user (ID = 1) upon first render, as well as subsequent selected users.

## Part 2: "Instant Fetch"

> Note: Change the export to _part2_ in `index.js`.

In this part you will improve the user experience by implementing "instant fetch" functionality, whereby data fetching will occur instantly when a different user ID is selected (and will also fetch the default user automatically upon component mount).

To prohibit unnecessary fetches debouncing will be employed, via Lodash [debounce](https://lodash.com/docs/#debounce).

There are two sections to implement:

- _TODO 1_

  **First**, add an additional state variable called `userResource`; we separate the user ID state displayed in the UI from the actual user resource state that refers to the user to fetch. The helper method `getUserResource` accepts a user ID and returns the resource path to pass to the imported method `fetchResource`.

  **Second**, add an `useEffect` call that will be run every time the `userResource` state changes, and fetches the corresponding user data. This is similar to the first part of this section.

  **Third**, create a debounced function in the `App` ecomponent that sets the new `userResource` state.

  > Note: For Lodash _debounce_, set the `wait` parameter to a suitable delay, e.g. 500 ms. No extra options are necessary.

  Observe the Network panel in Chrome Devtools when testing the debounced function and note the behavior.

- _TODO 2_

  Fix the (faulty) behavior by memoizing the debounced function with the [useMemo](https://reactjs.org/docs/hooks-reference.html#usememo) hook.
