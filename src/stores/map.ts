import { get } from '@/utils/networkUtils';
import { defineStore } from 'pinia';
import { classKeys } from '../geojson/sample_data';

interface IState {
    isClassifying: boolean;
    keysToBeClassified: string[];
    classifiedKeys: string[];
    currentKey: string;
    currentClassificationIndex: number;
    skippedKeys: string[];
}

const initialState: IState = {
    isClassifying: false,
    keysToBeClassified: classKeys,
    classifiedKeys: [],
    currentKey: '',
    currentClassificationIndex: NaN,
    skippedKeys: [],
};

export const useMapStore = defineStore({
    id: 'map',
    state: (): IState => ({ ...initialState }),
    actions: {
        startClassification() {
            const index = 0;
            this.$patch({
                isClassifying: !this.isClassifying,
                currentClassificationIndex: index,
                currentKey: this.keysToBeClassified[index],
            });
        },
        nextClassification(currentIndex: number, isSkipped = false) {
            const newIndex = currentIndex + 1;
            const newObject: Partial<IState> = {
                currentClassificationIndex: newIndex,
                currentKey: this.keysToBeClassified[newIndex],
            };
            isSkipped && (newObject.skippedKeys = [...this.skippedKeys, this.keysToBeClassified[currentIndex]]);
            !isSkipped && (newObject.classifiedKeys = [...this.classifiedKeys, this.keysToBeClassified[currentIndex]]);
            this.$patch(newObject);
        },
        // async initialise() {
        //     try {
        //         const alreadyClassifiedKeys = await get<>('classification/feature/classified')
        //     } catch (error) {

        //     }
        // }
    },
});
