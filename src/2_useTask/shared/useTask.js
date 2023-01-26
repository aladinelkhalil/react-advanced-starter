import { useState, useEffect, useReducer } from "react";
import { reducer, initialState } from "./taskReducer";

export function useTask() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [task, setTask] = useState(null);

  useEffect(() => {
    if (!task) {
      return;
    }

    // TODO: Dispatch TASK_EXECUTE to signal start of task execution.

    task
      .then((result) => {
        // TODO: Dispatch TASK_SUCCESS if task has not been cancelled.
      })
      .catch((error) => {
        // TODO: Dispatch TASK_FAILURE if task has not been cancelled.
      });

    return () => (task.cancelled = true);
  }, [task]);

  // TODO: Implement (and return below) a cancel method that sets task to null and dispatched TASK_CANCEL.

  return {
    ...state,
    run: setTask,
  };
}
