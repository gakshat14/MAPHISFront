<script setup lang="ts">
import type { IRegister } from '@/utils/model';
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
    selectedCountry: string;
    countryList: string[];
    occupation: string;
    password: IInputState;
    email: IInputState;
    countryInput: string;
    showResults: boolean;
    filteredCountries: string[];
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
    selectedCountry: '',
    countryList: countries,
    occupation: '',
    password: { ...initialInputState },
    email: { ...initialInputState },
    countryInput: '',
    showResults: false,
    filteredCountries: [],
};

const state: IState = reactive(initialState);

function onCountryClicked(country: string) {
    state.selectedCountry = country;
    console.log(country);
    state.showResults = false;
    state.filteredCountries = [];
}

function getCountryValue() {
    if (state.selectedCountry.length < 1) return state.countryInput;
    return state.selectedCountry;
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
        const body: IRegister = {
            email: state.email.input,
            password: state.password.input,
            details: {
                firstName: state.firstName.input,
                lastName: state.lastName.input,
            },
        };
        state.selectedCountry && (body.details.country = state.selectedCountry);
        state.occupation && (body.details.occupation = state.occupation);
        const response = await fetch('http://3.87.55.122/user/add', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        });
        console.log(await response.json());
    } catch (error) {
        console.error(error);
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
    return function (e: FocusEvent) {
        state.showResults = show;
    };
}
</script>

<template>
    <AuthCard heading="Register" name="register">
        <template #default>
            <form class="pure-form pure-form-stacked" @submit.prevent="">
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
                                :value="getCountryValue()"
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
                >
                    Register
                </button>
            </form>
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
