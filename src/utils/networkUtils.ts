import type { INetworkData } from './model';

const commonParams: RequestInit = { headers: { 'content-type': 'application/json' } };

interface ICommonResponseParam<T> {
    status: number;
    body: T;
}

export const uri_without_version = window.location.host.includes('localhost')
    ? 'http://localhost:5998/'
    : 'http://54.89.211.203/';

export const uri = window.location.host.includes('localhost')
    ? 'http://localhost:5998/v1alpha1/'
    : 'http://54.89.211.203/v1alpha1/';

export async function post<T, R>(endpoint: string, data: R): Promise<ICommonResponseParam<T>> {
    try {
        const response = await fetch(`${uri}${endpoint}`, {
            ...commonParams,
            method: 'POST',
            body: JSON.stringify(data),
        });
        const parsedResponse: T = await response.json();
        return Promise.resolve({ status: response.status, body: parsedResponse });
    } catch (error) {
        return Promise.reject(error);
    }
}

export async function get<T>(uri: string, additionalParams?: RequestInit): Promise<ICommonResponseParam<T>> {
    try {
        let params: RequestInit = {
            ...commonParams,
            method: 'GET',
        };
        additionalParams && (params = { ...params, ...additionalParams });
        const response = await fetch(uri, params);
        const parsedResponse: T = await response.json();
        return Promise.resolve({ status: response.status, body: parsedResponse });
    } catch (error) {
        return Promise.reject(error);
    }
}

export function createNetworkObject<T>(data: T, isFetching = false, error = false): INetworkData<T> {
    return { isFetching, data, error };
}
