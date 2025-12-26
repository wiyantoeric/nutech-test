import { baseRequest } from "../../../../services/apiService";

export async function getBanners() {
    return baseRequest().get('/banner');
}