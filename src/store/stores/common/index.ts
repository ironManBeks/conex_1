import { makeAutoObservable, observable } from "mobx";

import { ICommonStore } from "./types";

export class CommonStore implements ICommonStore {
    headerHeight = 0;
    urlParams = {};
    modalConfirmToDeleteVisible = false;

    constructor() {
        makeAutoObservable(this, {
            headerHeight: observable,
            urlParams: observable,
            modalConfirmToDeleteVisible: observable,
        });
    }

    setHeaderHeight = (value: number): void => {
        this.headerHeight = value;
    };

    setUlParams = (value: Record<string, string>): void => {
        this.urlParams = value;
    };

    setModalConfirmToDeleteVisible = (value: boolean): void => {
        this.modalConfirmToDeleteVisible = value;
    };
}
