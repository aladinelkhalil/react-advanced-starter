import { mode } from "./mode";

// ...

export function useDocumentTitle(title) {
  document.title = title;
}

// ...

export function useMode(titles) {
  const words = titles.reduce((words, title) => {
    const word = title.split(" ");
    return [...words, ...word];
  }, []);

  return mode(words);
}
