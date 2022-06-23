<script setup lang="ts">
import { onMounted } from 'vue';
import { map, tileLayer, type TileLayerOptions } from 'leaflet';
import { uri } from '@/utils/networkUtils';

const region = 'york';

onMounted(() => {
    const leafMap = map('leaflet-container').setView([0, 0], 0);

    const options: TileLayerOptions = {
        maxZoom: 4,
        noWrap: true,
    };

    tileLayer(`${uri}map-tiles/${region}/{z}/{x}/{y}.jpg`, options).addTo(leafMap);
});
</script>

<template>
    <div id="leaflet-container"></div>
</template>

<style scoped>
#leaflet-container {
    height: 100%;
    width: 100%;
}
</style>
