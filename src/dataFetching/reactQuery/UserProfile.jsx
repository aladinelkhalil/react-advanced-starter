import {
  useQuery
} from 'react-query';

import {
  fetchResource,
  fetchImage
} from './util';

import {
  Followers,
  Repos,
} from './components';

import {
  BASE_URL
} from './constants';

// ...

export const UserProfile = ({ user }) => {
  // const {
  //   data: details, 
  //   isLoading: detailsLoading
  // } = ...;

  // const {
  //   isLoading: avatarLoading
  // } = ...;

  // if (detailsLoading || avatarLoading) {
  //   return <p>Loading {user}...</p>
  // }

  return (
    <>
      <div className="row" style={{ flexDirection: 'column' }}>
        <div>
          {/* Uncomment the markup below when the details object exists. */}
          {/* <img className="image" src={details.avatar_url} alt="" /> */}
        </div>
        {/* Uncomment the markup below when the details object exists. */}
        {/* <h1>{details.name}</h1> */}
      </div>
      <div className="row">
        <div className="column">
          <Repos endpoint={`${BASE_URL}/${user}/repos`} />
        </div>
        <div className="column">
          <Followers endpoint={`${BASE_URL}/${user}/followers`} />
        </div>
      </div>
    </>
  )
}