import React, {
  useMemo,
  useRef,
  useState
} from 'react';

import _ from 'lodash';

// ...

const QueryFail = 'fail';

function SearchEngine({ query }) {
  if (!query) {
    return null;
  }

  if (query.toLowerCase() === QueryFail) {
    throw new Error('Search failed for query "' + query + '"');
  }

  return `Search: ${query}`;
}

function SearchFallback() {
  return 'A search error occurred';
}

export default function Search() {
  const [query, setQuery] = useState('');

  const debouncedSetQuery = useMemo(
    () => _.debounce(
      value => setQuery(value),
      400
    ),
    []
  );

  const inputRef = useRef();
    
  return (
    <div>
      <input 
        ref={inputRef}
        placeholder="Search"
        onChange={() => debouncedSetQuery(inputRef.current.value)}
      />

      <div style={{
        marginTop: 50
      }}>
        {/* TODO: Add an error boundary with SearchFallback as the fallback component. */}
        <SearchEngine query={query} />
      </div>
    </div>
  )
}