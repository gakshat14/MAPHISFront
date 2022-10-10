<script setup lang="ts">
export interface IProps {
    region: string;
    isClassifying: boolean;
    focusedKey: string;
    skippedKeys: string[];
    classifiedKeys: string[];
    classifiedIndex: number[];
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
} from 'leaflet';
import { get, uri, uri_without_version } from '@/utils/networkUtils';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import '../../node_modules/leaflet-rastercoords/rastercoords.js';
import { useNotificationStore } from '@dafcoe/vue-notification';
import { returnNotificationObject } from '@/utils/commonUtils';
import type { IFeatureResponse } from '@/models/classification';

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
    leafMap.setView(rc.unproject(img), 2);

    const options: TileLayerOptions = {
        minZoom: region == 'york' ? 0 : 4,
        maxZoom: region == 'york' ? 4 : 7,
        noWrap: true,
        bounds: rc.getMaxBounds(),
        maxNativeZoom: rc.zoomLevel(),
    };

    tileLayer(`${uri_without_version}static/tiles/${region}/{z}/{x}/{y}.jpg`, options).addTo(leafMap);
}

async function initGeoJson(region: string, featureToFetch: string) {
    try {
        const tileData = await get<IFeatureResponse>(`${uri}features/${region}/${featureToFetch}`);
        if (tileData.status >= 400) {
            setNotification(returnNotificationObject('Failed to load GeoJSON', 'alert'));
            return;
        }
        // adding any because we don't have our data in the same
        // structure as GeoJsonObject
        textLayer = geoJSON(tileData.body.features as any, {
            coordsToLatLng: function (coords) {
                return rc.unproject(coords as PointExpression);
            },
        });
        leafMap.addLayer(textLayer);
    } catch (error) {
        setNotification(returnNotificationObject('Unable to initialise GeoJSON', 'alert'));
    }
}

onMounted(() => {
    initLeafLet(props.region);
    initGeoJson(props.region, props.feature);
});

// this method can be optimised.
// right now we are using keys but we can leverage the index returned
// by the backend. Allowing us to directly access the specified layer
function changeMyColorPlease(currentlyFocussedKey: string) {
    let count = -1;
    textLayer.eachLayer((layer) => {
        ++count;
        const layerPoly = layer as Polyline;
        const currentClass = layerPoly?.feature?.properties.class;
        if (currentClass === currentlyFocussedKey) {
            layerPoly.setStyle({ ...returnColorObject('classifying') });
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
        if (!newValue) {
            textLayer.setStyle(returnColorObject('default'));
            return;
        }
        if (props.classifiedIndex.length === 0) {
            let colorStyle = returnColorObject('classifying');
            textLayer.setStyle(colorStyle);
            return;
        }

        let colorStyle = returnColorObject('classifying');
        textLayer.setStyle(colorStyle);
        changeMyColorPlease(props.focusedKey);
    },
);

watch(
    () => props.focusedKey,
    (newValue) => {
        if (!newValue) return;
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
            initGeoJson(newRegion, props.feature);
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
</template>

<style scoped>
#leaflet-container {
    height: 100%;
    width: 100%;
    z-index: 0;
}
</style>
