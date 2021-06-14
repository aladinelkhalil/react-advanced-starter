import axios from 'axios';

const delay = (resolveWith, ms) => {
  return new Promise(resolve => {
    setTimeout(
      () => resolve(resolveWith),
      ms
    )
  });
}

export const fetchResource = async (uri, delayMs) => {
  const result = await axios(
    uri, 
    // note: Uncomment the section below when using a Github token.
    // {
    //   headers: {
    //     'Authorization': 'Bearer <token>'
    //   }
    // }
  );

  return delayMs ? delay(result.data, delayMs) : result.data;
}

export const fetchImage = src => {
  return new Promise(resolve => {
    const img = document.createElement('img');
    img.src = src;
    img.onload = () => {
      resolve(src)
    }
  });
}