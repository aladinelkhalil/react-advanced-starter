# Exercise: react-testing-library

This exercise introduces the react-testing-library (also part of Create React App) and how to use it for unit testing components.

## Forms

In the `todo` example, create a folder `__tests__` and add a test file `TodoForm.spec.js`, which will be used to test the TodoForm component.

Import the following:

```javascript
import {
  render,
  screen,
  fireEvent 
} from '@testing-library/react';

import userEvent from '@testing-library/user-event';
```

> The `fireEvent` import will be explained below.

Create and run the following (separate) tests:

1. TodoForm initially renders with an empty title.

    To figure out what query to use for getting the input (for checking its value), try both of the following options:

    * On the [Which query should I use?](https://testing-library.com/docs/guide-which-query/) page, see if there is any recommended query for the input (hint: could the _placeholder_ text be of use?).

    * Add a `screen.debug()` call after the render. Copy the resulting markup into the [Testing playground](https://testing-playground.com/) and see what it recommends.

2. Simulate entering a title and submitting the form.

    This part involves several steps:

    * To successfully submit a form, a prop (callback) `createTodo` must be passed to the TodoForm. Create and pass a mock callback that can be used later to assert the test:

        ```javascript
        const createTodo = jest.fn();
        ```

    * Get the input element and simulate entering a text. This can be done as follows:

        ```javascript
        userEvent.type(input, 'foo')
        ```

        Assert that the input element has the corresponding value set after this has run.

    * Submit the form and assert that 1) the input element has been reset to an empty title, and 2) the mock callback has been called _exactly_ once with title.

        > Note 1: `fireEvent.submit` must used instead of `userEvent`, as the latter does not support submitting.
        > Note 2: Getting the form is a bit tricky; for the purposes of this example, consider adding a `data-testid="todo-form"` attribute to the form element, and query it with `getByTestId`.

3. (Optional) Submit a form with an empty title.

    Try submitting the form when no title has been entered. Assert the expected results.

## Asynchronous component code

In testing forms, all updates that resulted from simulated events were synchronous, meaning assertions could be performed immediately, such as submitting the form and asserting the input change.

When certain events are asynchronous however, the unit test must _wait for_ any updates to result in the rendering output that is to be asserted.

E.g., in the `todo` example, when the App component is initially rendered it triggers an asynchronous data fetching call, updating the state with the response (fetched todos) and rendering anew.

The unit test must thus wait for the state update to occur in order to find any rendered Todo components.

To prepare to test the App component, complete the following steps:

1. Add a file `App.spec.js` under `todo/__tests__` with these imports:

    ```javascript
    import { 
      render, 
      screen,
      waitFor
    } from '@testing-library/react';

    import userEvent from '@testing-library/user-event';
    ```

    Also copy `todos.json` to `todo/__tests__`.

2. As the App component performs HTTP requests, these need to be intercepted to return appropriate responses.

    Add this code to set up a mock server (using the library [MSW](https://mswjs.io/)):

    ```javascript
    import {
      rest
    } from 'msw';

    import {
      setupServer
    } from 'msw/node';

    import {
      App
    } from '../App';

    // ...
    // Mock todos.
    const todos = require('./todos.json');

    const server = setupServer(
      rest.get(
        'http://jsonplaceholder.typicode.com/todos',
        async (_req, res, ctx) => {
          // return mock todos upon a GET request.
          return res(ctx.status(200), ctx.json(todos))
        }
      ),
      rest.delete(
        'http://jsonplaceholder.typicode.c/todos/:todoId',
        async (_req, res, ctx) => {
          return res(ctx.status(200), ctx.json({}))
        }
      )
    );

    beforeAll(() => server.listen());
    afterAll(() => server.close());

    ```

  The server is set to start before any tests are run, and to shut down after tests have been run.

### Testing the initial render

The App component should initially fetch and render a list of todos.

A unit test for this scenario must:

* Wait for all todos to be rendered and then retrieve them.

    A query variant that does this is [findAllBy](https://testing-library.com/docs/dom-testing-library/api-queries/#findallby).

    > Notice that this variant __returns a promise__.

    It's common to assign the `role` attribute to (uncommon) elements that are to be queried. Assign the attribute `role="todo-title"` in the `Todo` component as follows:

    ```javascript
    <Label
      htmlFor={id}
      completed={completed}
      role="todo-title"
    >
      {title}
    </Label>
    ```

    Then use `screen.findAllByRole` to retrieve rendered todos. Again, this query method returns a promise to await.

* Assert that the list of _rendered todos_ has the same length as the _mock todos_.

* _(Optional)_

    Assert that the text of each rendered todo matches the title of each mock todo.

    > Tip 1: Each rendered todo in the list returned by `screen.findAllByRole` has a `textContext` property.

    > Tip 2: _Do not_ assert each todo individually; rather the following assertion between two arrays should be made:

    ```javascript
    expect(renderedTodoTitles).toEqual(mockTodoTitles)  
    ```

### Testing an async update

Deleting a todo should send a DELETE request to the backend and then, upon a successful response, update the component state.

Rewrite the `deleteTodo` callback in the App component to first make a DELETE request before updating the state: 

```javascript
const deleteTodo = useCallback(async (todoId) => {
  await axios({
    url: `http://jsonplaceholder.typicode.com/todos/${todoId}`,
    method: 'DELETE'
  });
  
  dispatch({
    type: 'DELETE_TODO',
    todoId,
  });
}, []);
```

A unit test for this scenario must:

* Wait for all todos and their delete buttons to be rendered.

    Assign a `role="todo-delete"` attribute in the `Todo` component as follows:

    ```javascript
    <Close role="todo-delete" onClick={() => deleteTodo(id)} />
    ```

    Then use `screen.findAllByRole` to retrieve all delete buttons.

* Generate a click event on the first button (= first todo).

* Get all the rendered todos (`getAllByRole`) and assert that a todo has been removed.

    > Note that `findAllByRole` will not work here as it will instantly return the todos, before an update has occurred. Rather, refer to the `counter` example and the following construct:

    ```javascript
    await waitFor(() => {
      // get updated todos and perform the assertion.
    });
    ```
