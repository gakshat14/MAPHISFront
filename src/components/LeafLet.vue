<script setup lang="ts">
import { onMounted } from 'vue';
import {
    map,
    tileLayer,
    type TileLayerOptions,
    CRS,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    RasterCoords,
    geoJSON,
    type PointExpression,
} from 'leaflet';
import { uri_without_version } from '@/utils/networkUtils';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import { tile_data_text } from '../geojson/text';
import '../../node_modules/leaflet-rastercoords/rastercoords.js';

const region = 'york';

onMounted(() => {
    const img = [4096, 4096];
    const leafMap = map('leaflet-container', { crs: CRS.Simple });
    const rc = new RasterCoords(leafMap, img);
    leafMap.setView(rc.unproject([4096, 4096]), 2);

    const options: TileLayerOptions = {
        minZoom: 0,
        maxZoom: 4,
        noWrap: true,
        bounds: rc.getMaxBounds(),
        maxNativeZoom: rc.zoomLevel(),
    };

    tileLayer(`${uri_without_version}map-tiles/${region}/{z}/{x}/{y}.jpg`, options).addTo(leafMap);

    const textLayer = geoJSON(tile_data_text.features, {
        coordsToLatLng: function (coords) {
            return rc.unproject(coords as PointExpression);
        },
        onEachFeature: function (feature, layer) {
            if (feature?.properties?.class) {
                layer.bindPopup(feature.properties.class);
            }
        },
        style: function (feature) {
            return { fillColor: 'darkgray', color: '#d5d5d5', fillOpacity: 0.5 };
        },
    });

    leafMap.addLayer(textLayer);
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
