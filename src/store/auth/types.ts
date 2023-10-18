import { AxiosResponse } from "axios";

import { TSignUpForm } from "@components/globalComponents/AuthForm/components/SignUpForm/formAttrs";
import { TSignInForm } from "@components/globalComponents/AuthForm/components/SignInForm/formAttrs";
import { TForgotPasswordForm } from "@components/globalComponents/AuthForm/components/ForgotPasswordForm/formAttrs";
import { TResetPasswordForm } from "@components/globalComponents/AuthForm/components/ResetPasswordForm/formAttrs";
import { TChangePasswordForm } from "@components/globalComponents/AuthForm/components/ChangePasswordForm/formAttrs";
import { TEmailConfirmationForm } from "@components/globalComponents/AuthForm/components/EmailConfirmationForm/formAttrs";
import { TNullable } from "@globalTypes/commonTypes";
import { ESegmentedOptionsNames } from "@components/pages/AccountPage/types";
import { TPaymentCard } from "@components/globalComponents/types";

export enum EAccountOrderStatus {
    processed = "processed",
    delivered = "delivered",
}

export enum EAccountOrderMoneyStatus {
    processed = "processed",
    delivered = "delivered",
}

export enum EAccountOrderStatusTimelapse {
    done = "done",
    processed = "processed",
    feature = "feature",
    failure = "failure",
}

export type TUserDataId = {
    id: number;
};

export type TUserData = {
    blocked: boolean;
    confirmed: boolean;
    credit_cards: [];
    username: string;
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    provider: string; // "local"
    city: string;
    country: string;
    address: string;
    zip: string;
    createdAt: string;
    updatedAt: string;
    // name: string;
    // surname: string;
    // email: string;
    // phone: string;
    // country: string;
    // city: string;
    // address: string;
    // index: string;
} & TUserDataId;

export type TAuthData = {
    jwt: string;
    jwt_expiration_date: string;
    user: {
        id: number;
        username: string;
        email: string;
        provider: string;
        confirmed: boolean;
        blocked: boolean;
        createdAt: string;
        updatedAt: string;
    };
};

export type TResetPasswordRequest = {
    code: string;
} & TResetPasswordForm;

export type TEmailConfirmationResponse = {
    email: string;
    sent: boolean;
};

export type TOrderStatusTimelapse = {
    time: string;
    status: EAccountOrderStatusTimelapse;
    description?: string;
};

export type TAccountOrderItem = {
    id: string;
    orderNumber: string;
    dateOfOrder: string;
    orderAddress: string;
    orderStatus?: EAccountOrderStatus;
    moneyStatus?: EAccountOrderMoneyStatus;
    statusTimelapse: TOrderStatusTimelapse[];
};

export type TUserCartId = {
    id: string;
};

export type TUserCartItem = {
    title: string;
    price: number;
    img: string;
    options: {
        title: string;
        value: string;
    }[];
    createDate: string;
    count: number;
} & TUserCartId;

export type TUpdateUserRequest = {
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    city: string;
    country: string;
    address: string;
    zip: string;
} & TUserDataId;

export interface IAuthStore {
    isAuthorized: boolean;
    authData: TNullable<TAuthData>;
    authRequestFetching: boolean;
    userData: TNullable<TUserData>;
    userDataFetching: boolean;
    userCardsData: TNullable<TPaymentCard[]>;
    userCardsDataFetching: boolean;
    selectedCard: TNullable<TPaymentCard>;
    userOrdersData: TNullable<TAccountOrderItem[]>;
    userOrdersDataFetching: boolean;
    userCartData: TNullable<TUserCartItem[]>;
    userCartDataFetching: boolean;
    updateUserRequestFetching: boolean;

    // functions
    setIsAuthorized: (value: boolean) => void;
    setAuthData: (data: TNullable<TAuthData>) => void;
    setAuthRequestFetching: (value: boolean) => void;
    authSignUpRequest: (data: TSignUpForm) => Promise<void>;
    authSignInRequest: (data: TSignInForm) => Promise<AxiosResponse<TAuthData>>;
    forgotPasswordRequest: (data: TForgotPasswordForm) => Promise<void>;
    resetPasswordRequest: (data: TResetPasswordRequest) => Promise<void>;
    changePasswordRequest: (data: TChangePasswordForm) => Promise<void>;
    emailConfirmationRequest: (data: TEmailConfirmationForm) => Promise<void>;
    //
    getUserData: () => Promise<AxiosResponse<TUserData>>;
    setUserData: (data: TNullable<TUserData>) => void;
    setUserDataFetching: (value: boolean) => void;
    updateUserRequest: (params: TUpdateUserRequest) => Promise<AxiosResponse>;
    setUpdateUserRequestFetching: (value: boolean) => void;
    //
    getUserCardsData: () => Promise<AxiosResponse<TPaymentCard[]>>;
    setUserCardsData: (data: TNullable<TPaymentCard[]>) => void;
    setUserCardsDataFetching: (value: boolean) => void;
    //
    getUserOrdersData: (
        status: ESegmentedOptionsNames,
    ) => Promise<AxiosResponse<TAccountOrderItem[]>>;
    setUserOrdersData: (data: TNullable<TAccountOrderItem[]>) => void;
    setUserOrdersDataFetching: (value: boolean) => void;
    //
    getUserCartData: () => Promise<AxiosResponse<TUserCartItem[]>>;
    setUserCartData: (data: TNullable<TUserCartItem[]>) => void;
    setUserCartDataFetching: (value: boolean) => void;
    //
    setSelectedCard: (data: TNullable<TPaymentCard>) => void;
    resetUserData: () => void;
    logOut: () => void;
}
