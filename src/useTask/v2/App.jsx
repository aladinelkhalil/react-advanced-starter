import {
  useState,
  useMemo
} from 'react';

import _ from 'lodash';

import {
  fetchResource
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

const getUserResource = userId => `users/${userId}`;

export function App() {
  const [userId, setUserId] = useState(1);

  // TODO 1.1: Add user resource state (a string, see the helper method getUserResource above).

  const {
    status,
    result: user,
    error,
    run
  } = useTask();

  // TODO 1.2: Add a useEffect which runs every time the user resource state changes, and fetches the user.

  // TODO 1.3: Create a debounced function debounced_setUserResource - using _.debounce - that updates the user resource state;
  // this debounced function will be invoked in the handleChange event handler (see below). 
  // Investigate its behaviour.
  //
  // TODO 2:
  // 
  // Use the useMemo hook to create a new (memoized) debounced_setUserResource function (comment out the previous one).
  //
  // Use of useMemo hook:
  // 
  //  const debounced_setUserResource = useMemo(
  //   () => /* return debounced function to set the user resource state */ 
  //   []
  //  ).

  const handleChange = e => {
    const userId = +e.target.value;

    setUserId(userId);

    // set the (new) user resource state, using debounced_setUserResource.
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
