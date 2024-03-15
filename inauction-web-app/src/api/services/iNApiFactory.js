import axios from 'axios';
import Config from '../config';

const getToken = () => {
  const token = JSON.parse(localStorage.getItem('jwtToken'));
  if (token == null) return '';
  return token;
}

const iNFactory = new axios.create({
  timeout: 30000,
  baseURL: Config.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization':  'Bearer ' + getToken()
  },
});

iNFactory.interceptors.response.use(response => response, error => {
  if (error.response && error.response.status === 401) {
    //todo fix this
    //setStorageKey(KEYS.IS_LOGGED_IN, false);
  }
  return Promise.reject(error.response ? error.response.data : error);
});

export default iNFactory;
