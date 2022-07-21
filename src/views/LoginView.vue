<script setup lang="ts">
import router from '@/router';
import { useUserStore } from '@/stores/user';
import { validateEmail, validatePassword } from '@/utils/validationUtils';
import { reactive } from 'vue';
import { RouterLink } from 'vue-router';
import AuthCard from '../components/AuthCard.vue';

interface IState {
    email: string;
    password: string;
    isEmailValid: boolean;
    isPasswordValid: boolean;
    isLoggingIn: boolean;
}

const state: IState = reactive({
    email: '',
    password: '',
    isEmailValid: false,
    isPasswordValid: false,
    isLoggingIn: false,
});

enum componentIDs {
    email = 'email',
    password = 'password',
}

const user = useUserStore();

function validationService(e: Event) {
    switch ((e.target as HTMLInputElement).id) {
        case componentIDs.email:
            state.isEmailValid = validateEmail(state.email);
            break;
        case componentIDs.password:
            state.isPasswordValid = validatePassword(state.password);
            break;
        default:
            break;
    }
}

async function onLoginClicked(e: MouseEvent | Event) {
    try {
        const response = await user.authenticateUser(state.email, state.password);
        router.push({ name: 'dashboard', query: { userId: response.userId } });
    } catch (error) {
        console.error(error);
    }
}
</script>

<template>
    <AuthCard name="login" heading="Login">
        <template #default>
            <form @submit.prevent="">
                <input
                    @blur="validationService"
                    v-model="state.email"
                    type="email"
                    name="email"
                    :id="componentIDs.email"
                    placeholder="Email"
                    :class="!state.isEmailValid && 'invalid'"
                />
                <input
                    @blur="validationService"
                    v-model="state.password"
                    type="password"
                    name="password"
                    :id="componentIDs.password"
                    placeholder="password"
                    :class="!state.isPasswordValid && 'invalid'"
                />
                <RouterLink to="/forgot">Forgot Password</RouterLink>
                <button
                    :disabled="!state.isEmailValid || !state.isPasswordValid"
                    type="submit"
                    class="pure-button pure-button-primary"
                    @click="onLoginClicked"
                >
                    Login
                </button>
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

<!-- Using scoped mode so that style is applied only to this component -->
<style scoped>
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
