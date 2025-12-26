import type { AxiosResponse } from "axios";
import { baseRequest } from "../../../../services/apiService";

export interface CreateTransactionResponse {
    status: number;
    message: string;
    data: {
        invoice_number: string,
        service_code: string,
        service_name: string,
        transaction_type: string,
        total_amount: string,
        created_on: string,
    };
}

export interface TransactionHistory {
    invoice_number: string,
    transaction_type: string,
    description: string,
    total_amount: string,
    created_on: string,
}

export interface GetTransactionHistoryResponse {
    status: number;
    message: string;
    data: {
        offset: string,
        limit: string,
        records: TransactionHistory[] | null,
    };
}

export async function createTransaction({ serviceCode }: { serviceCode: string }): Promise<AxiosResponse<CreateTransactionResponse>> {
    return baseRequest().post('/transaction', { service_code: serviceCode.toUpperCase() });
}

export async function getTransactionHistory(offset: number = 0, limit: number = 5): Promise<AxiosResponse<GetTransactionHistoryResponse>> {
    return baseRequest().get('/transaction/history', { params: { offset, limit } });
}