import { makeAutoObservable, observable } from "mobx";

import { ICommonStore } from "./types";

export class CommonStore implements ICommonStore {
    headerHeight = 0;
    urlParams = {};

    constructor() {
        makeAutoObservable(this, {
            headerHeight: observable,
            urlParams: observable,
        });
    }

    setHeaderHeight = (value: number): void => {
        this.headerHeight = value;
    };

    setUlParams = (value: Record<string, string>): void => {
        this.urlParams = value;
    };
}
