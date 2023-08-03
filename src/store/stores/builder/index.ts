import { makeAutoObservable, observable } from "mobx";
import { IBuilderStore } from "./types";
import { TBuilderStep } from "@components/pages/BuilderPage/types";

export class BuilderStore implements IBuilderStore {
    builderData: any = null;
    builderDataFetching = true;

    constructor() {
        makeAutoObservable(this, {
            builderData: observable,
            builderDataFetching: observable,
        });
    }

    setBuilderData = (data: any): void => {
        this.builderData = data;
    };

    getBuilderData = (): void => {
        setTimeout(() => {
            this.setBuilderData({ data: "123" });
            this.setBuilderDataFetching(false);
        }, 1000);
    };

    setBuilderDataFetching = (value: boolean): void => {
        this.builderDataFetching = value;
    };
}
