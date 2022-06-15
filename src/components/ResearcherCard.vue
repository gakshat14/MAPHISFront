<script setup lang="ts">
export interface IProps {
    name: string;
    designation: string;
    isInline: boolean;
}
const props = defineProps<IProps>();
</script>
<template>
    <p class="name" :class="props.isInline ? 'inline' : ''">{{ props.name }}</p>
    <p class="designation" :class="props.isInline ? 'inline' : ''">{{ props.designation }}</p>
</template>
<style>
.inline {
    display: inline;
}
</style>
