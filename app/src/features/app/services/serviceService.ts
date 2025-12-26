import type { AxiosResponse } from "axios";
import { baseRequest } from "../../../../services/apiService";

export interface Service {
    service_code: string,
    service_name: string,
    service_icon: string,
    service_tariff: string,
}

export interface GetServicesResponse {
    status: number;
    message: string;
    data: Service[] | null;
}

export async function getServices(): Promise<AxiosResponse<GetServicesResponse>> {
    return baseRequest().get('/services');
}
