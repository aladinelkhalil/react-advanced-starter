import _ from 'lodash';

import {
  mode
 } from "./mode";

// ...

export function useDocumentTitle(title) {
  document.title = title;
}

// ...

export function useMode(stringArray) {
  const words = _.flatten(
    stringArray.reduce((words, word) => {
      return [...words, word.split(' ')];
    }, [])
  );

  return mode(words);
}