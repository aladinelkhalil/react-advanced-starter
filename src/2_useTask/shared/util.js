import axios from "axios";

// ...
// For part1.
export function fetchUser(id, delayMs = 1000) {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        resolve(
          (await axios(`https://jsonplaceholder.typicode.com/users/${id}`)).data
        );
      } catch (error) {
        reject(error);
      }
    }, delayMs);
  });
}

// ...
// For part2.
export function fetchResource(resource, delayMs = 1000) {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        resolve(
          (await axios(`https://jsonplaceholder.typicode.com/${resource}`)).data
        );
      } catch (error) {
        reject(error);
      }
    }, delayMs);
  });
}
