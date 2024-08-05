import axios from 'axios';
import { API_URL_v1 } from '../../../constant';
const API_URL = '/api/'; // Update with your API URL

export const registerUser = async (userData) => {
  return await axios.post(API_URL_v1.USER_REGISTER_API, userData);
};

export const loginUser = async (credentials) => {
  return await axios.post(API_URL_v1.USER_LOGIN_API, credentials);
};

export const getUserProfile = async (token) => {
  return await axios.get(API_URL_v1.USER_PROFILE_API, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
