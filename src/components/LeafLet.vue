<script setup lang="ts">
import { onMounted } from 'vue';
import { map, tileLayer, type TileLayerOptions } from 'leaflet';

onMounted(() => {
    const leafMap = map('leaflet-container').setView([0, 0], 0);

    const options: TileLayerOptions = {
        maxZoom: 4,
        noWrap: true,
        // bounds: [
        //     [-90, -180],
        //     [90, 180],
        // ],
    };

    tileLayer('src/images/york/{z}/{x}/{y}.jpg', options).addTo(leafMap);
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
