import type { AxiosResponse } from "axios";
import { baseRequest } from "../../../../services/apiService";

export interface GetBalanceResponse {
    status: number;
    message: string;
    data: {
        balance?: number;
    };
}

export interface TopUpResponse {
    status: number;
    message: string;
    data: {
        balance?: number;
    };
}

export async function getBalance(): Promise<AxiosResponse<GetBalanceResponse>> {
    return baseRequest().get('/balance');
}

export async function topUp({ amount }: { amount: number }): Promise<AxiosResponse<TopUpResponse>> {
    return baseRequest().post('/topup', { top_up_amount: amount });
}