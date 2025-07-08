import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const instance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BACKEND_URL,
});

instance.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.statusCode === 401) {
      await AsyncStorage.removeItem('access_token');    
      await AsyncStorage.removeItem('user');
    }
    return Promise.reject(error);
  }
);


export default instance;


