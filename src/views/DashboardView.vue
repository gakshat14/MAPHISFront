<script setup lang="ts">
import LogoutButton from '../components/LogoutButton.vue';
import LeafLet from '../components/LeafLet.vue';
import { useMapStore } from '@/stores/map';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user';
import { reactive } from 'vue';
import DropDown from '../components/Drop-down.vue';
import type { INetworkData, IOption } from '@/utils/model';
import { createNetworkObject, get, uri } from '@/utils/networkUtils';
import { useNotificationStore } from '@dafcoe/vue-notification';
import { returnNotificationObject } from '@/utils/commonUtils';
import { regionSize } from '@/utils/constants';
import map from 'lodash/map';

export interface IProps {
    isDemo?: boolean;
}

export interface IState {
    geojsonSelectValue: string;
    classificationInput: string;
    regionSelectValue: string;
    regionsData: INetworkData<string[]>;
    featuresData: INetworkData<string[]>;
    regionOptions: IOption[];
    featureOptions: IOption[];
}

const { getFullName } = useUserStore();

const state: IState = reactive({
    geojsonSelectValue: 'text',
    classificationInput: '',
    regionSelectValue: 'Luton',
    regionsData: createNetworkObject([], true),
    featuresData: createNetworkObject([], true),
    regionOptions: [],
    featureOptions: [],
});

const {
    isClassifying,
    total_features,
    currentClassificationIndex,
    skippedIndices,
    classifiedIndices,
    featureInputValue,
} = storeToRefs(useMapStore());

const props = defineProps<IProps>();

const { startClassification, nextClassification, endClassification, previousClassification } = useMapStore();
const { setNotification } = useNotificationStore();

state.regionsData = createNetworkObject([], true);
state.featuresData = createNetworkObject([], true);

Promise.all([get<string[]>(`${uri}metadata/maps`), get<string[]>(`${uri}metadata/feature/classes`)])
    .then(([regionsResponse, featureClassResponse]) => {
        state.regionsData = createNetworkObject(regionsResponse.body, false);
        state.featuresData = createNetworkObject(featureClassResponse.body, false);
        state.regionOptions = map(regionsResponse.body, (value) => ({ text: value, value }));
        state.featureOptions = map(featureClassResponse.body, (value) => ({ text: value, value }));
    })
    .catch((error) => {
        setNotification(returnNotificationObject(error.message, 'alert'));
        state.regionsData = createNetworkObject([], false, true);
        state.featuresData = createNetworkObject([], false, true);
    });

function onClassificationClicked() {
    startClassification(state.regionSelectValue);
}

function onNextClicked() {
    if (!state.classificationInput) {
        nextClassification(currentClassificationIndex.value, state.regionSelectValue);
    } else {
        nextClassification(currentClassificationIndex.value, state.regionSelectValue);
    }
    state.classificationInput = '';
}

function onPreviousClicked() {
    previousClassification(currentClassificationIndex.value, state.regionSelectValue);
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
                <ul v-if="!props.isDemo">
                    <li>Hi {{ getFullName }}</li>
                    <li><LogoutButton /></li>
                </ul>
            </header>
            <main>
                <form v-if="!isClassifying" class="pure-form pure-form-stacked" @submit="onFormSubmit">
                    <DropDown
                        :is-disabled="state.regionsData.isFetching && state.featureOptions.length < 1"
                        :value="state.regionSelectValue"
                        name="Region"
                        :options="state.regionOptions"
                        label="Select a region"
                        id="region_selector"
                        @on-select-change="updateRegionValue"
                    />
                    <DropDown
                        v-if="!props.isDemo"
                        :value="state.geojsonSelectValue"
                        :is-disabled="state.featuresData.isFetching && state.featureOptions.length < 1"
                        name="Features"
                        :options="state.featureOptions"
                        label="Select features to highlight"
                        id="feature_selector"
                        @on-select-change="updateFeatureValue"
                    />
                    <button
                        v-if="!props.isDemo"
                        type="submit"
                        class="pure-button button-primary"
                        @submit="onClassificationClicked"
                    >
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
                        <input class="pure-input-1" v-model="featureInputValue" type="text" id="text_input" />
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
                :skipped-indices="skippedIndices"
                :classified-indices="classifiedIndices"
                :region="state.regionSelectValue"
                :is-classifying="isClassifying"
                :current-classification-index="currentClassificationIndex"
                :feature="props.isDemo ? 'all' : state.geojsonSelectValue"
                :img-size="regionSize[state.regionSelectValue]"
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
