<script setup lang="ts">
export interface IProps {
    isLoading: boolean;
    text: string;
    onClick: (e: Event) => void;
    class: string;
    isDisabled?: boolean;
}
const props = defineProps<IProps>();

function onButtonClick(e: Event) {
    props.onClick(e);
}
</script>

<template>
    <button
        :disabled="props.isDisabled"
        :class="props.class"
        v-if="!props.isLoading"
        @click="onButtonClick"
        type="submit"
    >
        {{ props.text }}
    </button>
    <button disabled v-else type="button">
        <i class="fa fa-circle-o-notch fa-spin fa-lg fa-fw"></i> <span class="sr-only">Loading...</span>
    </button>
</template>
