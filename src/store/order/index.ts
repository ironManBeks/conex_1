import { makeAutoObservable } from "mobx";
import { AxiosResponse } from "axios";

import {
    IOrderStore,
    TCreateDoorRequest,
    TCreateDoorResponse,
    TCreateOrderRequest,
    TGetDoorsDataResponse,
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

    // -------------------------------------------------------------------------------

    getDoorsData = (): Promise<AxiosResponse<TGetDoorsDataResponse>> => {
        this.setDoorsDataFetching(true);
        return axiosInstance
            .get("/doors")
            .then((data: AxiosResponse<TGetDoorsDataResponse>) => {
                this.setDoorsData(data.data);
                return data;
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
        data: TCreateDoorRequest,
    ): Promise<AxiosResponse<TCreateDoorResponse>> => {
        this.setCreateDoorRequestFetching(true);
        return axiosInstance
            .post("/doors", { data: data })
            .then((data: AxiosResponse<TCreateDoorResponse>) => {
                return data;
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
            .then((data: AxiosResponse) => {
                return data;
            })
            .catch((err) => {
                showAxiosNotificationError(err);
                throw err;
            })
            .finally(() => {
                this.setDeleteDoorRequestFetching(false);
            });
    };

    createOrderRequest = (data: TCreateOrderRequest) => {
        this.setCreateOrderRequestFetching(true);
        return axiosInstance
            .post("/orders", { data: data })
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
