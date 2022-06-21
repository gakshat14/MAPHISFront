import type { INetworkData } from './model';

const commonParams: RequestInit = { headers: { 'content-type': 'application/json' } };

const uri = window.location.host.includes('localhost') ? 'http://localhost:5998/' : 'http://3.87.55.122/';

export async function post<T, R>(endpoint: string, data: R): Promise<T> {
    try {
        const response = await fetch(`${uri}${endpoint}`, {
            ...commonParams,
            method: 'POST',
            body: JSON.stringify(data),
        });
        const parsedResponse: T = await response.json();
        return Promise.resolve(parsedResponse);
    } catch (error: any) {
        return Promise.reject(error);
    }
}

export function createNetworkObject<T>(data: T, isFetching = false, error = false): INetworkData<T> {
    return { isFetching, data, error };
}
