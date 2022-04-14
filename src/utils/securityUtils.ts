import type { IDecodedToken } from './model';

export function storeInSessionStorage<T>(keyName: string, dataToStore: T) {
    window.sessionStorage.setItem(keyName, JSON.stringify(dataToStore));
}

export function decodeJWTToken(token: string): IDecodedToken {
    return JSON.parse(atob(token.split('.')[1]));
}
