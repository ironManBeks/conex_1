import { makeAutoObservable, observable } from "mobx";

import { ICommonStore } from "./types";

export class CommonStore implements ICommonStore {
    headerHeight = 0;

    constructor() {
        makeAutoObservable(this, {
            headerHeight: observable,
        });
    }

    setHeaderHeight = (value: number): void => {
        this.headerHeight = value;
    };
}
