<script setup lang="ts">
import { initialRegisterObject } from '@/utils/constants';
import type { INetworkData, IRegisterRequestBody, IRegisterResponse } from '@/utils/model';
import { createNetworkObject, post } from '@/utils/networkUtils';
import { validateEmail, validatePassword } from '@/utils/validationUtils';
import { computed, reactive } from 'vue';
import AuthCard from '../components/AuthCard.vue';
import { countries } from '../utils/countryList';

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

function onCountryClicked(country: string) {
    state.countryInput = country;
    console.log(country);
    state.showResults = false;
    state.filteredCountries = [];
}

function onCountryChanged(e: Event) {
    state.countryInput = (e.target as HTMLInputElement).value;
    displayResults();
}

function validationService(e: Event) {
    switch ((e.target as HTMLInputElement).id) {
        case componentIDs.firstName:
            state.firstName.isValid = state.firstName.input.length !== 0;
            break;
        case componentIDs.lastName:
            state.lastName.isValid = state.lastName.input.length !== 0;
            break;
        case componentIDs.email:
            state.email.isValid = validateEmail(state.email.input);
            break;
        case componentIDs.password:
            state.password.isValid = validatePassword(state.password.input);
            break;
        default:
            break;
    }
}

const disableRegister = computed(
    () => state.firstName.isValid && state.lastName.isValid && state.email.isValid && state.password.isValid,
);

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
        state.registrationData = createNetworkObject(response, false);
    } catch (error) {
        console.error(error);
        state.registrationData = createNetworkObject(initialRegisterObject, false, true);
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

function onLoginClicked(e: MouseEvent | Event) {
    // everything is in order initiate network call
}
</script>

<template>
    <AuthCard heading="Register" name="register">
        <template #default>
            <form
                class="pure-form pure-form-stacked"
                @submit.prevent=""
                v-if="!state.registrationData.data.data?.userid ?? true"
            >
                <fieldset>
                    <div class="pure-g">
                        <div class="pure-u-1">
                            <label :for="componentIDs.firstName">First name *</label>
                            <input
                                v-model="state.firstName.input"
                                class="pure-input-1"
                                type="text"
                                :id="componentIDs.firstName"
                                :name="componentIDs.firstName"
                                :class="!state.firstName.isValid && 'invalid'"
                                @blur="validationService"
                                required
                            />
                        </div>
                        <div class="pure-u-1">
                            <label :for="componentIDs.lastName">Last name *</label>
                            <input
                                v-model="state.lastName.input"
                                class="pure-input-1"
                                type="text"
                                :id="componentIDs.lastName"
                                :name="componentIDs.lastName"
                                :class="!state.lastName.isValid && 'invalid'"
                                required
                                @blur="validationService"
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
                                v-model="state.email.input"
                                class="pure-input-1"
                                type="email"
                                :id="componentIDs.email"
                                :name="componentIDs.email"
                                :class="!state.email.isValid && 'invalid'"
                                required
                                @blur="validationService"
                            />
                        </div>
                        <div class="pure-u-1">
                            <label :for="componentIDs.password">Password *</label>
                            <input
                                v-model="state.password.input"
                                class="pure-input-1"
                                type="password"
                                :id="componentIDs.password"
                                :class="!state.password.isValid && 'invalid'"
                                required
                                @blur="validationService"
                            />
                        </div>
                    </div>
                </fieldset>
                <button
                    :disabled="!disableRegister"
                    type="submit"
                    class="pure-button pure-button-primary"
                    :class="!disableRegister && 'pure-button-disabled'"
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
                <button type="submit" class="pure-button pure-button-primary" @click="onLoginClicked">Login</button>
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
</style>
