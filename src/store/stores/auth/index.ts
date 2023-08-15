import { action, makeAutoObservable, observable } from "mobx";
import { AxiosResponse } from "axios";
import { isEmpty } from "lodash";

import { removeStorage, setStorage } from "@services/storage.service";
import { showAxiosNotificationError } from "@helpers/errorsHelper";
import { showNotification } from "@helpers/notificarionHelper";
import axiosInstance from "../../../api/api";
import { TSignUpForm } from "@components/globalComponents/AuthForm/components/SignUpForm/formAttrs";
import { TSignInForm } from "@components/globalComponents/AuthForm/components/SignInForm/formAttrs";
import { IAuthStore, TAccountData, TAuthData } from "./types";
import { AUTH_DATA_STORAGE, AUTH_TOKEN } from "@consts/storageNamesContsts";
import { AuthDataMockup } from "../../../mockups/AuthDataMockup";

export class AuthStore implements IAuthStore {
    accountData: TAccountData = null;
    accountDataFetching = false;
    authData: TAuthData = null;
    authRequestFetching = false;

    constructor() {
        makeAutoObservable(this, {
            accountData: observable,
            accountDataFetching: observable,
            authData: observable,
            authRequestFetching: observable,
            setAccountData: action,
            setAccountDataFetching: action,
            setAuthData: action,
            setAuthRequestFetching: action,
        });
    }

    setAccountData = (data: TAccountData): void => {
        this.accountData = data;
    };

    getAccountData = (): void => {
        this.setAccountDataFetching(true);
        setTimeout(() => {
            this.setAccountData(AuthDataMockup);
            this.setAccountDataFetching(false);
        }, 500);
    };

    setAccountDataFetching = (value: boolean): void => {
        this.accountDataFetching = value;
    };

    ////////////////////////////////////
    // Auth
    //
    setAuthData = (data: TAuthData | null): void => {
        this.authData = data;
        if (!isEmpty(data)) {
            setStorage(AUTH_DATA_STORAGE, JSON.stringify(data));
            setStorage(AUTH_TOKEN, data?.jwt);
        } else {
            removeStorage(AUTH_DATA_STORAGE);
            removeStorage(AUTH_TOKEN);
        }
    };

    setAuthRequestFetching = (value: boolean): void => {
        this.authRequestFetching = value;
    };

    authSignUpRequest = (formValues: TSignUpForm): Promise<void> => {
        this.setAuthRequestFetching(true);
        return axiosInstance
            .post("/auth/local/register", formValues)
            .then((data: AxiosResponse<TAuthData>) => {
                console.log("data", data);
                this.setAuthData(data.data);
                showNotification({
                    type: "success",
                    message: "We sent you a link to prove your email",
                });
            })
            .catch((err) => {
                showAxiosNotificationError(err);
                throw err;
            })
            .finally(() => {
                this.setAuthRequestFetching(false);
            });
    };

    authSignInRequest = (formValues: TSignInForm): Promise<void> => {
        this.setAuthRequestFetching(true);
        return axiosInstance
            .post("/auth/local", formValues)
            .then((data: AxiosResponse<TAuthData>) => {
                this.setAuthData(data.data);
                showNotification({
                    type: "success",
                    message: "Welcome to Conexwest",
                });
            })
            .catch((err) => {
                showAxiosNotificationError(err);
                throw err;
            })
            .finally(() => {
                this.setAuthRequestFetching(false);
            });
    };
}
