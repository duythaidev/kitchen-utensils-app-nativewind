import AsyncStorage from "@react-native-async-storage/async-storage";
import instance from "../utils/instance";

export const login = async (email: string, password: string) => {
    const response = await instance.post('/auth/login', { email, password });
    return response.data;
};

export const register = async (email: string, password: string) => {
    const response = await instance.post('/auth/register', { email, password });
    return response.data;
};

export const getUserProfile = async () => {
    const response = await instance.get('/auth/me');
    return response.data;
};

export const logout = async () => {
    await AsyncStorage.removeItem('access_token');
    await AsyncStorage.removeItem('user');
};