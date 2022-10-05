import type {
    INextRequest,
    INextResponse,
    ISpecificFeatureRequest,
    ISpecificFeatureResponse,
    IStartRequest,
    IStartResponse,
} from '@/models/classification';
import { post } from '@/utils/networkUtils';
import { defineStore } from 'pinia';
import { classKeys } from '../geojson/sample_data';
import { useUserStore } from './user';
import { useNotificationStore } from '@dafcoe/vue-notification';
import { returnNotificationObject } from '@/utils/commonUtils';

interface IState {
    isClassifying: boolean;
    keysToBeClassified: string[];
    classifiedKeys: string[];
    currentKey: string;
    currentClassificationIndex: number;
    skippedKeys: string[];
    isFetching: boolean;
    classifiedIndex: number[];
    total_features: number;
}

const initialState: IState = {
    isClassifying: false,
    keysToBeClassified: classKeys,
    classifiedKeys: [],
    currentKey: '',
    currentClassificationIndex: NaN,
    skippedKeys: [],
    isFetching: false,
    classifiedIndex: [],
    total_features: NaN,
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
                    isClassifying: !this.isClassifying,
                    currentClassificationIndex: index,
                    currentKey: response.body.feature.properties.class,
                    classifiedIndex: response.body.classified,
                    total_features: response.body.total_features,
                });
            } catch (error: any) {
                setNotification(returnNotificationObject(error.message, 'alert'));
                console.error(error);
            }
        },
        async nextClassification(currentIndex: number, map_id: string, featureValue = '') {
            try {
                // const newIndex = currentIndex + 1;
                const requestBody: Partial<INextRequest> = {
                    map_id,
                    user_id: user.user_id,
                    current_feature: currentIndex,
                };
                const newObject: Partial<IState> = {};
                if (!featureValue) {
                    requestBody.save = false;
                    newObject.skippedKeys = [...this.skippedKeys, this.keysToBeClassified[currentIndex]];
                } else {
                    requestBody.save = true;
                    requestBody.content = { value: featureValue };
                    // newObject.classifiedKeys = [...this.classifiedKeys, this.keysToBeClassified[currentIndex]];
                }
                const response = await post<INextResponse, Partial<INextRequest>>(
                    'classification/feature/next',
                    requestBody,
                );
                newObject.currentClassificationIndex = response.body.current_feature;
                newObject.currentKey = response.body.feature.properties.class;
                newObject.classifiedIndex = response.body.classified;
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
                    classifiedIndex: response.body.classified,
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
    },
});
