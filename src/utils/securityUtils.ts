import type { IDecodedToken } from './model';

export function storeInSessionStorage<T>(keyName: string, dataToStore: T) {
    window.sessionStorage.setItem(keyName, JSON.stringify(dataToStore));
}

export function retrieveFromStorage<T>(keyName: string): T | undefined {
    const result = window.sessionStorage.getItem(keyName);
    if (result) {
        const parsedObject: T = JSON.parse(result);
        return parsedObject;
    }
    return undefined;
}

export function decodeJWTToken(token: string): IDecodedToken {
    return JSON.parse(atob(token.split('.')[1]));
}
