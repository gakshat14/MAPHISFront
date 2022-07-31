<script setup lang="ts">
import LogoutButton from '../components/LogoutButton.vue';
import LeafLet from '../components/LeafLet.vue';
import { useMapStore } from '@/stores/map';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user';
import { geoJsonOptions } from '../utils/constants';
import { reactive } from 'vue';

export interface IState {
    geojsonSelectValue: string;
    classificationInput: string;
}

const { user } = useUserStore();

const state: IState = reactive({ geojsonSelectValue: 'text', classificationInput: '' });

const {
    isClassifying,
    total_features,
    currentClassificationIndex,
    skippedKeys,
    classifiedKeys,
    classifiedIndex,
    currentKey,
} = storeToRefs(useMapStore());
const { startClassification, nextClassification, endClassification } = useMapStore();

function onClassificationClicked() {
    startClassification('york');
}

function onNextClicked() {
    if (!state.classificationInput) {
        nextClassification(currentClassificationIndex.value, 'york');
    } else {
        nextClassification(currentClassificationIndex.value, 'york', state.classificationInput);
    }
    state.classificationInput = '';
}

function onSkipClicked() {
    nextClassification(currentClassificationIndex.value, 'york');
}

function onPreviousClicked() {
    console.log('Previous clicked');
}

function onEndClassificationClicked() {
    endClassification();
}
</script>

<template>
    <section class="dashboard-container">
        <div class="dashboard-menu">
            <header><h1>Maphis</h1></header>
            <main>
                <div v-if="!isClassifying">
                    <label for="feature_selector">Select features to highlight</label>
                    <select v-model="state.geojsonSelectValue" name="Feature selection" id="feature_selector">
                        <option :value="option.value" v-for="option in geoJsonOptions" :key="`geojson_${option.value}`">
                            {{ option.text }}
                        </option>
                    </select>
                    <button @click="onClassificationClicked">Start classification</button>
                </div>
                <div v-else>
                    <div id="classification_input">
                        <label for="text_input">Please enter the text you can see in the map</label>
                        <input v-model="state.classificationInput" type="text" id="text_input" />
                    </div>
                    {{ `${currentClassificationIndex} / ${total_features}` }}
                    <div id="button_container">
                        <button @click="onPreviousClicked">Previous</button>
                        <button @click="onSkipClicked">Skip</button>
                        <button @click="onNextClicked">Next</button>
                    </div>
                    <button @click="onEndClassificationClicked">End classification</button>
                </div>
            </main>
            <footer>
                <LogoutButton />
            </footer>
        </div>
        <div class="dashboard-application">
            <LeafLet
                :skipped-keys="skippedKeys"
                region="york"
                :is-classifying="isClassifying"
                :focused-key="currentKey"
                :classified-keys="classifiedKeys"
                :classified-index="classifiedIndex"
                :current-classification-index="currentClassificationIndex"
            />
        </div>
    </section>
</template>

<style>
section.dashboard-container {
    display: inline-flex;
    height: 100vh;
    width: 100vw;
}
div.dashboard-menu {
    flex-grow: 1;
    border-right: solid 1px #d5d5d5;
    display: flex;
    flex-direction: column;
}
div.dashboard-menu header {
    flex-grow: 0.1;
}
div.dashboard-menu main {
    flex-grow: 4;
}
div.dashboard-menu footer {
    flex-grow: 0.1;
    border-top: 1px solid #d5d5d5;
}
div.dashboard-application {
    flex-grow: 12;
}
header,
main,
footer {
    padding: 1px 5px;
}
</style>
