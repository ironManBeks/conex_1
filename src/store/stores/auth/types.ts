import { TSignUpForm } from "@components/globalComponents/AuthForm/components/SignUpForm/formAttrs";
import { TSignInForm } from "@components/globalComponents/AuthForm/components/SignInForm/formAttrs";

export type TAuthPaymentCard = {
    id: string;
    name: string;
    cardNumber: string;
    expMonth: string;
    expYear: string;
};

export type TAccountData = {
    name: string;
    email: string;
    phone: string;
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

export interface IAuthStore {
    accountData: TAccountData;
    getAccountData: () => void;
    setAccountData: (data: TAccountData) => void;
    accountDataFetching: boolean;
    setAccountDataFetching: (value: boolean) => void;
    authData: TAuthData;
    setAuthData: (data: TAuthData) => void;
    authRequestFetching: boolean;
    setAuthRequestFetching: (value: boolean) => void;
    authSignUpRequest: (data: TSignUpForm) => Promise<void>;
    authSignInRequest: (data: TSignInForm) => Promise<void>;
}
