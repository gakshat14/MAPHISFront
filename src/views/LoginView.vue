<script setup lang="ts">
import type { IAuthRequest, IToken } from '@/utils/model';
import { post } from '@/utils/networkUtils';
import { decodeJWTToken, storeInSessionStorage } from '@/utils/securityUtils';
import { validateEmail, validatePassword } from '@/utils/validationUtils';
import { reactive } from 'vue';
import { RouterLink } from 'vue-router';
import AuthCard from '../components/AuthCard.vue';

interface IState {
    email: string;
    password: string;
    isEmailValid: boolean;
    isPasswordValid: boolean;
}

const state: IState = reactive({ email: '', password: '', isEmailValid: true, isPasswordValid: true });

async function onLoginClicked(e: MouseEvent | Event) {
    try {
        // validate email and password
        const isEmailValid = validateEmail(state.email);
        const isPasswordValid = validatePassword(state.password);

        if (!isEmailValid) {
            state.isEmailValid = false;
            return;
        }

        if (!isPasswordValid) {
            state.isPasswordValid = false;
            return;
        }

        const response = await post<IToken, IAuthRequest>('http://localhost:5998/auth', {
            email: state.email,
            passwrod: state.password,
        });
        const decodedToken = decodeJWTToken(response.access_token);
        console.log(decodedToken);
        storeInSessionStorage<IToken>('access_token', response);
    } catch (error) {
        console.error(error);
    }
}
</script>

<template>
    <AuthCard name="login" heading="Login">
        <template #default>
            <form @submit.prevent="">
                <input v-model="state.email" type="email" name="email" id="email" placeholder="Email" />
                <input v-model="state.password" type="password" name="password" id="password" placeholder="password" />
                <RouterLink to="/forgot">Forgot Password</RouterLink>
                <button type="submit" class="pure-button pure-button-primary" @click="onLoginClicked">Login</button>
            </form>
        </template>
        <template #footer>
            <footer>
                <RouterLink class="pure-button button-secondary create-button" to="/register"
                    >Create an account</RouterLink
                >
            </footer>
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

.footer {
    text-align: center;
}

.button-secondary {
    background: rgb(66, 184, 221);
    /* this is a light blue */
    color: #fff;
}

.create-button {
    display: inline-block;
    width: -webkit-fill-available;
}

.error {
    border-color: #e9322d;
}

footer {
    background: #d5d5d5;
    width: var(--width);
    padding: var(--padding);
}
</style>
