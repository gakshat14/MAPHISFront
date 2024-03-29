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

export interface IUser {
    email: string;
    details: IDetails;
    user_id: string;
}

export interface IDecodedToken extends IUser {
    exp: number;
}

export interface IRegisterResponse {
    userid: string;
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

export interface ILandingProperties {
    name: string;
}

export interface IResearcherProps extends ILandingProperties {
    designation: string;
}

export interface IUniProps extends ILandingProperties {
    image: string;
}

export interface ILandingPageData {
    researchers: IResearcherProps[];
    participatingInstitute: IUniProps[];
}

export interface IOption {
    text: string;
    value: string;
}
