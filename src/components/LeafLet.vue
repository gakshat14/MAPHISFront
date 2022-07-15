<script setup lang="ts">
export interface IProps {
    region: string;
    isClassifying: boolean;
    focusedKey: string;
}

import { onMounted, watch } from 'vue';
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
    Map,
    GeoJSON,
    Polyline,
} from 'leaflet';
import { uri_without_version } from '@/utils/networkUtils';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import { tile_data_text } from '../geojson/text';
import '../../node_modules/leaflet-rastercoords/rastercoords.js';

const props = defineProps<IProps>();

let leafMap: Map;
let textLayer: GeoJSON<any>;

function returnColorObject(colorFor: 'default' | 'classifying' | 'classified' = 'default') {
    if (colorFor === 'classifying') {
        return { fillColor: 'darkgray', color: '#d5d5d5' };
    }
    if (colorFor === 'classified') {
        return { fillColor: 'green', color: 'green' };
    }
    return { fillColor: '#3388FF', color: '#3388FF' };
}

onMounted(() => {
    const img = [4096, 4096];
    leafMap = map('leaflet-container', { crs: CRS.Simple });
    const rc = new RasterCoords(leafMap, img);
    leafMap.setView(rc.unproject([4096, 4096]), 2);

    const options: TileLayerOptions = {
        minZoom: 0,
        maxZoom: 4,
        noWrap: true,
        bounds: rc.getMaxBounds(),
        maxNativeZoom: rc.zoomLevel(),
    };

    tileLayer(`${uri_without_version}map-tiles/${props.region}/{z}/{x}/{y}.jpg`, options).addTo(leafMap);

    textLayer = geoJSON(tile_data_text.features, {
        coordsToLatLng: function (coords) {
            return rc.unproject(coords as PointExpression);
        },
    });

    leafMap.addLayer(textLayer);
});

watch(
    () => props.isClassifying,
    (newValue) => {
        let colorStyle = returnColorObject();
        if (newValue) {
            colorStyle = { ...returnColorObject('classifying') };
        }
        textLayer.setStyle(colorStyle);
    },
);

watch(
    () => props.focusedKey,
    (newValue) => {
        if (!newValue) return;

        textLayer.eachLayer((layer) => {
            const layer_poly = layer as Polyline;
            if (layer_poly?.feature?.properties.class === newValue) {
                layer_poly.setStyle({ ...returnColorObject() });
                layer_poly.bindPopup(newValue).openPopup();
            }
        });
    },
);
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
