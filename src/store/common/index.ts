import { action, makeAutoObservable, observable } from "mobx";

import { ICommonStore, TUrlParams } from "./types";

export class CommonStore implements ICommonStore {
    headerHeight = 0;
    urlParams: TUrlParams = {};
    // Modals and Drawers
    // ToDo remove type any
    confirmModalData: any = null;
    modalConfirmVisible = false;
    modalAuthVisible = false;
    modalCustomQuoteVisible = false;
    headerDrawerVisible = false;

    constructor() {
        makeAutoObservable(this, {
            headerHeight: observable,
            urlParams: observable,
            // Modals and Drawers
            confirmModalData: observable,
            modalConfirmVisible: observable,
            modalAuthVisible: observable,
            modalCustomQuoteVisible: observable,
            headerDrawerVisible: observable,
            // Functions
            setConfirmModalData: action,
            setModalConfirmVisible: action,
            setModalAuthVisible: action,
            setModalCustomQuoteVisible: action,
            setHeaderDrawerVisible: action,
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
    //  ***____ Modals and Drawers
    // ***____***____***____
    // ToDo remove type any
    setConfirmModalData = (confirmModalData: any): void => {
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

    setHeaderDrawerVisible = (value: boolean): void => {
        this.headerDrawerVisible = value;
    };
    //  ***____***____***____
    //  ***____ END Modals and Drawers
    // ***____***____***____
}
