<script setup lang="ts">
import LogoutButton from '../components/LogoutButton.vue';
import LeafLet from '../components/LeafLet.vue';
import { useMapStore } from '@/stores/map';
import { storeToRefs } from 'pinia';

// const user = useUserStore();
const { isClassifying, currentKey, currentClassificationIndex } = storeToRefs(useMapStore());
const { startClassification, nextClassification } = useMapStore();

function onClassificationClicked() {
    startClassification();
}

function onNextClicked() {
    nextClassification(currentClassificationIndex.value);
}
</script>

<template>
    <section class="dashboard-container">
        <div class="dashboard-menu">
            <header><h1>Maphis</h1></header>
            <main>
                <button v-if="!isClassifying" @click="onClassificationClicked">Start classification</button>
                <div v-else>
                    current key: {{ currentKey }}
                    <button @click="onNextClicked">Next slide</button>
                </div>
            </main>
            <footer>
                <LogoutButton />
            </footer>
        </div>
        <div class="dashboard-application">
            <LeafLet region="york" :is-classifying="isClassifying" :focused-key="currentKey" />
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
    flex-grow: 3;
}
header,
main,
footer {
    padding: 1px 5px;
}
</style>
