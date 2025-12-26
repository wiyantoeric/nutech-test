import type { AxiosInstance } from "axios";
import axios from "axios";
import { store } from "~/store";

// Base API request, include JWT Auth
export const baseRequest = (): AxiosInstance => {
    const request = axios.create({
        baseURL: 'https://take-home-test-api.nutech-integrasi.com',
    });

    request.interceptors.request.use((config) => {
        const token = store.getState().auth.token;

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    });

    return request;
}