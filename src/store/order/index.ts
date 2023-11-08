import { makeAutoObservable } from "mobx";
import { AxiosResponse } from "axios";

import {
    IOrderStore,
    TCreateDoorRequest,
    TCreateDoorResponse,
    TCreateOrderRequest,
    TDeleteDoorResponse,
    TGetDoorsDataResponse,
    TGetOrderPriceRequest,
    TGetOrderPriceResponse,
} from "./types";
import { TNullable } from "@globalTypes/commonTypes";
import axiosInstance from "../../api/api";
import { showAxiosNotificationError } from "@helpers/errorsHelper";
import { showNotification } from "@helpers/notificarionHelper";

export class OrderStore implements IOrderStore {
    doorsData: TNullable<TGetDoorsDataResponse> = null;
    doorsDataFetching = false;
    createDoorRequestFetching = false;
    deleteDoorRequestFetching = false;
    createOrderRequestFetching = false;
    orderPrice: TNullable<TGetOrderPriceResponse> = null;
    orderPriceFetching = false;
    priceParams: TNullable<TGetOrderPriceRequest> = null;

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

    setPriceParams = (data: TNullable<TGetOrderPriceRequest>): void => {
        this.priceParams = data;
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

    deleteDoorRequest = (
        id: number,
        showNotifications?: boolean,
    ): Promise<AxiosResponse<TDeleteDoorResponse>> => {
        this.setDeleteDoorRequestFetching(true);
        return axiosInstance
            .delete(`/doors/${id}`)
            .then((response: AxiosResponse<TDeleteDoorResponse>) => {
                if (showNotifications) {
                    showNotification({
                        mainProps: {
                            type: "success",
                            message: "Door successfully deleted",
                        },
                    });
                }
                return response;
            })
            .catch((err) => {
                if (showNotifications) {
                    showAxiosNotificationError(err);
                }
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
                if (data.error) {
                    showNotification({
                        mainProps: {
                            type: "error",
                            message: data.error,
                        },
                    });
                } else {
                    this.setOrderPrice(data);
                }
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
