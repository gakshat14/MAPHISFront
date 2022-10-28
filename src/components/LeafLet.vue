<script setup lang="ts">
export interface IProps {
    region: string;
    isClassifying: boolean;
    skippedIndices: number[];
    classifiedIndices: number[];
    currentClassificationIndex: number;
    imgSize: number[];
    feature: string;
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
    type PathOptions,
} from 'leaflet';
import { get, uri, uri_without_version } from '@/utils/networkUtils';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import '../../node_modules/leaflet-rastercoords/rastercoords.js';
import { useNotificationStore } from '@dafcoe/vue-notification';
import { returnNotificationObject } from '@/utils/commonUtils';
import type { IFeatureResponse } from '@/models/classification';
import { fillColor, geoJsonOptions } from '@/utils/constants';

const props = defineProps<IProps>();

let leafMap: Map;
let textLayer: GeoJSON<any>;
let rc: any;

const { setNotification } = useNotificationStore();

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

function initLeafLet(region: string) {
    const img = props.imgSize;
    leafMap = map('leaflet-container', { crs: CRS.Simple });
    rc = new RasterCoords(leafMap, img);
    leafMap.setView(rc.unproject(img), 4);

    const options: TileLayerOptions = {
        minZoom: 4,
        maxZoom: 7,
        noWrap: true,
        bounds: rc.getMaxBounds(),
        maxNativeZoom: rc.zoomLevel(),
    };

    tileLayer(`${uri_without_version}static/tiles/${region}/{z}/{x}/{y}.jpg`, options).addTo(leafMap);
}

async function initGeoJson(region: string, featureToFetch: string) {
    try {
        const tileData = await get<IFeatureResponse>(`${uri}features/${region}/${featureToFetch}`);
        let tileStyle: PathOptions = { weight: 1, stroke: false };
        switch (featureToFetch) {
            case 'vegetation':
                tileStyle = {
                    ...tileStyle,
                    color: fillColor.vegetation,
                    fillColor: fillColor.vegetation,
                    fillOpacity: 0.6,
                };
                break;
            case 'imprint':
                tileStyle = { ...tileStyle, color: fillColor.imprint, fillColor: fillColor.imprint };
                break;
            case 'text':
                tileStyle = { ...tileStyle, color: fillColor.text, fillColor: fillColor.text, fillOpacity: 0.5 };
                break;
            default:
                tileStyle = { ...tileStyle, color: '#3388FF', fillColor: '#3388FF' };
        }
        // adding any because we don't have our data in the same
        // structure as GeoJsonObject
        textLayer = geoJSON(tileData.body.features as any, {
            coordsToLatLng: function (coords) {
                return rc.unproject(coords as PointExpression);
            },
            style: tileStyle,
        });
        leafMap.addLayer(textLayer);
    } catch (error) {
        setNotification(returnNotificationObject('Unable to initialise GeoJSON', 'alert'));
    }
}

async function initAllGeoJson(region: string) {
    for (let option of geoJsonOptions) {
        initGeoJson(region, option.value);
    }
}

function handleGeojson(region: string, feature: string) {
    if (props.feature === 'all') {
        initAllGeoJson(region);
    } else {
        initGeoJson(region, feature);
    }
}

onMounted(() => {
    initLeafLet(props.region);
    handleGeojson(props.region, props.feature);
});

function initialiseTextLayerColors(currentlyFocussedIndex: number) {
    let count = -1;
    textLayer.eachLayer((layer) => {
        ++count;
        const layerPoly = layer as Polyline;
        const currentClass = layerPoly?.feature?.properties.class;
        if (count === currentlyFocussedIndex) {
            layerPoly.setStyle({ ...returnColorObject('classifying') });
            layerPoly.bindPopup(currentClass).openPopup();
        }
        if (props.skippedIndices.includes(count) || count < props.currentClassificationIndex) {
            layerPoly.setStyle({ ...returnColorObject('skipped') });
        }
        // if (props.classifiedKeys.includes(currentClass)) {
        //     layerPoly.setStyle({ ...returnColorObject('classified') });
        // }
        if (props.classifiedIndices.includes(count)) {
            layerPoly.setStyle({ ...returnColorObject('classified') });
        }
    });
}

function changeMyColorPlease(currentlyFocussedIndex: number) {
    let previousIndex = currentlyFocussedIndex - 1;

    const currentLayer = textLayer.getLayers()[currentlyFocussedIndex] as Polyline;
    const previousLayer = textLayer.getLayers()[previousIndex] as Polyline;

    const currentClass = currentLayer?.feature?.properties.class;

    currentLayer.setStyle({ ...returnColorObject('classifying') });
    currentLayer.bindPopup(currentClass).openPopup();

    if (previousIndex >= 0 && props.skippedIndices.includes(previousIndex)) {
        previousLayer.setStyle({ ...returnColorObject('skipped') });
    } else if (props.classifiedIndices.includes(previousIndex)) {
        previousLayer.setStyle({ ...returnColorObject('classified') });
    }
}

watch(
    () => props.isClassifying,
    (newValue) => {
        if (!newValue) {
            textLayer.setStyle(returnColorObject('default'));
            return;
        }
        if (props.classifiedIndices.length === 0) {
            let colorStyle = returnColorObject('classifying');
            textLayer.setStyle(colorStyle);
            return;
        }

        let colorStyle = returnColorObject('classifying');
        textLayer.setStyle(colorStyle);
        initialiseTextLayerColors(props.currentClassificationIndex);
    },
);

watch(
    () => props.currentClassificationIndex,
    (newValue) => {
        if (!newValue && !props.isClassifying) return;
        changeMyColorPlease(newValue);
    },
);

watch(
    () => props.region,
    (newRegion, oldRegion) => {
        if (newRegion != oldRegion) {
            leafMap.invalidateSize();
            leafMap.off();
            leafMap.remove();
            initLeafLet(newRegion);
            handleGeojson(newRegion, props.feature);
        }
    },
);

watch(
    () => props.feature,
    (newFeature) => {
        leafMap.removeLayer(textLayer);
        initGeoJson(props.region, newFeature);
    },
);
</script>

<template>
    <div id="leaflet-container"></div>
    <div>{{ props.classifiedIndices }}</div>
</template>

<style scoped>
#leaflet-container {
    height: 100%;
    width: 100%;
    z-index: 0;
}
</style>
