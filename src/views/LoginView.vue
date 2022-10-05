<script setup lang="ts">
import router from '@/router';
import { useUserStore } from '@/stores/user';
import { validateEmail, validatePassword } from '@/utils/validationUtils';
import { reactive } from 'vue';
import { RouterLink } from 'vue-router';
import AuthCard from '../components/AuthCard.vue';
import LoadingButton from '../components/LoadingButton.vue';
import { useNotificationStore } from '@dafcoe/vue-notification';
import { returnNotificationObject } from '@/utils/commonUtils';

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

const { setNotification } = useNotificationStore();

function onChange(e: Event) {
    let newValue = (e.target as HTMLInputElement).value;
    switch ((e.target as HTMLInputElement).id) {
        case componentIDs.email:
            state.isEmailValid = validateEmail(newValue);
            state.email = newValue;
            break;
        case componentIDs.password:
            state.isPasswordValid = validatePassword(newValue);
            state.password = newValue;
            break;
    }
}

async function onLoginClicked(e: Event) {
    try {
        e.preventDefault();
        state.isLoggingIn = true;
        const response = await user.authenticateUser(state.email, state.password);
        router.push({ name: 'dashboard', query: { userId: response.userId } });
    } catch (error: any) {
        setNotification(returnNotificationObject(error.message, 'alert'));
    } finally {
        state.isLoggingIn = false;
    }
}
</script>

<template>
    <AuthCard name="login" heading="Login">
        <template #default>
            <form @submit="onLoginClicked">
                <input
                    @input="onChange"
                    v-model="state.email"
                    type="email"
                    name="email"
                    :id="componentIDs.email"
                    placeholder="Email"
                    :class="!state.isEmailValid && 'invalid'"
                />
                <input
                    @input="onChange"
                    type="password"
                    name="password"
                    :id="componentIDs.password"
                    placeholder="password"
                    :class="!state.isPasswordValid && 'invalid'"
                />
                <RouterLink to="/forgot">Forgot Password</RouterLink>
                <LoadingButton
                    class="pure-button button-primary"
                    text="Login"
                    :onClick="onLoginClicked"
                    :is-loading="state.isLoggingIn"
                    :is-disabled="!state.isEmailValid || !state.isPasswordValid"
                />
            </form>
        </template>
        <template #footer>
            <hr />
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
    background: var(--secondary-button-color);
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
    padding: var(--padding);
}
footer hr {
    max-width: 90%;
}
.button-primary {
    background-color: var(--primary-button-color);
    color: #fff;
}
</style>
