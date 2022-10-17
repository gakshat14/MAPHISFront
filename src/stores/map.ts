import type {
    INextRequest,
    INextResponse,
    ISpecificFeatureRequest,
    ISpecificFeatureResponse,
    IStartRequest,
    IStartResponse,
} from '@/models/classification';
import { get, post, uri } from '@/utils/networkUtils';
import { defineStore } from 'pinia';
import { classKeys } from '../geojson/sample_data';
import { useUserStore } from './user';
import { useNotificationStore } from '@dafcoe/vue-notification';
import { returnNotificationObject } from '@/utils/commonUtils';

interface IState {
    isClassifying: boolean;
    keysToBeClassified: string[];
    classifiedIndices: number[];
    currentKey: string;
    currentClassificationIndex: number;
    skippedIndices: number[];
    isFetching: boolean;
    total_features: number;
    regions: string[];
    featureInputValue: string;
}

const initialState: IState = {
    isClassifying: false,
    keysToBeClassified: classKeys,
    classifiedIndices: [],
    currentKey: '',
    currentClassificationIndex: NaN,
    skippedIndices: [],
    isFetching: false,
    total_features: NaN,
    regions: [],
    featureInputValue: '',
};

const { user } = useUserStore();
const { setNotification } = useNotificationStore();

export const useMapStore = defineStore({
    id: 'map',
    state: (): IState => ({ ...initialState }),
    actions: {
        async startClassification(map_id: string) {
            try {
                const response = await post<IStartResponse, IStartRequest>('classification/start', {
                    map_id,
                    user_id: user.user_id,
                    reset: false,
                });
                const index = response.body.current_feature;
                this.$patch({
                    isClassifying: true,
                    currentClassificationIndex: index,
                    classifiedIndices: response.body.classified,
                    total_features: response.body.total_features,
                });
            } catch (error: any) {
                setNotification(returnNotificationObject(error.message, 'alert'));
                console.error(error);
            }
        },
        async nextClassification(currentIndex: number, map_id: string) {
            try {
                const requestBody: Partial<INextRequest> = {
                    map_id,
                    user_id: user.user_id,
                    current_feature: currentIndex,
                };
                const newObject: Partial<IState> = {};
                if (!this.featureInputValue) {
                    requestBody.save = false;
                    newObject.skippedIndices = [...this.skippedIndices, currentIndex];
                } else {
                    requestBody.save = true;
                    requestBody.content = { value: this.featureInputValue };
                    // newObject.classifiedKeys = [...this.classifiedKeys, this.keysToBeClassified[currentIndex]];
                }
                const response = await post<INextResponse, Partial<INextRequest>>(
                    'classification/feature/next',
                    requestBody,
                );
                newObject.currentClassificationIndex = response.body.current_feature;
                newObject.currentKey = response.body.feature.properties.class;
                newObject.classifiedIndices = response.body.classified;
                newObject.featureInputValue = '';
                this.$patch(newObject);
            } catch (error: any) {
                setNotification(returnNotificationObject(error.message, 'alert'));
                console.error(error);
            }
        },
        async previousClassification(currentIndex: number, map_id: string) {
            try {
                const newIndex = currentIndex - 1;
                const requestBody: ISpecificFeatureRequest = {
                    user_id: user.user_id,
                    map_id,
                    feature_index: newIndex,
                };
                const response = await post<ISpecificFeatureResponse, ISpecificFeatureRequest>(
                    'classification/feature/id',
                    requestBody,
                );
                const newObject: Partial<IState> = {
                    currentClassificationIndex: response.body.current_feature,
                    currentKey: response.body.feature.properties.class,
                    classifiedIndices: response.body.classified,
                    featureInputValue: response.body.content?.value ?? '',
                };
                this.$patch(newObject);
            } catch (error: any) {
                setNotification(returnNotificationObject(error.message, 'alert'));
                console.error(error);
            }
        },
        endClassification() {
            this.isClassifying = false;
        },
        async getAllRegions() {
            try {
                const response = await get<string[]>(`${uri}metadata/maps`);
                this.$patch({ regions: response.body });
            } catch (error: any) {
                setNotification(returnNotificationObject(error.message, 'alert'));
            }
        },
    },
});
