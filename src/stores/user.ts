import { ACCESS_TOKEN } from '@/utils/constants';
import type { IAuthRequest, IToken, IUser } from '@/utils/model';
import { post } from '@/utils/networkUtils';
import { decodeJWTToken, deleteFromStorage, retrieveFromStorage, storeInSessionStorage } from '@/utils/securityUtils';
import { defineStore } from 'pinia';
import { useNotificationStore } from '@dafcoe/vue-notification';
import { returnNotificationObject } from '@/utils/commonUtils';

interface IState {
    user: IUser;
    accessToken: string;
}

const initialUser: IUser = {
    details: { firstName: '', lastName: '' },
    email: '',
    user_id: '',
};

const initialState: IState = {
    user: initialUser,
    accessToken: '',
};

const { setNotification } = useNotificationStore();

export const useUserStore = defineStore({
    id: 'user',
    state: (): IState => ({ ...initialState }),
    getters: {
        getFullName: (state) => `${state.user.details.firstName} ${state.user.details.lastName}`,
    },
    actions: {
        async authenticateUser(email: string, password: string) {
            try {
                const response = await post<IToken, IAuthRequest>('auth/auth', {
                    email: email,
                    password: password,
                });
                const decodedToken = decodeJWTToken(response.body.access_token);
                this.$patch({
                    user: decodedToken,
                    accessToken: `${response.body.token_type} ${response.body.access_token}`,
                });
                storeInSessionStorage<IToken>(ACCESS_TOKEN, response.body);
                return { userId: decodedToken.user_id };
            } catch (error: any) {
                setNotification(returnNotificationObject(error.message, 'alert'));
                throw new Error(error.message);
            }
        },
        isUserAuthenticated(): boolean {
            try {
                const response = retrieveFromStorage<IToken>(ACCESS_TOKEN);
                if (!response) return false;
                const decodedToken = decodeJWTToken(response.access_token);
                // if we have token then check if the token is valid by examing the expiry date
                // fow now expiry date is 3 weeks
                // because we are not doing anything sensitive here
                this.$patch({
                    user: decodedToken,
                    accessToken: `${response.token_type} ${response.access_token}`,
                });
                return true;
            } catch (error: any) {
                setNotification(returnNotificationObject(error.message, 'alert'));
                return false;
            }
        },
        logoutUser(): void {
            this.$reset();
            deleteFromStorage(ACCESS_TOKEN);
        },
    },
});
