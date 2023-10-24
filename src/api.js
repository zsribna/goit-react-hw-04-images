// import axios from "axios";

// axios.defaults.baseURL =
//     'https://pixabay.com/api/?q=cat&page=1&key=38616901-e7b0e5046f7c06c2a4d7939a7&image_type=photo&orientation=horizontal&per_page=12';
  
// export const imagesItems = async ({ galerryValue }) => {
//   const response = await axios.get(
//     `https://pixabay.com/api/?q=${galerryValue}&page=1&key=38616901-e7b0e5046f7c06c2a4d7939a7&image_type=photo&orientation=horizontal&per_page=12`
//   );
// console.log(response.data)
//     return response.data;
   
// };
import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '38616901-e7b0e5046f7c06c2a4d7939a7';


export const imagesItems = async (galerryValue, page) => {
  const option = {
    headers: {
      'Content-type': 'application/json',
    },
    params: {
      key: API_KEY,
      q: `${galerryValue}`,
      image_type: 'photo',
      photo: 'horizontal',
      safesearch: 'true',
      page: `${page}`,
      per_page: 12,
    },
  };
  const { data } = await axios(BASE_URL, option);
  return data;
};