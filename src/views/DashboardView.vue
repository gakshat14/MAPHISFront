<script setup lang="ts">
import LogoutButton from '../components/LogoutButton.vue';
import LeafLet from '../components/LeafLet.vue';
import { useMapStore } from '@/stores/map';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user';
import { geoJsonOptions, region } from '../utils/constants';
import { reactive } from 'vue';
import DropDown from '../components/Drop-down.vue';

export interface IState {
    geojsonSelectValue: string;
    classificationInput: string;
    regionSelectValue: string;
}

const { getFullName } = useUserStore();

const state: IState = reactive({ geojsonSelectValue: 'text', classificationInput: '', regionSelectValue: 'york' });

const {
    isClassifying,
    total_features,
    currentClassificationIndex,
    skippedKeys,
    classifiedKeys,
    classifiedIndex,
    currentKey,
} = storeToRefs(useMapStore());
const { startClassification, nextClassification, endClassification, previousClassification } = useMapStore();

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

function onPreviousClicked() {
    previousClassification(currentClassificationIndex.value, 'york');
}

function onEndClassificationClicked() {
    endClassification();
}

function updateRegionValue(e: Event) {
    state.regionSelectValue = (e.target as HTMLInputElement).value;
}

function updateFeatureValue(e: Event) {
    state.geojsonSelectValue = (e.target as HTMLInputElement).value;
}

function onFormSubmit(e: Event) {
    e.preventDefault();
    onClassificationClicked();
}
</script>

<template>
    <section class="dashboard-container">
        <div class="dashboard-menu">
            <header>
                <h1>Maphis</h1>
                <ul>
                    <li>Hi {{ getFullName }}</li>
                    <li><LogoutButton /></li>
                </ul>
            </header>
            <main>
                <form v-if="!isClassifying" class="pure-form pure-form-stacked" @submit="onFormSubmit">
                    <DropDown
                        :value="state.regionSelectValue"
                        name="Region"
                        :options="region"
                        label="Select a region"
                        id="region_selector"
                        @on-select-change="updateRegionValue"
                    />
                    <DropDown
                        :value="state.geojsonSelectValue"
                        name="Features"
                        :options="geoJsonOptions"
                        label="Select features to highlight"
                        id="feature_selector"
                        @on-select-change="updateFeatureValue"
                    />
                    <button type="submit" class="pure-button button-primary" @submit="onClassificationClicked">
                        Start classification
                    </button>
                </form>
                <div v-else>
                    <div
                        class="pure-form pure-form-stacked"
                        v-if="state.geojsonSelectValue === 'text'"
                        id="classification_input"
                    >
                        <label for="text_input">Please enter the text you can see in the map</label>
                        <input class="pure-input-1" v-model="state.classificationInput" type="text" id="text_input" />
                    </div>
                    <div v-if="state.geojsonSelectValue === 'vegetation'">
                        <p>trees will come here</p>
                    </div>
                    <div v-if="state.geojsonSelectValue === 'imprint'">
                        <p>buildings will come here</p>
                    </div>

                    <div id="button-container">
                        <button
                            class="pure-button"
                            :disabled="currentClassificationIndex == 0"
                            @click="onPreviousClicked"
                        >
                            <i class="fa fa-angle-double-left fa-2x" aria-hidden="true"></i>
                        </button>
                        <p>{{ `${currentClassificationIndex + 1} / ${total_features}` }}</p>
                        <button class="pure-button" @click="onNextClicked">
                            <i class="fa fa-angle-double-right fa-2x" aria-hidden="true"></i>
                        </button>
                    </div>
                    <button
                        id="end-classification-button"
                        class="pure-button button-secondary"
                        type="submit"
                        @click="onEndClassificationClicked"
                    >
                        End classification
                    </button>
                </div>
            </main>
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

<style scoped>
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

header {
    display: flex;
    justify-content: space-between;
    background-color: var(--nav-colour);
    color: #c4cbb6;
}

ul li {
    display: inline-block;
    list-style: none;
}

ul li:nth-child(2) {
    margin-left: 10px;
}

main {
    margin-top: 20px;
    padding: 0 20px;
}

form.pure-form-stacked :deep(label:nth-child(3)) {
    margin-top: 20px;
}

.pure-button.button-primary {
    margin-top: 20px;
    background-color: var(--primary-button-color);
    color: #fff;
}

div#button-container {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}

button#end-classification-button {
    margin-top: 20px;
}
</style>
