const commonParams: RequestInit = { headers: { 'content-type': 'application/json' } };

export async function post<T, R>(url: string, data: R): Promise<T> {
    try {
        const response = await fetch(url, { ...commonParams, method: 'POST', body: JSON.stringify(data) });
        const parsedResponse: T = await response.json();
        return Promise.resolve(parsedResponse);
    } catch (error: any) {
        return Promise.reject(error);
    }
}
