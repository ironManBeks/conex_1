import { makeAutoObservable } from "mobx";
import { AxiosResponse } from "axios";

import {
    IOrderStore,
    TCreateDoorRequest,
    TCreateDoorResponse,
    TCreateOrderRequest,
    TGetDoorsDataResponse,
    TGetOrderPriceRequest,
    TGetOrderPriceResponse,
    TOrderPrice,
} from "./types";
import { TNullable } from "@globalTypes/commonTypes";
import axiosInstance from "../../api/api";
import { showAxiosNotificationError } from "@helpers/errorsHelper";

export class OrderStore implements IOrderStore {
    doorsData: TNullable<TGetDoorsDataResponse> = null;
    doorsDataFetching = true;
    createDoorRequestFetching = false;
    deleteDoorRequestFetching = false;
    createOrderRequestFetching = false;
    orderPrice: TNullable<TOrderPrice> = null;
    orderPriceFetching = false;

    constructor() {
        makeAutoObservable(this);
    }

    setDoorsData = (data: TNullable<TGetDoorsDataResponse>): void => {
        this.doorsData = data;
    };

    setDoorsDataFetching = (value: boolean): void => {
        this.doorsDataFetching = value;
    };

    setCreateDoorRequestFetching = (value: boolean): void => {
        this.createDoorRequestFetching = value;
    };

    setDeleteDoorRequestFetching = (value: boolean): void => {
        this.deleteDoorRequestFetching = value;
    };

    setCreateOrderRequestFetching = (value: boolean): void => {
        this.createOrderRequestFetching = value;
    };

    setOrderPrice = (data: TNullable<TGetOrderPriceResponse>): void => {
        this.orderPrice = data;
    };

    setOrderPriceFetching = (value: boolean): void => {
        this.orderPriceFetching = value;
    };

    // -------------------------------------------------------------------------------

    getDoorsData = (): Promise<AxiosResponse<TGetDoorsDataResponse>> => {
        this.setDoorsDataFetching(true);
        return axiosInstance
            .get("/doors")
            .then((response: AxiosResponse<TGetDoorsDataResponse>) => {
                this.setDoorsData(response.data);
                return response;
            })
            .catch((err) => {
                showAxiosNotificationError(err);
                throw err;
            })
            .finally(() => {
                this.setDoorsDataFetching(false);
            });
    };

    createDoorRequest = (
        params: TCreateDoorRequest,
    ): Promise<AxiosResponse<TCreateDoorResponse>> => {
        console.log("123");
        this.setCreateDoorRequestFetching(true);
        return axiosInstance
            .post("/doors", { data: params })
            .then((response: AxiosResponse<TCreateDoorResponse>) => {
                return response;
            })
            .catch((err) => {
                showAxiosNotificationError(err);
                throw err;
            })
            .finally(() => {
                this.setCreateDoorRequestFetching(false);
            });
    };

    deleteDoorRequest = (id: number): Promise<AxiosResponse> => {
        this.setDeleteDoorRequestFetching(true);
        return axiosInstance
            .delete(`/doors/${id}`)
            .then((response: AxiosResponse) => {
                return response;
            })
            .catch((err) => {
                showAxiosNotificationError(err);
                throw err;
            })
            .finally(() => {
                this.setDeleteDoorRequestFetching(false);
            });
    };

    getOrderPrice = (
        params: TGetOrderPriceRequest,
    ): Promise<AxiosResponse<TGetOrderPriceResponse>> => {
        this.setOrderPriceFetching(true);
        return axiosInstance
            .post(`/order/cart`, params)
            .then((response: AxiosResponse<TGetOrderPriceResponse>) => {
                const { data } = response;
                console.log("response_____", response);
                this.setOrderPrice(data);
                return response;
            })
            .catch((err) => {
                showAxiosNotificationError(err);
                throw err;
            })
            .finally(() => {
                this.setOrderPriceFetching(false);
            });
    };

    createOrderRequest = (params: TCreateOrderRequest) => {
        this.setCreateOrderRequestFetching(true);
        return axiosInstance
            .post("/orders", { data: params })
            .then((data: AxiosResponse) => {
                console.log("data", data);
                return data;
            })
            .catch((err) => {
                showAxiosNotificationError(err);
                throw err;
            })
            .finally(() => {
                this.setCreateOrderRequestFetching(false);
            });
    };
}
