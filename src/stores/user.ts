import { ACCESS_TOKEN } from '@/utils/constants';
import type { IAuthRequest, IToken } from '@/utils/model';
import { post } from '@/utils/networkUtils';
import { decodeJWTToken, storeInSessionStorage } from '@/utils/securityUtils';
import { defineStore } from 'pinia';

interface IState {
    firstName: string;
    lastName: string;
    userId: string;
    accessToken: string;
}

const initialState: IState = {
    firstName: '',
    lastName: '',
    userId: '',
    accessToken: '',
};

export const useUserStore = defineStore({
    id: 'user',
    state: (): IState => ({ ...initialState }),
    getters: {
        getFullName: (state) => `${state.firstName} ${state.lastName}`,
    },
    actions: {
        async authenticateUser(email: string, password: string) {
            try {
                const response = await post<IToken, IAuthRequest>('auth', {
                    email: email,
                    password: password,
                });
                const decodedToken = decodeJWTToken(response.access_token);
                this.accessToken = `${response.token_type} ${response.access_token}`;
                this.$state = { ...this.$state, ...decodedToken };
                storeInSessionStorage<IToken>(`ACCESS_TOKEN`, response);
                return { userId: email };
            } catch (error: any) {
                throw new Error(error.message);
            }
        },
    },
});
