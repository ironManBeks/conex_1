import { makeAutoObservable } from "mobx";
import { AxiosResponse } from "axios";

import {
    IOrderStore,
    TCreateDoorRequest,
    TCreateDoorResponse,
    TCreateOrderCartRequest,
    TCreateOrderCartResponse,
    TCreateOrderRequest,
    TDeleteDoorResponse,
    TGetDoorsDataResponse,
    TGetDoorsRequest,
    TGetOrderCartRequest,
    TGetOrderCartResponse,
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
    orderCart: TNullable<TGetOrderCartResponse> = null;
    orderCartFetching = false;
    orderCartParams: TNullable<TGetOrderCartRequest> = null;

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

    setOrderCart = (data: TNullable<TGetOrderCartResponse>): void => {
        this.orderCart = data;
    };

    setOrderCartFetching = (value: boolean): void => {
        this.orderCartFetching = value;
    };

    setOrderCartParams = (data: TNullable<TGetOrderCartRequest>): void => {
        this.orderCartParams = data;
    };

    // -------------------------------------------------------------------------------

    getDoorsData = (
        params: TGetDoorsRequest,
    ): Promise<AxiosResponse<TGetDoorsDataResponse>> => {
        this.setDoorsDataFetching(true);
        return axiosInstance
            .get("/doors", { params })
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
        ids: number[],
        showNotifications?: boolean,
    ): Promise<AxiosResponse<TDeleteDoorResponse>> => {
        this.setDeleteDoorRequestFetching(true);
        return axiosInstance
            .post("/doors/bulk-delete", { ids })
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

    getOrderCart = (
        cartId?: number,
    ): Promise<AxiosResponse<TGetOrderCartResponse>> => {
        this.setOrderCartFetching(true);
        const cartIdParam = cartId ? `/${cartId}` : "";
        return axiosInstance
            .get(`/order/cart${cartIdParam}`)
            .then((response: AxiosResponse<TGetOrderCartResponse>) => {
                const { data } = response;
                if (data.error && data.error !== "Cart is empty") {
                    showNotification({
                        mainProps: {
                            type: "error",
                            message: data.error,
                        },
                    });
                    this.setOrderCart(null);
                }
                if (!data.error) {
                    this.setOrderCart(data);
                }
                return response;
            })
            .catch((err) => {
                showAxiosNotificationError(err);
                throw err;
            })
            .finally(() => {
                this.setOrderCartFetching(false);
            });
    };

    deleteOrderCart = (
        cartId: number,
    ): Promise<AxiosResponse<TGetOrderCartResponse>> => {
        this.setOrderCartFetching(true);
        return axiosInstance
            .delete(`/carts/${cartId}`, { headers: { Authorization: "false" } })
            .then((response: AxiosResponse<TGetOrderCartResponse>) => {
                const { data } = response;
                if (data.error) {
                    showNotification({
                        mainProps: {
                            type: "error",
                            message: data.error,
                        },
                    });
                } else {
                    this.setOrderCart(null);
                    this.setDoorsData(null);
                }
                return response;
            })
            .catch((err) => {
                showAxiosNotificationError(err);
                console.log({ err });
                throw err;
            })
            .finally(() => {
                this.setOrderCartFetching(false);
            });
    };

    createOrderCart = (
        params: TCreateOrderCartRequest,
    ): Promise<AxiosResponse<TCreateOrderCartResponse>> => {
        this.setOrderCartFetching(true);
        return axiosInstance
            .post("/order/cart", params)
            .then((response: AxiosResponse<TCreateOrderCartResponse>) => {
                const { data } = response;
                if (data.error) {
                    showNotification({
                        mainProps: {
                            type: "error",
                            message: data.error,
                        },
                    });
                }
                return response;
            })
            .catch((err) => {
                showAxiosNotificationError(err);
                throw err;
            })
            .finally(() => {
                this.setOrderCartFetching(false);
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
