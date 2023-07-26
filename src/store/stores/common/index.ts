import { makeAutoObservable, observable } from "mobx";

import { ICommonStore } from "./types";

export class CommonStore implements ICommonStore {
    headerHeight = 0;
    urlParams = {};
    // Modals
    modalConfirmToDeleteVisible = false;
    modalAuthVisible = false;

    constructor() {
        makeAutoObservable(this, {
            headerHeight: observable,
            urlParams: observable,
            // Modals
            modalConfirmToDeleteVisible: observable,
            modalAuthVisible: observable,
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
    setModalConfirmToDeleteVisible = (value: boolean): void => {
        this.modalConfirmToDeleteVisible = value;
    };

    setModalAuthVisible = (value: boolean): void => {
        this.modalAuthVisible = value;
    };
    //  ***____***____***____
    //  ***____ END Modals
    // ***____***____***____
}
