import { action, makeAutoObservable, observable } from "mobx";
import { AxiosResponse } from "axios";
import { isEmpty } from "lodash";

import { removeStorage, setStorage } from "@services/storage.service";
import { showAxiosNotificationError } from "@helpers/errorsHelper";
import { showNotification } from "@helpers/notificarionHelper";
import axiosInstance from "../../api/api";
import { TSignUpForm } from "@components/globalComponents/AuthForm/components/SignUpForm/formAttrs";
import { TSignInForm } from "@components/globalComponents/AuthForm/components/SignInForm/formAttrs";
import {
    IAuthStore,
    TAccountData,
    TAuthData,
    TEmailConfirmationResponse,
    TResetPasswordRequest,
} from "./types";
import { AUTH_DATA, JWT_TOKEN } from "@consts/storageNamesContsts";
import { AuthDataMockup } from "../../mockups/AuthDataMockup";
import { TForgotPasswordForm } from "@components/globalComponents/AuthForm/components/ForgotPasswordForm/formAttrs";
import { TChangePasswordForm } from "@components/globalComponents/AuthForm/components/ChangePasswordForm/formAttrs";
import { TEmailConfirmationForm } from "@components/globalComponents/AuthForm/components/EmailConfirmationForm/formAttrs";

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

    setAccountDataFetching = (value: boolean): void => {
        this.accountDataFetching = value;
    };

    ////////////////////////////////////
    // Auth
    //
    setAuthData = (data: TAuthData | null): void => {
        console.log("setAuthData______", data);
        this.authData = data;
        if (!isEmpty(data)) {
            setStorage(JWT_TOKEN, data?.jwt);
            setStorage(AUTH_DATA, data?.user);
        } else {
            removeStorage(JWT_TOKEN);
            removeStorage(AUTH_DATA);
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
                console.log("err", err);
                showAxiosNotificationError(err);
                throw err;
            })
            .finally(() => {
                this.setAuthRequestFetching(false);
            });
    };

    forgotPasswordRequest = (
        formValues: TForgotPasswordForm,
    ): Promise<void> => {
        this.setAuthRequestFetching(true);
        return axiosInstance
            .post("/auth/local", formValues)
            .then((data: AxiosResponse<{ ok: boolean }>) => {
                console.log("forgotPasswordRequest ok", data.data.ok);
                showNotification({
                    type: "success",
                    message:
                        "Check your email for a link to reset your password. If it doesn’t appear within a few minutes, check your spam folder.",
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

    resetPasswordRequest = (
        formValues: TResetPasswordRequest,
    ): Promise<void> => {
        this.setAuthRequestFetching(true);
        return axiosInstance
            .post("/auth/reset-password", formValues)
            .then((data: AxiosResponse<TAuthData>) => {
                console.log("resetPasswordRequest");
            })
            .catch((err) => {
                showAxiosNotificationError(err);
                throw err;
            })
            .finally(() => {
                this.setAuthRequestFetching(false);
            });
    };

    changePasswordRequest = (
        formValues: TChangePasswordForm,
    ): Promise<void> => {
        this.setAuthRequestFetching(true);
        return axiosInstance
            .post("/auth/change-password", formValues)
            .then((data: AxiosResponse<TAuthData>) => {
                console.log("changePasswordRequest");
            })
            .catch((err) => {
                showAxiosNotificationError(err);
                throw err;
            })
            .finally(() => {
                this.setAuthRequestFetching(false);
            });
    };

    emailConfirmationRequest = (
        formValues: TEmailConfirmationForm,
    ): Promise<void> => {
        this.setAuthRequestFetching(true);
        return axiosInstance
            .post("/auth/send-email-confirmation", formValues)
            .then((response: AxiosResponse<TEmailConfirmationResponse>) => {
                const { data } = response;
                console.log("emailConfirmationRequest");
                if (data.sent) {
                    showNotification({
                        type: "success",
                        message:
                            "Check your email for a link to confirm your email. If it doesn’t appear within a few minutes, check your spam folder.",
                    });
                }
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
