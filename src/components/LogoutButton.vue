<script setup lang="ts">
import router from '../router';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();

function onLogoutClicked() {
    userStore.logoutUser();
    router.replace({ name: 'home' });
}
</script>
<template>
    <button type="button" title="Logout" @click="onLogoutClicked"><i class="fa fa-sign-out"></i></button>
</template>
<style scoped>
button {
    height: 100%;
    font-size: 1.9rem;
    border: none;
    background: transparent;
    padding: 0;
}
</style>
