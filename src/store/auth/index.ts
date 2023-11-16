import { makeAutoObservable } from "mobx";
import { AxiosResponse } from "axios";
import { isNil } from "lodash";

import { removeStorage, setStorage } from "@services/storage.service";
import { showAxiosNotificationError } from "@helpers/errorsHelper";
import { showNotification } from "@helpers/notificarionHelper";
import axiosInstance from "../../api/api";
import { TSignUpForm } from "@components/globalComponents/AuthForm/components/SignUpForm/formAttrs";
import { TSignInForm } from "@components/globalComponents/AuthForm/components/SignInForm/formAttrs";
import {
    IAuthStore,
    TAccountOrders,
    TAuthData,
    TEmailConfirmationResponse,
    TGetUserSingleOrderRequest,
    TResetPasswordRequest,
    TSingleOrderData,
    TUpdateUserRequest,
    TUserData,
} from "./types";
import { JWT_TOKEN, JWT_TOKEN_EXP } from "@consts/storageNamesContsts";
import { TForgotPasswordForm } from "@components/globalComponents/AuthForm/components/ForgotPasswordForm/formAttrs";
import { TChangePasswordForm } from "@components/globalComponents/AuthForm/components/ChangePasswordForm/formAttrs";
import { TEmailConfirmationForm } from "@components/globalComponents/AuthForm/components/EmailConfirmationForm/formAttrs";
import { TNullable } from "@globalTypes/commonTypes";
import { UserCardsDataMockup } from "../../mockups/AuthDataMockup";
import { TPaymentCard } from "@components/globalComponents/types";
import { copyWithout } from "@helpers/objectHelper";
import { AccountSingleOrderMockup } from "../../mockups/AccountSingleOrderMockup";
import { ESegmentedOptionsNames } from "@components/pages/account/types";

export class AuthStore implements IAuthStore {
    isAuthorized: boolean = false;
    authData: TNullable<TAuthData> = null;
    authRequestFetching = false;
    userData: TNullable<TUserData> = null;
    userDataFetching = false;
    userCardsData: TNullable<TPaymentCard[]> = null;
    userCardsDataFetching = true;
    selectedCard: TNullable<TPaymentCard> = null;
    userOrdersData: TNullable<TAccountOrders> = null;
    userOrdersDataFetching = true;
    updateUserRequestFetching: boolean = false;
    userSingleOrderData: TNullable<TSingleOrderData> = null;
    userSingleOrderDataFetching: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    setIsAuthorized = (value: boolean) => {
        this.isAuthorized = value;
    };

    setAuthData = (data: TNullable<TAuthData>): void => {
        this.authData = data;
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
        if (data) {
            this.setIsAuthorized(true);
        } else this.setIsAuthorized(false);
        this.userData = data;
    };

    setUserDataFetching = (value: boolean): void => {
        this.userDataFetching = value;
    };

    setSelectedCard = (data: TPaymentCard | null): void => {
        this.selectedCard = data;
    };

    setUserCardsData = (data: TNullable<TPaymentCard[]>): void => {
        this.userCardsData = data;
    };

    setUserCardsDataFetching = (value: boolean): void => {
        this.userCardsDataFetching = value;
    };

    setUserOrdersData = (data: TNullable<TAccountOrders>): void => {
        this.userOrdersData = data;
    };

    setUserOrdersDataFetching = (value: boolean): void => {
        this.userOrdersDataFetching = value;
    };

    setUpdateUserRequestFetching = (value: boolean): void => {
        this.updateUserRequestFetching = value;
    };

    setUserSingleOrderData = (data: TNullable<TSingleOrderData>): void => {
        this.userSingleOrderData = data;
    };

    setUserSingleOrderDataFetching = (value: boolean): void => {
        this.userSingleOrderDataFetching = value;
    };

    // -------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------

