# Exercise: Building a custom hook for task execution

In this exercise a _task executor_ will be implemented as a custom _useTask_ hook.

A _task_ is an asynchronous operation represented by a Promise, e.g. fetching data or accessing the user's current location.

_useTask_ will allow you to run and cancel tasks, and also receive status information during task execution.

## Part 1: Implementing useTask

There are three steps in this part of the exercise:

* Implement a reducer that manages the state of a __single task__ while it's being run.

  The reducer is implemented as a standalone function in `taskReducer.js`, with associated unit tests in `__tests__/taskReducer.spec.js`. 

* Once the reducer has been implemented and tested, it can be utilized within _useTask_ (in conjunction with the _useReducer_ hook)

  Add the logic indicated by the _TODO_ comments.

  __A note about task cancellation__:
  The _run_ method exposed by the _useTask_ API accepts a Promise (the object representing a task). A Promise, once it has commenced, cannot be interrupted but rather will run to completion, ending up either resolved or rejected.

  In the context of _useTask_, this implies that if a task is to be cancelled, it needs to be marked as such to _prevent further state updates for it_; in essence, we ignore the result of the Promise.
  
  This is accomplished by setting, and subsequently checking for, a custom `cancelled` property on the Promise object, in the _useEffect_ callback that encapsulates task execution.

* Complete the _App_ component in `v1/App.jsx` by implementing the sections marked with _TODO_.

  The `fetchUser` function in `shared/util.js` accepts a user ID and returns a Promise.

### Optional: Fetch user upon initial rendering

Currently, no user is fetched upon the _App_ component's first render.

Add support for fetching _both_ an initial user (ID = 1) upon first render, as well as subsequent selected users.

## Part 2: "Instant Fetch"

> Note: Change the export to _v2_ in `index.js`.

In this part you will improve the user experience by implementing "instant fetch" functionality, whereby data fetching will occur instantly when a different user ID is selected.

To prohibit unnecessary fetches debouncing will be employed, via Lodash [debounce](https://lodash.com/docs/#debounce).

There are two sections to implement:

* _TODO 1_

  Create a debounced function that runs a `fetchUser` task.

  > Note: For Lodash _debounce_, set the `wait` parameter to a suitable delay, e.g. 2000 ms. No extra options are necessary.

  Observe the Network panel in Chrome Devtools when testing the debounced function and note the behavior.

* _TODO 2_

  Fix the (faulty) behavior by memoizing the debounced function with the [useMemo](https://reactjs.org/docs/hooks-reference.html#usememo) hook.

### Optional: Alternative to memoization

In certain scenarios memoization can be avoided, typically by __lifting logic outside the component__.

Implement a debouncing solution where _useMemo_ is not utilized.

### Optional: AbortController

_useTask_ supports task cancellation, but due to the manner in which Promises operate, cancellation only implies ignoring the Promise result.

For certain types of tasks however, explicit cancellation may be possible. E.g., the [AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController) API allows you to cancel a web request.

Peruse [this article](https://medium.com/datadriveninvestor/aborting-cancelling-requests-with-fetch-or-axios-db2e93825a36) for an overview of AbortController, and use an _Axios cancel token_ to cancel a fetch task for a given user ID.

> Hint 1: In `shared/util.js`, create a new function _fetchUserCancellable_ (based on _fetchUser_) which uses an Axios cancel token. Also, to better observe request cancellation, throttle the network speed in Chrome Devtools to e.g. "Slow 3G".

> Hint 2: In _useTask_, in addition to setting a `cancelled` property on the task (Promise object), check for whether it has a `cancel` method and if so, invoke it.
