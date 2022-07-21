<script setup lang="ts">
export interface IProps {
    isLoading: boolean;
    text: string;
    onClick: (e?: MouseEvent) => void;
}
const props = defineProps<IProps>();

function onButtonClick(e: MouseEvent) {
    props.onClick(e);
}
</script>

<template>
    <button v-if="!props.isLoading" @click="onButtonClick" type="button">{{ props.text }}</button>
    <button v-else type="button">
        <i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i> <span class="sr-only">Loading...</span>
    </button>
</template>
