# Exercise: React 18 APIs
This exercise demonstrates the use of React 18's new _concurrent features_. 

To upgrade to React 18 (RC), run the following in the project root folder:

    npm install react@rc react-dom@rc

In `src/index.js`, activate the React 18 features (see comments). Then import either the `react18/useDeferredValue` or `react18/suspense` examples.

## suspense
In this example, a view with a list of Github users is presented. When a particular user is selected, the user information is fetched via the Github API and rendered in a "profile view".

Preparatory steps: 

- Run the following in the project root folder (creates a mock service worker):

    npx msw init public

- Add a Github PAT (Personal Access Token) for API authentication - see the `fetchResource` method `suspense/util.js`.

### useTransition
When selecting a Github user, you'll notice that a `Loading view...` indicator is immediately shown. 

A new feature in React 18 are so-called _transitions_, i.e. the ability to prepare (= render) a view in the background and switch over to it once it's finished rendering.

In this example, it'd greatly improve the user experience if we could skip showing the `Loading view...` indicator and instead remain on the list view while the profile view for the selected user is being prepared; we can also display a subtle spinner next to the selected user. Once the profile view has finished rendering in the background, we _transition_ to it. 

To accomplish this, we need the new `useTransition` hook with the following signature: 

    const [isPending, startTransition] = useTransition();

The `isPending` flag is `true` while a transition is in progress, and any non-urgent state updates should be wrapped in `startTransition` as follows:

    startTransition(() => {
      // perform non-urgent state update.
    });

**Implement the following**:

- Begin a transition to the profile view (as a non-urgent update) when a user is selected.

- Show a `...` indicator next to the selected user while a transition is pending.

> Note: The browser will aggressively cache fetched Github data; in order to clean the cache now and then, e.g. for testing the pending indicator, empty the cache by a) having Chrome Devtools open, and b) _right-clicking the browser reload button and then clicking "Empty cache..."_. 

Notice that you'll remain on the list view while the profile view is being prepared, and you can even select a different Github user!

### Suspense boundaries
Currently, the transition to the profile view waits for all components - `UserProfile`, `Repos` and `Followers` - to finish fetching and rendering their respective data. 

This loading sequence - render all components in parallel and transition only once they've all finished - can be altered as follows: _As soon as `UserProfile` has fetched its data and finished rendering, transition to the profile view_.

This means that we assign a _higher priority_ to the user profile data, as it's of primary interest in the profile view; repositories and followers data is simply rendered as it arrives. 

To achieve this loading sequence, we isolate components with lower priorities via so-called _Suspense boundaries_:

```javascript
import { Suspense } from 'react';

// in a component...
<Suspense fallback={'Loading component...'}>
  <Component />
</Suspense>
```

**Implement the following**:

- Isolate `Repos` and `Followers` in their own Suspense boundaries.

  Observe that `UserProfile` is rendered first, with `Repos` and `Followers` rendered later as their data arrives.

- Change the loading sequence so that `Repos` and `Followers` _are now rendered together_. 

  Observe that `Repos` and `Followers` are synchronized to render at the same time.

## useDeferredValue (optional)
A (simplified) version of the `useDeferredValue` hook can be implemented using the `React.startTransition` method, by starting a transition in the background when a new value is received.

In the exercise `useDeferredValue/v2`, implement the hook and replace the built-on variant with it; ensure that the example's behaviour remains unchanged.

> Note: Skip the passing and handling of a "timeout` parameter to the hook.