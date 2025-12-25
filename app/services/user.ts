import type { AxiosResponse } from "axios";
import { baseRequest } from "./api";

export interface User {
    email: string,
    first_name: string,
    last_name: string,
    profile_image?: string | null,
}

export interface GetProfileResponse {
    status: number;
    message: string;
    data: User | null;
}

export async function getProfile(): Promise<AxiosResponse<GetProfileResponse>> {
    return baseRequest().get('/profile');
}

export async function updateProfile(data: { first_name: string; last_name: string }): Promise<AxiosResponse<GetProfileResponse>> {
    return baseRequest().put('/profile/update', data);
}

export async function updateProfileImage(formData: FormData): Promise<AxiosResponse<GetProfileResponse>> {
    return baseRequest().put('/profile/image', formData);
}