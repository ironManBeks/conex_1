import { makeAutoObservable, observable } from "mobx";
import { useRouter } from "next/router";

import { ICommonStore, TUrlParams } from "./types";

export class CommonStore implements ICommonStore {
    headerHeight = 0;
    urlParams: TUrlParams = {};
    // Modals
    modalConfirmVisible = false;
    modalAuthVisible = false;
    modalCustomQuoteVisible = false;

    constructor() {
        makeAutoObservable(this, {
            headerHeight: observable,
            urlParams: observable,
            // Modals
            modalConfirmVisible: observable,
            modalAuthVisible: observable,
            modalCustomQuoteVisible: observable,
        });
    }

    setHeaderHeight = (value: number): void => {
        this.headerHeight = value;
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

    //  ***____***____***____
    //  ***____ Modals
    // ***____***____***____
    setModalConfirmVisible = (value: boolean): void => {
        this.modalConfirmVisible = value;
    };

    setModalAuthVisible = (value: boolean): void => {
        this.modalAuthVisible = value;
    };

    setModalCustomQuoteVisible = (value: boolean): void => {
        this.modalCustomQuoteVisible = value;
    };
    //  ***____***____***____
    //  ***____ END Modals
    // ***____***____***____
}
