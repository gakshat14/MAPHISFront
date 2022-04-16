<script setup lang="ts">
import { useUserStore } from '@/stores/user';

const user = useUserStore();
</script>

<template>
    <h1>Welcome {{ user.getFullName }}</h1>
</template>
