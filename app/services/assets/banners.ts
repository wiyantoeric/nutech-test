import { baseRequest } from "../api";

export async function getBanners() {
    return baseRequest().get('/banner');
}