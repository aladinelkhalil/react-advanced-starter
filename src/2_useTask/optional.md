### Alternative to memoization

In certain scenarios memoization can be avoided, typically by **lifting logic outside the component**.

Implement a debouncing solution where _useMemo_ is **not** utilized.

### AbortController

_useTask_ supports task cancellation, but due to the manner in which Promises operate, cancellation only implies ignoring the Promise result.

For certain types of tasks however, explicit cancellation may be possible. E.g., the [AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController) API allows you to cancel a web request.

Peruse [this article](https://medium.com/datadriveninvestor/aborting-cancelling-requests-with-fetch-or-axios-db2e93825a36) for an overview of AbortController, and use an _Axios cancel token_ to cancel a fetch task for a given user ID.

> Hint 1: In `shared/util.js`, create a new function _fetchResourceCancellable_ (based on _fetchResource_) which uses an Axios cancel token. Also, to better observe request cancellation, throttle the network speed in Chrome Devtools to e.g. "Slow 3G".

> Hint 2: In _useTask_, in addition to setting a `cancelled` property on the task (Promise object), check for whether it has a `cancel` method and if so, invoke it.
