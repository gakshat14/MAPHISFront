<script lang="ts">
// use normal <script> to declare options
export default {
    inheritAttrs: false,
};
</script>

<script setup lang="ts">
export interface IProps {
    label: string;
    options: { value: string; text: string }[];
    id: string;
    value: string;
    isDisabled?: boolean;
    name?: string;
}

const props = defineProps<IProps>();
</script>

<template>
    <label :for="props.id">{{ props.label }}</label>
    <select
        class="pure-input-1"
        :disabled="props.isDisabled"
        :value="props.value"
        @change="$emit('onSelectChange', $event)"
        :name="props.name"
        :id="props.id"
    >
        <option
            v-for="option in props.options"
            :key="`${props.id}_${option.value}_${props.name}`"
            :value="option.value"
        >
            {{ option.text }}
        </option>
    </select>
</template>
