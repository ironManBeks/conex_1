import { TResponseMeta } from "@globalTypes/requestTypes";
import { TNullable } from "@globalTypes/commonTypes";
import { AxiosResponse } from "axios";

export type TDoorItemData = {
    id: number;
    attributes: {
        createdAt: string;
        data: Record<string, unknown>;
        price: number;
        publishedAt: string;
        updatedAt: string;
    };
};

export type TGetDoorsDataResponse = {
    data: TDoorItemData[];
} & TResponseMeta;

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
    extras: { extra: number }[];
    items: { item: number }[];
};

export interface IOrderStore {
    doorsData: TNullable<TGetDoorsDataResponse>;
    doorsDataFetching: boolean;
    createDoorRequestFetching: boolean;
    deleteDoorRequestFetching: boolean;
    //
    createOrderRequestFetching: boolean;
    //-------------------------------------------------------------------------------
    getDoorsData: () => Promise<AxiosResponse<TGetDoorsDataResponse>>;
    setDoorsData: (data: TNullable<TGetDoorsDataResponse>) => void;
    setDoorsDataFetching: (value: boolean) => void;
    createDoorRequest: (
        data: TCreateDoorRequest,
    ) => Promise<AxiosResponse<TCreateDoorResponse>>;
    setCreateDoorRequestFetching: (value: boolean) => void;
    deleteDoorRequest: (id: number) => Promise<AxiosResponse>;
    setDeleteDoorRequestFetching: (value: boolean) => void;
    //
    createOrderRequest: (data: TCreateOrderRequest) => Promise<AxiosResponse>;
    setCreateOrderRequestFetching: (value: boolean) => void;
}
