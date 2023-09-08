import { TSignUpForm } from "@components/globalComponents/AuthForm/components/SignUpForm/formAttrs";
import { TSignInForm } from "@components/globalComponents/AuthForm/components/SignInForm/formAttrs";
import { TForgotPasswordForm } from "@components/globalComponents/AuthForm/components/ForgotPasswordForm/formAttrs";
import { TResetPasswordForm } from "@components/globalComponents/AuthForm/components/ResetPasswordForm/formAttrs";
import { TChangePasswordForm } from "@components/globalComponents/AuthForm/components/ChangePasswordForm/formAttrs";
import { TEmailConfirmationForm } from "@components/globalComponents/AuthForm/components/EmailConfirmationForm/formAttrs";

export type TAuthPaymentCard = {
    id: string;
    name: string;
    cardNumber: string;
    expMonth: string;
    expYear: string;
};

export type TAccountData = {
    name: string;
    surname: string;
    email: string;
    phone: string;
    country: string;
    city: string;
    address: string;
    index: string;
    cards: TAuthPaymentCard[];
} | null;

export type TAuthData = {
    jwt: string;
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
} | null;

export type TResetPasswordRequest = {
    code: string;
} & TResetPasswordForm;

export type TEmailConfirmationResponse = {
    email: string;
    sent: boolean;
};

export interface IAuthStore {
    accountData: TAccountData;
    setAccountData: (data: TAccountData) => void;
    accountDataFetching: boolean;
    setAccountDataFetching: (value: boolean) => void;
    authData: TAuthData;
    setAuthData: (data: TAuthData) => void;
    authRequestFetching: boolean;
    setAuthRequestFetching: (value: boolean) => void;
    authSignUpRequest: (data: TSignUpForm) => Promise<void>;
    authSignInRequest: (data: TSignInForm) => Promise<void>;
    forgotPasswordRequest: (data: TForgotPasswordForm) => Promise<void>;
    resetPasswordRequest: (data: TResetPasswordRequest) => Promise<void>;
    changePasswordRequest: (data: TChangePasswordForm) => Promise<void>;
    emailConfirmationRequest: (data: TEmailConfirmationForm) => Promise<void>;
}
