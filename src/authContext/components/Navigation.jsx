import {
  Fragment as F
} from 'react';

import {
  Link
} from 'react-router-dom';

export function Navigation({ links, style }) {
  // TODO: Get what is needed from AppContext to implement logout functionality.
  
  return (
    <nav style={style}>
      {links.map(({ href, name }, i) => (
        <F key={i}>
          <Link to={href}>{name}</Link>
          {(i !== links.length - 1) && ' '}
        </F>
      ))}
      {/* TODO 2: Show logout button if user logged in. */}
    </nav>
  )
}