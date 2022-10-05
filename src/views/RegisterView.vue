<script setup lang="ts">
import { initialRegisterObject } from '@/utils/constants';
import type { INetworkData, IRegisterRequestBody, IRegisterResponse } from '@/utils/model';
import { createNetworkObject, post } from '@/utils/networkUtils';
import { validateEmail, validatePassword } from '@/utils/validationUtils';
import { reactive } from 'vue';
import AuthCard from '../components/AuthCard.vue';
import { countries } from '../utils/countryList';
import { useNotificationStore } from '@dafcoe/vue-notification';
import { returnNotificationObject } from '@/utils/commonUtils';

interface IInputState {
    input: string;
    isValid?: boolean;
}

const initialInputState: IInputState = {
    input: '',
    isValid: true,
};

interface IState {
    firstName: IInputState;
    lastName: IInputState;
    countryList: string[];
    occupation: string;
    password: IInputState;
    email: IInputState;
    countryInput: string;
    showResults: boolean;
    filteredCountries: string[];
    registrationData: INetworkData<IRegisterResponse>;
}

const componentIDs = {
    firstName: 'first-name',
    lastName: 'last-name',
    country: 'country',
    occupation: 'occupation',
    email: 'email',
    password: 'password',
};

const initialState: IState = {
    firstName: { ...initialInputState },
    lastName: { ...initialInputState },
    countryList: countries,
    occupation: '',
    password: { ...initialInputState },
    email: { ...initialInputState },
    countryInput: '',
    showResults: false,
    filteredCountries: [],
    registrationData: createNetworkObject<IRegisterResponse>(initialRegisterObject),
};

const state: IState = reactive(initialState);

const { setNotification } = useNotificationStore();

function onCountryClicked(country: string) {
    state.countryInput = country;
    state.showResults = false;
    state.filteredCountries = [];
}

function onCountryChanged(e: Event) {
    state.countryInput = (e.target as HTMLInputElement).value;
    displayResults();
}

function validationService(e: Event) {
    const newValue = (e.target as HTMLInputElement).value;
    switch ((e.target as HTMLInputElement).id) {
        case componentIDs.firstName:
            state.firstName.input = newValue;
            state.firstName.isValid = newValue.length !== 0;
            break;
        case componentIDs.lastName:
            state.lastName.input = newValue;
            state.lastName.isValid = newValue.length !== 0;
            break;
        case componentIDs.email:
            state.email.input = newValue;
            state.email.isValid = validateEmail(newValue);
            break;
        case componentIDs.password:
            state.password.input = newValue;
            state.password.isValid = validatePassword(newValue);
            break;
        default:
            break;
    }
}

async function makeRegisterCall() {
    try {
        const isStateValid =
            state.firstName.isValid && state.lastName.isValid && state.email.isValid && state.password.isValid;
        if (!isStateValid) return;
        state.registrationData = createNetworkObject<IRegisterResponse>(initialRegisterObject, true);
        const body: IRegisterRequestBody = {
            email: state.email.input,
            password: state.password.input,
            details: {
                firstName: state.firstName.input,
                lastName: state.lastName.input,
            },
        };
        state.countryInput && (body.details.country = state.countryInput);
        state.occupation && (body.details.occupation = state.occupation);
        const response = await post<IRegisterResponse, IRegisterRequestBody>('user/add', body);
        state.registrationData = createNetworkObject(response.body, false);
    } catch (error: any) {
        state.registrationData = createNetworkObject(initialRegisterObject, false, true);
        setNotification(returnNotificationObject(error.message, 'alert'));
    }
}

function displayResults() {
    if (state.countryInput.length < 4) state.filteredCountries = [];

    const newCountries = [...state.countryList];
    state.filteredCountries = newCountries.filter((country) =>
        country.toLowerCase().includes(state.countryInput.toLowerCase()),
    );
}

function showAndDisplayresults(show = true) {
    return function () {
        state.showResults = show;
    };
}
</script>

