import {
  useEffect,
  useState
} from 'react';

import axios from 'axios';

export function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      // TODO:
      //
      // Capture error that may occur during profile fetching; simulate this by testing with a random faulty URL.
      //
      // const url = `https://randomuser${Math.random() > 0.5 ? '.me' : ''}/api/`;
      // const result = await axios(url);

      const result = await axios('https://randomuser.me/api/');

      setProfile(result.data.results[0]);
    }

    fetchProfile();
  }, []);

  const onEditDetails = () => {
    // TODO: 
    //
    // Catch and trace this (simulated) error.
    throw new Error('Could not edit user details');
  };

  // ...

  if (!profile) {
    return null;
  }

  const {
    name,
    picture
  } = profile;

  return (
    <>
      <p>{name.first} {name.last}</p>
      <div style={{ marginBottom: 50 }}>
        <img src={picture.large} alt="" />
      </div>
      <button onClick={onEditDetails}>Edit Details</button>
    </>
  )
}