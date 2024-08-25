import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com';

export const fetchImages = (serchQuery, page) => {
  const axiosOptions = {
    params: {
      key: '45502477-f90d28a95f79ee2acbc927104',
      q: serchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: page,
      per_page: 15,
    },
  };

  return axios.get(`/api/`, axiosOptions);
};
