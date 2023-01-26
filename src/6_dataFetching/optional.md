# Optional exercises

## Caching

- Add caching of fetched resources in the `useFetch` hook.

  In the `useFetch.js` file, create an object _outside_ the hook, mapping URLs to (fetched) data.

  _Inside_ the hook, add code for checking if data for a given URL has already been fetched (and thus cached), otherwise cache it.

## Prefetching

- Currently, repos and followers won't start to fetch until the user's details have been loaded first. To avoid this "waterfall", you can _prefetch_ repos and followers when a new user is selected.

  Add a `preFetch` function to the `useFetch.js` file, that accepts a URL as an argument and maps it to the Promise returned by `fetchResource`.

  > Note: You'll have to create an object that maps URLs to Promises.

  Add logic inside the `useFetch` hook to check whether any resources are being prefetched.

  In the _App_ component (in `index.jsx`), in the `selectUser` method, add calls to the `preFetch` function with the URLs for repos and followers for the selected user.

## Prefetching with React Query

- To implement prefetching (of repos and followers; see the `preFetch` method in `util.js`), see [prefetching](https://react-query.tanstack.com/guides/prefetching).
