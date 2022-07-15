import { defineStore } from 'pinia';
import { classKeys } from '../geojson/sample_data';

interface IState {
    isClassifying: boolean;
    keysToBeClassified: string[];
    classifiedKeys: string[];
    currentKey: string;
    currentClassificationIndex: number;
}

const initialState: IState = {
    isClassifying: false,
    keysToBeClassified: classKeys,
    classifiedKeys: [],
    currentKey: '',
    currentClassificationIndex: -1,
};

export const useMapStore = defineStore({
    id: 'map',
    state: (): IState => ({ ...initialState }),
    actions: {
        startClassification() {
            const index = ++this.currentClassificationIndex;
            this.$patch({
                isClassifying: !this.isClassifying,
                currentClassificationIndex: index,
                currentKey: this.keysToBeClassified[index],
            });
        },
        nextClassification(currentIndex: number) {
            const newIndex = ++currentIndex;
            this.$patch({
                currentClassificationIndex: newIndex,
                currentKey: this.keysToBeClassified[newIndex],
            });
        },
    },
});
