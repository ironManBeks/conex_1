import { makeAutoObservable, observable } from "mobx";

import { ICommonStore } from "./types";

export class CommonStore implements ICommonStore {
    headerHeight = 0;
    urlParams = {};
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

    setUlParams = (value: Record<string, string>): void => {
        this.urlParams = value;
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
