import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_Base_Url,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  auth: {
    username: process.env.EXPO_PUBLIC_Account_Id,
    password: process.env.EXPO_PUBLIC_Auth_Token,
  },
});

export default axiosInstance;
