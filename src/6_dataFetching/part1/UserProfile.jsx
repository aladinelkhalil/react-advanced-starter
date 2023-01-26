import {
  useState
} from 'react';

import {
  Followers,
  Repos,
} from './components';

// ...

export const UserProfile = ({ user }) => {
  const [profile, setProfile] = useState(null);

  if (!profile) {
    return <p>Loading {user}...</p>
  }

  return (
    <>
      <div className="row" style={{ flexDirection: 'column' }}>
        <div>
          <img className="image" src={profile.details.avatar_url} alt="" />
        </div>
        <h1>{profile.details.name}</h1>
      </div>
      <div className="row">
        <div className="column">
          <Repos repos={profile.repos} />
        </div>
        <div className="column">
          <Followers followers={profile.followers} />
        </div>
      </div>
    </>
  )
}