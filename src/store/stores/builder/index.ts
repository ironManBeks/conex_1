import { TBuilderStep } from "@components/pages/BuilderPage/types";
import { makeAutoObservable, observable } from "mobx";

import { BuilderDataMockup } from "../../../mockups/BuilderStepsMockup";

import { IBuilderStore } from "./types";
import { isEmpty } from "lodash";

export class BuilderStore implements IBuilderStore {
    builderData: TBuilderStep[] | null = null;
    builderDataFetching = true;
    passedSteps: string[] = [];

    constructor() {
        makeAutoObservable(this, {
            builderData: observable,
            builderDataFetching: observable,
            passedSteps: observable,
        });
    }

    setBuilderData = (data: TBuilderStep[]): void => {
        this.builderData = data;
    };

    getBuilderData = (): void => {
        setTimeout(() => {
            this.setBuilderData(BuilderDataMockup);
            this.setBuilderDataFetching(false);
        }, 500);
    };

    setBuilderDataFetching = (value: boolean): void => {
        this.builderDataFetching = value;
    };

    getCurrentStepData = (): TBuilderStep | null => {
        const currentStepId = this.passedSteps[this.passedSteps.length];
        const result = this.builderData?.find(
            (item) => item.stepId === currentStepId,
        );
        if (!isEmpty(result)) {
            return result;
        }
        return null;
        // return this.passedSteps[this.passedSteps.length];
    };

    setPassedStep = (value: string): void => {
        this.passedSteps.push(value);
    };
}
