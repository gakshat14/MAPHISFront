const commonParams: RequestInit = { headers: { 'content-type': 'application/json' } };

export async function post<T>(url: string, data: unknown): Promise<T | Error> {
    try {
        const response = await fetch(url, { ...commonParams, method: 'POST', body: JSON.stringify(data) });
        return await response.json();
    } catch (error: any) {
        return new Error(error.message);
    }
}
