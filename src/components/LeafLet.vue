<script setup lang="ts">
export interface IProps {
    region: string;
    isClassifying: boolean;
    focusedKey: string;
    skippedKeys: string[];
    classifiedKeys: string[];
    classifiedIndex: number[];
    currentClassificationIndex: number;
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

function returnColorObject(colorFor: 'default' | 'classifying' | 'classified' | 'skipped' = 'default') {
    if (colorFor === 'classifying') {
        return { fillColor: 'darkgray', color: '#d5d5d5' };
    }
    if (colorFor === 'classified') {
        return { fillColor: 'green', color: 'green' };
    }

    if (colorFor === 'skipped') {
        return { fillColor: 'red', color: 'red' };
    }

    return { fillColor: '#3388FF', color: '#3388FF' };
}

// map.setView(rc.unproject([img[0], img[1]]),4)

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

function changeMyColorPlease(currentlyFocussedKey: string) {
    let count = -1;
    textLayer.eachLayer((layer) => {
        ++count;
        const layerPoly = layer as Polyline;
        const currentClass = layerPoly?.feature?.properties.class;
        if (currentClass === currentlyFocussedKey) {
            layerPoly.setStyle({ ...returnColorObject() });
            layerPoly.bindPopup(currentlyFocussedKey).openPopup();
        }
        if (props.skippedKeys.includes(currentClass) || count < props.currentClassificationIndex) {
            layerPoly.setStyle({ ...returnColorObject('skipped') });
        }
        // if (props.classifiedKeys.includes(currentClass)) {
        //     layerPoly.setStyle({ ...returnColorObject('classified') });
        // }
        if (props.classifiedIndex.includes(count)) {
            layerPoly.setStyle({ ...returnColorObject('classified') });
        }
    });
}

watch(
    () => props.isClassifying,
    (newValue) => {
        if (props.classifiedIndex.length === 0) {
            let colorStyle = returnColorObject('classifying');
            textLayer.setStyle(colorStyle);
            return;
        }
        if (newValue) {
            let colorStyle = returnColorObject('classifying');
            textLayer.setStyle(colorStyle);
            changeMyColorPlease(props.focusedKey);
        }
    },
);

watch(
    () => props.focusedKey,
    (newValue) => {
        if (!newValue) return;
        changeMyColorPlease(newValue);
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
