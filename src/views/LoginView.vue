<script setup lang="ts">
import { reactive } from 'vue';
import { RouterLink } from 'vue-router';
import AuthCard from '../components/AuthCard.vue';

interface IState {
    email: string;
    password: string;
}

const state: IState = reactive({ email: '', password: '' });

function onLoginClicked(e: MouseEvent | Event) {
    console.log(state.email);
}
</script>

<template>
    <AuthCard name="login">
        <template #heading>
            <h1>Login</h1>
        </template>
        <template #default>
            <form @submit.prevent="">
                <input v-model="state.email" type="email" name="email" id="email" placeholder="Email" />
                <input v-model="state.password" type="password" name="password" id="password" placeholder="password" />
                <button @click="onLoginClicked">Login</button>
            </form>
            <div>
                <RouterLink to="/forgot">Forgot Password</RouterLink>
            </div>
        </template>
        <template #footer>
            <RouterLink to="/register">Create a account</RouterLink>
        </template>
    </AuthCard>
</template>

<style>
form {
    display: flex;
    flex-direction: column;
    width: 100%;
}
form input,
form button {
    padding: 10px;
    margin: 10px 0;
}
</style>