    authSignUpRequest = (formValues: TSignUpForm): Promise<void> => {
        this.setAuthRequestFetching(true);
        return axiosInstance
            .post("/auth/local/register", formValues)
            .then((data: AxiosResponse<TAuthData>) => {
                this.setAuthData(data.data);
                showNotification({
                    mainProps: {
                        type: "success",
                        message: "We sent you a link to prove your email",
                    },
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

    authSignInRequest = (
        formValues: TSignInForm,
    ): Promise<AxiosResponse<TAuthData>> => {
        this.setAuthRequestFetching(true);
        return axiosInstance
            .post("/auth/local", formValues)
            .then((data: AxiosResponse<TAuthData>) => {
                this.setAuthData(data.data);
                showNotification({
                    mainProps: {
                        type: "success",
                        message: "Welcome to Conexwest",
                    },
                });
                return data;
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
            .post("/auth/forgot-password", formValues)
            .then((data: AxiosResponse<{ ok: boolean }>) => {
                console.log("forgotPasswordRequest", data);
                showNotification({
                    mainProps: {
                        type: "success",
                        message:
                            "Check your email for a link to reset your password. If it doesn’t appear within a few minutes, check your spam folder.",
                    },
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
                console.log("resetPasswordRequest", data);
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
                console.log("changePasswordRequest", data);
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
                console.log("emailConfirmationRequest", data);
                if (data.sent) {
                    showNotification({
                        mainProps: {
                            type: "success",
                            message:
                                "Check your email for a link to confirm your email. If it doesn’t appear within a few minutes, check your spam folder.",
                        },
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
            .get("/users/me")
            .then((response: AxiosResponse<TUserData>) => {
                const { data } = response;
                this.setUserData(data);
                return response;
            })
            .catch((err) => {
                showAxiosNotificationError(err);
                throw err;
            })
            .finally(() => {
                this.setUserDataFetching(false);
            });
    };

    updateUserRequest = (
        params: TUpdateUserRequest,
    ): Promise<AxiosResponse> => {
        this.setUpdateUserRequestFetching(true);
        return axiosInstance
            .put(`/users/${params.id}`, copyWithout(params, "id"))
            .then((response: AxiosResponse) => {
                if (this.userData) {
                    this.setUserData({
                        ...this.userData,
                        ...copyWithout(params, "id"),
                    });
                }
                return response;
            })
            .catch((err) => {
                showAxiosNotificationError(err);
                throw err;
            })
            .finally(() => {
                this.setUpdateUserRequestFetching(false);
            });
    };

    getUserCardsData = (): Promise<AxiosResponse<TPaymentCard[]>> => {
        this.setUserCardsDataFetching(true);
        return axiosInstance
            .get("/user/cards")
            .then((response: AxiosResponse<TPaymentCard[]>) => {
                // const { data } = response;
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

    getUserOrdersData = (
        status: ESegmentedOptionsNames,
    ): Promise<AxiosResponse<TAccountOrders>> => {
        this.setUserOrdersDataFetching(true);
        return axiosInstance
            .get("/orders", {
                params: {
                    "filter[status]": status,
                },
            })
            .then((response: AxiosResponse<TAccountOrders>) => {
                const { data } = response;
                // INFO: Sorting -> back end
                const dateSortedData = data.data.sort((a, b) => b.id - a.id);
                if (status && status !== "all") {
                    // INFO: filter should be on back end side, on back end is not working yet
                    const filteredOrders = dateSortedData.filter(
                        ({ attributes }) => attributes.status === status,
                    );

                    this.setUserOrdersData({ ...data, data: filteredOrders });
                } else {
                    this.setUserOrdersData({ ...data, data: dateSortedData });
                }
                return response;
            })
            .catch((err) => {
                // ToDo turn on !
                showAxiosNotificationError(err);
                throw err;
            })
            .finally(() => {
                // this.setUserOrdersData(AccountOrdersMockup[status]);
                this.setUserOrdersDataFetching(false);
            });
    };

    getUserSingleOrderData = (
        params: TGetUserSingleOrderRequest,
    ): Promise<AxiosResponse<TSingleOrderData>> => {
        this.setUserSingleOrderDataFetching(true);
        return axiosInstance
            .get(`/user/oreder/${params.id}`)
            .then((response: AxiosResponse<TSingleOrderData>) => {
                // const { data } = response;
                // this.setUserSingleOrderData(data);
                return response;
            })
            .catch((err) => {
                // ToDo turn on !
                // showAxiosNotificationError(err);
                throw err;
            })
            .finally(() => {
                this.setUserSingleOrderData(AccountSingleOrderMockup);
                setTimeout(() => {
                    this.setUserSingleOrderDataFetching(false);
                }, 300);
            });
    };

    resetUserData = (): void => {
        this.setAuthData(null);
        this.setUserData(null);
        this.setUserCardsData(null);
        this.setUserOrdersData(null);
    };

    logOut = (): void => {
        this.resetUserData();
        removeStorage(JWT_TOKEN);
        removeStorage(JWT_TOKEN_EXP);
    };
}
