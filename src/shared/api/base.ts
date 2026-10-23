import axios from 'axios';
import { STORAGE_KEYS } from "@/shared/config";

export const apiInstance = axios.create({
    baseURL: '/',
    headers: {
        'Content-Type': 'application/json',
    },
});

apiInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
        if (token && config.headers) {
            config.headers.Authorization = token
        }
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
)