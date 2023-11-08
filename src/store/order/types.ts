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
};

export type TGetOrderPriceRequest = {
    items: { id: number; quantity: number }[];
    code?: string;
};

export enum EOrderPriceNames {
    discount = "discount",
    amount = "amount",
}

export type TGetOrderPriceResponse = {
    [EOrderPriceNames.amount]: number;
    [EOrderPriceNames.discount]: number;
    code: TNullable<string>;
    percent: number;
    error?: string;
};

export type TDeleteDoorResponse = { data: { id: number } } & TResponseMeta;

export interface IOrderStore {
    doorsData: TNullable<TGetDoorsDataResponse>;
    doorsDataFetching: boolean;
    createDoorRequestFetching: boolean;
    deleteDoorRequestFetching: boolean;
    orderPrice: TNullable<TGetOrderPriceResponse>;
    orderPriceFetching: boolean;
    priceParams: TNullable<TGetOrderPriceRequest>;
    //
    createOrderRequestFetching: boolean;
    // -------------------------------------------------------------------------------
    getDoorsData: () => Promise<AxiosResponse<TGetDoorsDataResponse>>;
    setDoorsData: (data: TNullable<TGetDoorsDataResponse>) => void;
    setDoorsDataFetching: (value: boolean) => void;
    //
    getOrderPrice: (
        params: TGetOrderPriceRequest,
    ) => Promise<AxiosResponse<TGetOrderPriceResponse>>;
    setOrderPrice: (params: TNullable<TGetOrderPriceResponse>) => void;
    setOrderPriceFetching: (value: boolean) => void;
    setPriceParams: (params: TNullable<TGetOrderPriceRequest>) => void;
    //
    createDoorRequest: (
        params: TCreateDoorRequest,
    ) => Promise<AxiosResponse<TCreateDoorResponse>>;
    setCreateDoorRequestFetching: (value: boolean) => void;
    deleteDoorRequest: (
        id: number,
    ) => Promise<AxiosResponse<TDeleteDoorResponse>>;
    setDeleteDoorRequestFetching: (value: boolean) => void;
    //
    createOrderRequest: (params: TCreateOrderRequest) => Promise<AxiosResponse>;
    setCreateOrderRequestFetching: (value: boolean) => void;
}
