import { TNullable } from "@globalTypes/commonTypes";
import { AxiosResponse } from "axios";
import { TResponseMeta } from "@globalTypes/requestTypes";

export type TDoorItemData = {
    id: number;
    createDate: string;
    user: number; // id
    title: string;
    img: TNullable<string>;
    price: number;
    options: { title: string; value: string }[];
};

export type TGetDoorsDataResponse = TDoorItemData[];

export type TCreateDoorRequest = {
    price: number;
    data: Record<string, unknown>;
};

export type TGetDoorsRequest =
    | {
          ids: string;
      }
    | undefined;

export type TCreateDoorResponse = {
    id: number;
    price: number;
    title: string;
};

export type TCreateOrderRequest = {
    userInfo: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        promo: true;
    };
    shipping: {
        address: string;
        delivery_company: number;
    };
    extras: { extra: number; quantity?: number }[];
    items: { item: number; quantity: number }[];
    sessionId: string;
    sessionResult: string;
};

export type TGetOrderCartRequest = {
    cartId: number;
};

export type TCreateOrderCartRequest = {
    items: { id: number; quantity: number }[];
    cartId?: number;
    code?: string;
};

export enum EOrderCartNames {
    discount = "discount",
    amount = "amount",
}

export type TGetOrderCartResponse = {
    [EOrderCartNames.amount]: number;
    [EOrderCartNames.discount]: number;
    items: { id: number; quantity: number }[];
    cartId: number;
    code: TNullable<string>;
    percent: number;
    error?: string;
};

export type TCreateOrderCartResponse = {
    [EOrderCartNames.amount]: number;
    [EOrderCartNames.discount]: number;
    cartId: number;
    code: TNullable<string>;
    error?: string;
};

export type TGetPaymentSessionAdyenResponse = {
    methods: object;
    session: {
        amount: {
            currency: string;
            value: number;
        };
        countryCode: string;
        expiresAt: string;
        id: string;
        merchantAccount: string;
        reference: string;
        returnUrl: string;
        sessionData: string;
    };
};

export type TDeleteDoorResponse = { data: { id: number } } & TResponseMeta;

export type TGetPaymentSessionParams = {
    amount: number;
};

export interface IOrderStore {
    doorsData: TNullable<TGetDoorsDataResponse>;
    doorsDataFetching: boolean;
    createDoorRequestFetching: boolean;
    deleteDoorRequestFetching: boolean;
    orderCart: TNullable<TGetOrderCartResponse>;
    orderCartFetching: boolean;
    orderCartParams: TNullable<TGetOrderCartRequest>;
    //
    createOrderRequestFetching: boolean;
    getPaymentSessionFetching: boolean;
    // -------------------------------------------------------------------------------
    getDoorsData: (
        params?: TGetDoorsRequest,
    ) => Promise<AxiosResponse<TGetDoorsDataResponse>>;
    setDoorsData: (data: TNullable<TGetDoorsDataResponse>) => void;
    setDoorsDataFetching: (value: boolean) => void;
    //
    getOrderCart: (
        cartId?: number,
    ) => Promise<AxiosResponse<TGetOrderCartResponse>>;
    createOrderCart: (
        params: TCreateOrderCartRequest,
    ) => Promise<AxiosResponse<TCreateOrderCartResponse>>;
    deleteOrderCart: (
        cartId: number,
    ) => Promise<AxiosResponse<TGetOrderCartResponse>>;
    setOrderCart: (params: TNullable<TGetOrderCartResponse>) => void;
    setOrderCartFetching: (value: boolean) => void;
    setOrderCartParams: (params: TNullable<TGetOrderCartRequest>) => void;
    //
    createDoorRequest: (
        params: TCreateDoorRequest,
    ) => Promise<AxiosResponse<TCreateDoorResponse>>;
    setCreateDoorRequestFetching: (value: boolean) => void;
    deleteDoorRequest: (
        ids: number[],
    ) => Promise<AxiosResponse<TDeleteDoorResponse>>;
    setDeleteDoorRequestFetching: (value: boolean) => void;
    //
    createOrderRequest: (params: TCreateOrderRequest) => Promise<AxiosResponse>;
    setCreateOrderRequestFetching: (value: boolean) => void;
    //
    getPaymentSession: (
        params: TGetPaymentSessionParams,
    ) => Promise<AxiosResponse<TGetPaymentSessionAdyenResponse>>;
    setGetPaymentSessionFetching: (value: boolean) => void;
}
