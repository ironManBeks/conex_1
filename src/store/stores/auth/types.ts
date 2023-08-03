export type TAuthPaymentCard = {
    id: string;
    name: string;
    cardNumber: string;
    expMonth: string;
    expYear: string;
};

export type TAuthData = {
    name: string;
    email: string;
    phone: string;
    cards: TAuthPaymentCard[];
} | null;

export interface IAuthStore {
    authData: TAuthData;
    getAuthData: () => void;
    setAuthData: (data: TAuthData) => void;
    authDataFetching: boolean;
    setAuthDataFetching: (value: boolean) => void;
}
