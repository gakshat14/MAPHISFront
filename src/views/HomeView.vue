<script setup lang="ts">
import router from '@/router';
import { onMounted } from 'vue';
import HelloWorld from '../components/HelloWorld.vue';

onMounted(() => {
    router.push({ name: 'login' });
});
</script>

<template>
    <main>
        <HelloWorld msg="You did it!!" />
    </main>
</template>
