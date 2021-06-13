import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import {
  Navigation
} from './components';

import {
  Home,
  Login
} from './pages';

// ...

export function App() {
  return (
    <Router>
      <Navigation
        links={[
          { href: '/', name: 'Home' },
          { href: '/users', name: 'Users' }
        ]}
        style={{
          marginBottom: 50
        }}
      />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  )
}