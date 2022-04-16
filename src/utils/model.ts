interface IDetails {
    firstName: string;
    lastName: string;
    occupation?: string;
    country?: string;
}

export interface IRegisterRequestBody {
    email: string;
    password: string;
    details: IDetails;
}

export interface IDecodedToken extends IDetails {
    exp: number;
    userId: string;
}

export interface IRegisterResponse {
    status: string;
    message: string;
    data: { userid: string };
}

export interface INetworkData<T> {
    isFetching: boolean;
    data: T;
    error: boolean;
}

export interface IToken {
    access_token: string;
    token_type: string;
}

export interface IAuthRequest {
    email: string;
    password: string;
}

export const initialRegisterObject: IRegisterResponse = { status: '', message: '', data: { userid: '' } };

export function createNetworkObject<T>(data: T, isFetching = false, error = false): INetworkData<T> {
    return { isFetching, data, error };
}
