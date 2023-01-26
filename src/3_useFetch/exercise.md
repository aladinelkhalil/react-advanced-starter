# Exercise: useFetch

This exercise illustrates a pitfall that might occur when using `useEffect`.

## Infinite loop

The `useFetch` custom hook is used in the `AppInternal` component to fetch user data, when the user ID state changes.

As input, `useFetch` accepts a fetcher function, which actually performs the data fetching when it's invoked inside the hook.

There is a subtle, catastrophic error lurking in the code; the fetcher function is created _every time_ the `AppInternal` component rerenders; the `useEffect` call inside the `useFetch` includes the fetcher function in its dependency list, meaning the effect will rerun as well. Which means that the `AppInternal` component will rerender, with the fetcher function being recreated, triggering the `useEffect` again, and... well, you get the idea.

The fetcher function _should only be recreated when the user ID, that it's bound to, changes_. Employ `useCallback` to achieve this and thus avoid the dreaded infinite loop!
