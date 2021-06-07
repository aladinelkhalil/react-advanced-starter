import {
  useState,
  useMemo
} from 'react';

import _ from 'lodash';

import {
  fetchUser
} from '../shared/util';

import {
  useTask
} from '../shared/useTask';

// ...

const baseStyle = {
  textAlign: 'center'
};

const inputStyle = {
  ...baseStyle,
  marginBottom: 20
};

// ...

export function App() {
  const [userId, setUserId] = useState(1);

  const {
    status,
    result: user,
    error,
    run
  } = useTask();

  // TODO 1:
  // 
  // Create a debounced function debounceTask, using _.debounce, to run the task fetchUser in handleChange. 
  // Investigate its behaviour.
  //
  // TODO 2:
  // 
  // Use the useMemo hook to create a new (memoized) debounceTask function (comment out the previous one).
  //
  // Use of useMemo hook:
  // 
  //  const debounceTask = useMemo(
  //   () => /* return debounced function to run the task fetchUser */, 
  //   [any dependencies]
  //  ).

  const handleChange = e => {
    const userId = +e.target.value;

    setUserId(userId);

    // run the debounced task, instead of running the task upon every input change.
    // debounceTask(userId);
    run(fetchUser(userId));
  };

  return (
    <>
      <div style={inputStyle}>
        <input
          type="number"
          value={userId}
          onChange={handleChange}
        />
      </div>

      <div style={baseStyle}>
        {status === 'pending' && 'Loading...'}
        {status === 'rejected' && `${error}`}
        {status === 'resolved' && (
          <p>Name: {user.name}</p>
        )}
      </div>
    </>
  )
}
