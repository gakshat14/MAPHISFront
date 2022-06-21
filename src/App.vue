<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import router from './router';

onMounted(() => {
    router.push({ name: 'dashboard' });
});
</script>

<template>
    <RouterView />
</template>

<style>
* {
    box-sizing: border-box;
}
body {
    margin: 0;
    font-family: 'Montserrat', sans-serif;
}
h1,
h2,
h3,
h4,
h5,
h6 {
    font-family: 'Lora', serif;
}
</style>
