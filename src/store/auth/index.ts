import { action, makeAutoObservable, observable } from "mobx";
import { AxiosResponse } from "axios";
import { isEmpty, isNil } from "lodash";

import { removeStorage, setStorage } from "@services/storage.service";
import { showAxiosNotificationError } from "@helpers/errorsHelper";
import { showNotification } from "@helpers/notificarionHelper";
import axiosInstance from "../../api/api";
import { TSignUpForm } from "@components/globalComponents/AuthForm/components/SignUpForm/formAttrs";
import { TSignInForm } from "@components/globalComponents/AuthForm/components/SignInForm/formAttrs";
import {
    IAuthStore,
    TAuthData,
    TAuthPaymentCard,
    TEmailConfirmationResponse,
    TResetPasswordRequest,
    TUserData,
} from "./types";
import { JWT_TOKEN, JWT_TOKEN_EXP } from "@consts/storageNamesContsts";
import { TForgotPasswordForm } from "@components/globalComponents/AuthForm/components/ForgotPasswordForm/formAttrs";
import { TChangePasswordForm } from "@components/globalComponents/AuthForm/components/ChangePasswordForm/formAttrs";
import { TEmailConfirmationForm } from "@components/globalComponents/AuthForm/components/EmailConfirmationForm/formAttrs";
import { TNullable } from "@globalTypes/commonTypes";
import {
    UserCardsDataMockup,
    UserDataMockup,
} from "../../mockups/AuthDataMockup";

export class AuthStore implements IAuthStore {
    authData: TNullable<TAuthData> = null;
    authRequestFetching = false;
    userData: TNullable<TUserData> = null;
    userDataFetching = true;
    userCardsData: TNullable<TAuthPaymentCard[]> = null;
    userCardsDataFetching = true;
    selectedCard: TAuthPaymentCard | null = null;

    constructor() {
        makeAutoObservable(this, {
            authData: observable,
            authRequestFetching: observable,
            userData: observable,
            userDataFetching: observable,
            userCardsData: observable,
            userCardsDataFetching: observable,
            selectedCard: observable,
            //
            setAuthData: action,
            setAuthRequestFetching: action,
            setUserData: action,
            setUserDataFetching: action,
            setUserCardsData: action,
            setUserCardsDataFetching: action,
            setSelectedCard: action,
        });
    }
    ////////////////////////////////////
    setAuthData = (data: TNullable<TAuthData>): void => {
        this.authData = data;
        console.log("123123123123");
        if (!isNil(data)) {
            setStorage(JWT_TOKEN, data.jwt);
            setStorage(JWT_TOKEN_EXP, data?.jwt_expiration_date);
        } else {
            removeStorage(JWT_TOKEN);
            removeStorage(JWT_TOKEN_EXP);
        }
    };

    setAuthRequestFetching = (value: boolean): void => {
        this.authRequestFetching = value;
    };

    setUserData = (data: TNullable<TUserData>): void => {
        this.userData = data;
    };

    setUserDataFetching = (value: boolean): void => {
        this.userDataFetching = value;
    };

    setSelectedCard = (data: TAuthPaymentCard | null): void => {
        this.selectedCard = data;
    };

    setUserCardsData = (data: TNullable<TAuthPaymentCard[]>): void => {
        this.userCardsData = data;
    };

    setUserCardsDataFetching = (value: boolean): void => {
        this.userCardsDataFetching = value;
    };

    ///
    authSignUpRequest = (formValues: TSignUpForm): Promise<void> => {
        this.setAuthRequestFetching(true);
        return axiosInstance
            .post("/auth/local/register", formValues)
            .then((data: AxiosResponse<TAuthData>) => {
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

    forgotPasswordRequest = (
        formValues: TForgotPasswordForm,
    ): Promise<void> => {
        this.setAuthRequestFetching(true);
        return axiosInstance
            .post("/auth/local", formValues)
            .then((data: AxiosResponse<{ ok: boolean }>) => {
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

    getUserData = (): Promise<AxiosResponse<TUserData>> => {
        this.setUserDataFetching(true);
        return axiosInstance
            .get("/user")
            .then((response: AxiosResponse<TUserData>) => {
                const { data } = response;
                // this.setUserData(data);
                return response;
            })
            .catch((err) => {
                // ToDo turn on !
                // showAxiosNotificationError(err);
                throw err;
            })
            .finally(() => {
                this.setUserData(UserDataMockup);
                this.setUserDataFetching(false);
            });
    };

    getUserCardsData = (): Promise<AxiosResponse<TAuthPaymentCard[]>> => {
        this.setUserCardsDataFetching(true);
        return axiosInstance
            .get("/user/cards")
            .then((response: AxiosResponse<TAuthPaymentCard[]>) => {
                const { data } = response;
                // this.setUserCardsData(data);
                return response;
            })
            .catch((err) => {
                // ToDo turn on !
                // showAxiosNotificationError(err);
                throw err;
            })
            .finally(() => {
                this.setUserCardsData(UserCardsDataMockup);
                this.setUserCardsDataFetching(false);
            });
    };

    resetUserData = (): void => {
        this.setAuthData(null);
        this.setUserData(null);
        this.setUserCardsData(null);
    };

    logOut = (): void => {
        this.resetUserData();
        removeStorage(JWT_TOKEN);
        removeStorage(JWT_TOKEN_EXP);
    };
}
