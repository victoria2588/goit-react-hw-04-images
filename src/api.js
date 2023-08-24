import axios from 'axios';

const API_KEY = '38118761-5c53bea8af45b7f3b182c00e5';
axios.defaults.baseURL = `https://pixabay.com/api/`;

export const fetchImages = async (query, page) => {
  const separated = query.split('/');
  const exstractedQuery = separated[1];
  try {
    const response = await axios.get('', {
      params: {
        key: API_KEY,
        q: exstractedQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        page: page,
        per_page: 12,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
