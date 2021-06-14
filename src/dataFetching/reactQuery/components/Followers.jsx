import {
  useQuery
} from 'react-query';

import {
  fetchResource
} from '../util';

export const Followers = ({ endpoint }) => {
  // const {
  //   data: followers,
  //   isLoading
  // } = ...;
  
  // if (isLoading) {
  //   return 'Loading followers...';
  // }

  return (
    <>
      <h2>Followers</h2>
      {/* Uncomment the markup below when the followers object exists. */}
      {/* {followers.map((follower, i) => <p key={i}>{follower.login}</p>)} */}
    </>
  );
}