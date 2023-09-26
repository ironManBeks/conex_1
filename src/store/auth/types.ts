import { AxiosResponse } from "axios";

import { TSignUpForm } from "@components/globalComponents/AuthForm/components/SignUpForm/formAttrs";
import { TSignInForm } from "@components/globalComponents/AuthForm/components/SignInForm/formAttrs";
import { TForgotPasswordForm } from "@components/globalComponents/AuthForm/components/ForgotPasswordForm/formAttrs";
import { TResetPasswordForm } from "@components/globalComponents/AuthForm/components/ResetPasswordForm/formAttrs";
import { TChangePasswordForm } from "@components/globalComponents/AuthForm/components/ChangePasswordForm/formAttrs";
import { TEmailConfirmationForm } from "@components/globalComponents/AuthForm/components/EmailConfirmationForm/formAttrs";
import { TNullable } from "@globalTypes/commonTypes";

export type TUserData = {
    name: string;
    surname: string;
    email: string;
    phone: string;
    country: string;
    city: string;
    address: string;
    index: string;
};

export type TAuthPaymentCard = {
    id: string;
    cvv: string;
    cardNumber: string;
    expMonth: string;
    expYear: string;
};

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

export interface IAuthStore {
    authData: TNullable<TAuthData>;
    authRequestFetching: boolean;
    userData: TNullable<TUserData>;
    userDataFetching: boolean;
    userCardsData: TNullable<TAuthPaymentCard[]>;
    userCardsDataFetching: boolean;
    selectedCard: TNullable<TAuthPaymentCard>;
    // functions
    setAuthData: (data: TNullable<TAuthData>) => void;
    setAuthRequestFetching: (value: boolean) => void;
    authSignUpRequest: (data: TSignUpForm) => Promise<void>;
    authSignInRequest: (data: TSignInForm) => Promise<void>;
    forgotPasswordRequest: (data: TForgotPasswordForm) => Promise<void>;
    resetPasswordRequest: (data: TResetPasswordRequest) => Promise<void>;
    changePasswordRequest: (data: TChangePasswordForm) => Promise<void>;
    emailConfirmationRequest: (data: TEmailConfirmationForm) => Promise<void>;
    //
    getUserData: () => Promise<AxiosResponse<TUserData>>;
    setUserData: (data: TNullable<TUserData>) => void;
    setUserDataFetching: (value: boolean) => void;
    //
    getUserCardsData: () => Promise<AxiosResponse<TAuthPaymentCard[]>>;
    setUserCardsData: (data: TNullable<TAuthPaymentCard[]>) => void;
    setUserCardsDataFetching: (value: boolean) => void;
    //
    setSelectedCard: (data: TNullable<TAuthPaymentCard>) => void;
    resetUserData: () => void;
    logOut: () => void;
}
