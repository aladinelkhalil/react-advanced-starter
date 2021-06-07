export function reducer(state, action = {}) {
  switch (action.type) {
    // TODO:
    //
    // Return updated state by handling actions:
    //
    // TASK_EXECUTE
    // TASK_SUCCESS
    // TASK_FAILURE
    // TASK_CANCEL

    default:
      throw new Error('Unknown action!');
  }
}

export const initialState = {
  status: 'idle',
  result: null,
  error: null
};