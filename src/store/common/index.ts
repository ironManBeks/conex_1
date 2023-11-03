import { makeAutoObservable } from "mobx";

import { ICommonStore, TUrlParams } from "./types";
import { TNullable } from "@globalTypes/commonTypes";
import axiosInstance from "../../api/api";
import { AxiosResponse } from "axios";
import { showNotification } from "@helpers/notificarionHelper";
import { showAxiosNotificationError } from "@helpers/errorsHelper";

export class CommonStore implements ICommonStore {
    headerHeight = 0;
    headerVisible = true;
    urlParams: TUrlParams = {};
    // Modals and Drawers
    confirmModalData: TNullable<unknown> = null;
    modalConfirmVisible = false;
    modalAuthVisible = false;
    modalCustomQuoteVisible = false;
    modalCardBindingVisible = false;
    modalMapPickupVisible = false;
    headerDrawerVisible = false;
    builderDrawerVisible = false;
    newsSubscriptionFetching = false;

    constructor() {
        makeAutoObservable(this);
    }

    setHeaderHeight = (value: number): void => {
        this.headerHeight = value;
    };

    setHeaderVisible = (value: boolean): void => {
        this.headerVisible = value;
    };

    setNewsSubscriptionFetching = (value: boolean): void => {
        this.newsSubscriptionFetching = value;
    };

    // ToDo доработать
    //  ***____***____***____
    //  ***____ URL Params
    //  ***____***____***____
    setUrlParams = (value: TUrlParams): void => {
        this.urlParams = { ...this.urlParams, ...value };
    };

    getUrlParams = (list: string[]): TUrlParams => {
        let result: TUrlParams = {};
        for (let i = 0; i < list.length; i++) {
            if (Object.getOwnPropertyDescriptor(this.urlParams, list[i])) {
                result = { ...result, [list[i]]: this.urlParams[list[i]] };
            }
        }
        return result;
    };

    removeUrlParams = (list: string[]): void => {
        for (let i = 0; i < list.length; i++) {
            delete this.urlParams[list[i]];
        }
    };

    // -------------------------------------------------------------------------------
    //  ***____ Modals and Drawers
    //  ***____***____***____

    setConfirmModalData = (confirmModalData: TNullable<unknown>): void => {
        this.confirmModalData = confirmModalData;
    };

    setModalConfirmVisible = (value: boolean): void => {
        this.modalConfirmVisible = value;
    };

    setModalAuthVisible = (value: boolean): void => {
        this.modalAuthVisible = value;
    };

    setModalCustomQuoteVisible = (value: boolean): void => {
        this.modalCustomQuoteVisible = value;
    };

    setModalCardBindingVisible = (value: boolean): void => {
        this.modalCardBindingVisible = value;
    };

    setModalMapPickupVisible = (value: boolean): void => {
        this.modalMapPickupVisible = value;
    };

    setHeaderDrawerVisible = (value: boolean): void => {
        this.headerDrawerVisible = value;
    };

    setBuilderDrawerVisible = (value: boolean): void => {
        this.builderDrawerVisible = value;
    };

    //  ***____***____***____
    //  ***____ END Modals and Drawers
    // -------------------------------------------------------------------------------

    newsSubscriptionRequest = (value: string): Promise<void> => {
        this.setNewsSubscriptionFetching(true);
        return axiosInstance
            .post("/newsSubscription", { email: value })
            .then((data: AxiosResponse<{ ok: boolean }>) => {
                console.log("forgotPasswordRequest", data);
                showNotification({
                    mainProps: {
                        type: "success",
                        message:
                            "You have successfully subscribed to the newsletter",
                    },
                });
            })
            .catch((err) => {
                showAxiosNotificationError(err);
                throw err;
            })
            .finally(() => {
                this.setNewsSubscriptionFetching(false);
            });
    };
}
