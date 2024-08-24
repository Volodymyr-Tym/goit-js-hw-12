import axios from 'axios';

const URL = 'https://pixabay.com';
const API_KEY = '45502477-f90d28a95f79ee2acbc927104';

export const fetchImages = serchQuery => {
  const urlParams = new URLSearchParams({
    key: API_KEY,
    q: serchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  return fetch(`${URL}/api/?${urlParams}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }

    return response.json();
  });
};