<template>
    <AuthCard heading="Register" name="register">
        <template #default>
            <form
                class="pure-form pure-form-stacked"
                @submit.prevent=""
                v-if="!state.registrationData.data?.userid ?? true"
            >
                <fieldset>
                    <div class="pure-g">
                        <div class="pure-u-1">
                            <label :for="componentIDs.firstName">First name *</label>
                            <input
                                @input="validationService"
                                class="pure-input-1"
                                type="text"
                                :id="componentIDs.firstName"
                                :name="componentIDs.firstName"
                                :class="!state.firstName.isValid && 'invalid'"
                                required
                            />
                        </div>
                        <div class="pure-u-1">
                            <label :for="componentIDs.lastName">Last name *</label>
                            <input
                                @input="validationService"
                                class="pure-input-1"
                                type="text"
                                :id="componentIDs.lastName"
                                :name="componentIDs.lastName"
                                :class="!state.lastName.isValid && 'invalid'"
                                required
                            />
                        </div>
                        <div class="pure-u-1">
                            <label :for="componentIDs.country">Country</label>
                            <input
                                :value="state.countryInput"
                                @input="onCountryChanged"
                                class="pure-input-1"
                                type="text"
                                :name="componentIDs.country"
                                :id="componentIDs.country"
                                @focus="showAndDisplayresults()()"
                                @blur="showAndDisplayresults(false)()"
                            />
                            <ul
                                class="countries-container"
                                v-if="state.showResults && state.filteredCountries.length > 0"
                            >
                                <li
                                    @click="onCountryClicked(country)"
                                    class="countries"
                                    v-for="country in state.filteredCountries"
                                    :key="country"
                                    @mousedown.prevent
                                >
                                    {{ country }}
                                </li>
                            </ul>
                        </div>
                        <div class="pure-u-1">
                            <label :for="componentIDs.occupation">Occupation</label>
                            <input
                                v-model="state.occupation"
                                class="pure-input-1"
                                type="text"
                                :id="componentIDs.occupation"
                                :name="componentIDs.occupation"
                            />
                        </div>
                        <div class="pure-u-1">
                            <label :for="componentIDs.email">Email *</label>
                            <input
                                class="pure-input-1"
                                type="email"
                                :id="componentIDs.email"
                                :name="componentIDs.email"
                                :class="!state.email.isValid && 'invalid'"
                                required
                                @input="validationService"
                            />
                        </div>
                        <div class="pure-u-1">
                            <label :for="componentIDs.password">Password *</label>
                            <input
                                class="pure-input-1"
                                type="password"
                                :id="componentIDs.password"
                                :class="!state.password.isValid && 'invalid'"
                                required
                                placeholder="Enter a password containing more than 9 alphanumeric characters"
                                @input="validationService"
                            />
                        </div>
                    </div>
                </fieldset>
                <button
                    :disabled="
                        !(
                            state.firstName.isValid &&
                            state.lastName.isValid &&
                            state.email.isValid &&
                            state.password.isValid
                        )
                    "
                    type="submit"
                    class="pure-button button-primary"
                    :class="
                        !(
                            state.firstName.isValid &&
                            state.lastName.isValid &&
                            state.email.isValid &&
                            state.password.isValid
                        ) && 'pure-button-disabled'
                    "
                    @click="makeRegisterCall"
                    v-if="!state.registrationData.isFetching"
                >
                    Register
                </button>
                <button v-else class="pure-button" disabled="true" type="button">
                    <i class="fa fa-circle-o-notch fa-spin fa-2x fa-fw"></i>
                    <span class="sr-only">Loading...</span>
                </button>
            </form>
            <section v-else>
                <h1>Registration Successful</h1>
                <router-link title="Login" to="login">Login</router-link>
            </section>
        </template>
    </AuthCard>
</template>

<style>
.countries-container {
    max-height: 15vh;
    overflow-y: auto;
    z-index: 1000;
    position: absolute;
    width: 30%;
    background: #fff;
    padding: 10px;
    margin-top: 0;
    box-shadow: 0 2px 6px rgb(0 0 0 / 20%);
}
li.countries {
    list-style: none;
    margin-top: 5px;
}
.pure-form input.invalid {
    color: #b94a48;
    border-color: #e9322d;
}
.button-primary {
    background-color: var(--primary-button-color);
    color: #fff;
}
</style>
