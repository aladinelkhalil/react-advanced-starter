# Exercise: useFetch
This exercise illustrates a number of pitfalls that might occur when using `useEffect`.

## Infinite loop
The `useFetch` custom hook is used in the `AppInternal` component to fetch user data, when the user ID state changes.

As input, `useFetch` accepts a fetcher function, which actually performs the data fetching when it's invoked inside the hook.

There is a subtle, catastrophic error lurking in the code; the fetcher function is created _every time_ the `AppInternal` component rerenders; the `useEffect` call inside the `useFetch` includes the fetcher function in its dependency list, meaning the effect will rerun as well. Which means that the `AppInternal` component will rerender, with the fetcher function being recreated, triggering the `useEffect` again, and... well, you get the idea.

The fetcher function _should only be recreated when the user ID, that it's bound to, changes_. Employ `useCallback` to achieve this and thus avoid the dreaded infinite loop!

## Faulty state update on component unmount (advanced)
Try the following:

* Change the user ID.

* While the user data is being fetched, click _Hide_.

* Check the console - you'll see the following error:

      Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.

This occurs because the `AppInternal` component is unmounted _before_ the fetcher function (more specifically, the promise it returns) completes, and the code attempts a state update (with the fetched user data) on a component that no longer exists!

> Compare this to the similar problem occurring in the custom hook (and exercise) `useTask`.

We must therefore know when the component has been unmounted, to prevent a faulty state update.

Create a custom hook `useIsMounted` that has the following signature:

      const isMountedFunction = useIsMounted();

Inside the `useEffect`, use the `isMountedFunction` to prohibit an update if it returns `false` (=> the component has been unmounted).

> Hint 1: The `useIsMounted` hook will have to use a reference variable (created with `useRef`) to manage a mounted / unmounted boolean flag.

> Hint 2: You'll have to memoize the `isMountedFunction` before it's returned from the `useIsMounted` hook.