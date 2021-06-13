import {
  useLocation
} from 'react-router-dom';

export function Login() {
  const location = useLocation();
  
  // TODO: Get what is needed from AppContext to implement login functionality.
  
  // TODO: Check if user already is logged in. If so, redirect to a previous location or home, using the code below:
  // 
  //  const redirectTo = location.state?.from ?? '/'.
  //
  //  // note: Make sure to import the Redirect component from 'react-router-dom'.
  //  return <Redirect to={redirectTo} />

  const handleSubmit = e => {
    e.preventDefault();

    // TODO: Login user with provided credential (e.target.login.value).
  };

  return (
    <>
      <p>Login</p>
      <form onSubmit={handleSubmit}>
        <input id="login" />
      </form>
      {/* TODO: If login error occurred, display suitable error message. */}
    </>
  )
}
