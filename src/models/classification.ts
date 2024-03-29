export interface ICommonClassificationRequest {
    user_id: string;
    map_id: string;
}

export type IFeatureClassifiedBody = ICommonClassificationRequest;

export interface IStartRequest extends ICommonClassificationRequest {
    reset: boolean;
}

export interface IFeature {
    type: string;
    properties: { class: string };
    geometry: {
        type: string;
        coordinates: number[][][];
    };
}

export interface IStartResponse {
    total_features: number;
    classified: number[];
    feature: IFeature;
    current_feature: number;
}

export interface INextRequest extends ICommonClassificationRequest {
    current_feature: number;
    save: boolean;
    content?: { value: string };
}

export interface ISpecificFeatureRequest extends ICommonClassificationRequest {
    feature_index: number;
}

export interface ISpecificFeatureResponse extends IStartResponse {
    content?: { value: string };
}

export interface IFeatureResponse {
    type: string;
    features: IFeature[];
}

export type INextResponse = IStartResponse;
