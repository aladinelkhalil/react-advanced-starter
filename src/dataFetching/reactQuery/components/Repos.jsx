import {
  useQuery
} from 'react-query';

import {
  fetchResource
} from '../util';

export const Repos = ({ endpoint }) => {
  // const {
  //   data: repos,
  //   isLoading
  // } = ...;

  // if (isLoading) {
  //   return 'Loading repos...';
  // }
  
  return (
    <>
      <h2>Repositories</h2>
      {/* Uncomment the markup below when the repos object exists. */}
      {/* {repos.map((repo, i) => <p key={i}>{repo.name}</p>)} */}
    </>
  );
}