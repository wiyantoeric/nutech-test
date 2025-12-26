import { baseRequest } from "../../../../services/apiService";

export interface BaseResponse {
    status: number;
    message: string;
    data?: any;
}

export interface RegistrationRequest {
    email: string;
    first_name: string;
    last_name: string;
    password: string;
}

export const register = (data: RegistrationRequest) => {
    return baseRequest().post<BaseResponse>('/registration', data);
};

export async function login(credentials: any) {
    return baseRequest().post('/login', credentials);
}
