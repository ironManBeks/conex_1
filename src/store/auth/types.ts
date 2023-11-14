import { AxiosResponse } from "axios";

import { TSignUpForm } from "@components/globalComponents/AuthForm/components/SignUpForm/formAttrs";
import { TSignInForm } from "@components/globalComponents/AuthForm/components/SignInForm/formAttrs";
import { TForgotPasswordForm } from "@components/globalComponents/AuthForm/components/ForgotPasswordForm/formAttrs";
import { TResetPasswordForm } from "@components/globalComponents/AuthForm/components/ResetPasswordForm/formAttrs";
import { TChangePasswordForm } from "@components/globalComponents/AuthForm/components/ChangePasswordForm/formAttrs";
import { TEmailConfirmationForm } from "@components/globalComponents/AuthForm/components/EmailConfirmationForm/formAttrs";
import { TNullable } from "@globalTypes/commonTypes";
import { TPaymentCard } from "@components/globalComponents/types";
import { ESegmentedOptionsNames } from "@components/pages/account/types";
import { TResponseMeta } from "@globalTypes/requestTypes";

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
    cartId: number;
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
    id: number;
    attributes: {
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
        status: string | null;
    };
    // orderNumber: string;
    // dateOfOrder: string;
    // orderAddress: string;
    // orderStatus?: EAccountOrderStatus;
    // moneyStatus?: EAccountOrderMoneyStatus;
    // statusTimelapse: TOrderStatusTimelapse[];
};

export type TAccountOrders = TResponseMeta & {
    // INFO: hopefully this response is temporery
    data: TAccountOrderItem[];
};

export type TSingleOrderData = {
    paymentMethod: string;
    total: number;
    subtotal: number;
    details: {
        label: string;
        value: string;
    }[];
} & TAccountOrders;

export type TGetUserSingleOrderRequest = {
    id: number;
};

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
    userOrdersData: TNullable<TAccountOrders>;
    userOrdersDataFetching: boolean;
    updateUserRequestFetching: boolean;
    userSingleOrderData: TNullable<TSingleOrderData>;
    userSingleOrderDataFetching: boolean;

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
    ) => Promise<AxiosResponse<TAccountOrders>>;
    setUserOrdersData: (data: TNullable<TAccountOrders>) => void;
    setUserOrdersDataFetching: (value: boolean) => void;
    //
    getUserSingleOrderData: (
        params: TGetUserSingleOrderRequest,
    ) => Promise<AxiosResponse<TSingleOrderData>>;
    setUserSingleOrderData: (data: TNullable<TSingleOrderData>) => void;
    setUserSingleOrderDataFetching: (value: boolean) => void;
    //
    setSelectedCard: (data: TNullable<TPaymentCard>) => void;
    resetUserData: () => void;
    logOut: () => void;
}
