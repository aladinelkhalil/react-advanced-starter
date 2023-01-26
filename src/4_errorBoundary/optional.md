## Optional: Code splitting

There is not always a need to eagerly load all component code upon application startup.

E.g., if the user never navigates to the Search tab, the corresponding component code doesn't have to be loaded initially.

React's _code splitting_ allows for more granular control over loading components by splitting component code into separate chunks that may be lazily loaded.

Code split the **Search** component and ensure that its code chunk is only loaded when the user navigates to the Search tab:

- Read about [React.lazy](https://reactjs.org/docs/code-splitting.html#reactlazy) in the documentation.

- In `Content.jsx`, follow the example from the documentation to _dynamically_ import and render the **Search** component.

  > Note that you'll have to remove the static import of the **Search** component.

  Verify that code splitting works by viewing the Network panel in Chrome Devtools; a separate chunk should be loaded on demand when the user navigates to the Search tab.

- Wrap the rendering of the dynamically loaded **Search** component in an error boundary, as also demonstrated in the documentation.

  To simulate an error when loading component code, use the following call to `React.lazy` instead of the one with a dynamic import:

  ```javascript
  React.lazy(() => {
    return Promise.reject(new Error("Failed to load Search component"));
  });
  ```
