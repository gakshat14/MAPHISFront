<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import router from './router';
import { useUserStore } from './stores/user';
import '@dafcoe/vue-notification/dist/vue-notification.css';
import ToastContainer from './components/ToastContainer.vue';

const user = useUserStore();

onMounted(() => {
    if (!user.isUserAuthenticated()) {
        router.push({ name: 'home' });
    } else {
        router.push({ name: 'dashboard', query: { userId: user.user.user_id } });
    }
});
</script>

<template>
    <ToastContainer />
    <RouterView />
</template>

<style>
* {
    box-sizing: border-box;
}
:root {
    --nav-colour: #1b8264;
    --primary-button-color: #ad5c5b;
    --secondary-button-color: #fc8e61;
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

.heading-text {
    font-size: 4.45rem;
    color: #9a3736;
    margin: 0;
}
</style>
