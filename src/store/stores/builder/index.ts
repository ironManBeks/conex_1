import { TBuilderStep } from "@components/pages/BuilderPage/types";
import { makeAutoObservable, observable, toJS } from "mobx";

import { BuilderDataMockup } from "../../../mockups/BuilderStepsMockup";

import { IBuilderStore, TCreatingDoorData } from "./types";
import { isEmpty } from "lodash";

export class BuilderStore implements IBuilderStore {
    builderData: TBuilderStep[] | null = null;
    builderDataFetching = true;
    currentStepData: TBuilderStep | null = null;
    creatingDoorData: TCreatingDoorData = {};
    passedSteps: string[] = [];

    constructor() {
        makeAutoObservable(this, {
            builderData: observable,
            builderDataFetching: observable,
            currentStepData: observable,
            passedSteps: observable,
            creatingDoorData: observable,
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

    setCurrentStepData = (data: TBuilderStep | null): void => {
        this.currentStepData = data;
    };

    updateCurrentStepData = (way: "next" | "back" | "start"): void => {
        if (!this.builderData) return;
        if (way === "start") {
            this.setCurrentStepData(this.builderData[0]);
            return;
        }

        if (way === "next" && !isEmpty(this.currentStepData)) {
            const currentStepIndex = this.builderData?.findIndex(
                (step) => step.stepId === this.currentStepData?.stepId,
            );
            const nextPage = this.builderData[currentStepIndex + 1];
            this.setCurrentStepData(nextPage);
            return;
        }

        if (way === "back" && !isEmpty(this.currentStepData)) {
            const currentStepIndex = this.builderData?.findIndex(
                (step) => step.stepId === this.currentStepData?.stepId,
            );
            const prevPage = this.builderData[currentStepIndex - 1];
            this.setCurrentStepData(prevPage);
            return;
        }
    };

    setPassedStep = (value: string): void => {
        if (value && value !== this.passedSteps[this.passedSteps.length - 1]) {
            this.passedSteps = [...this.passedSteps, value];
        }
    };

    getStepWay = (): "start" | "end" | undefined => {
        if (this.builderData) {
            if (
                this.passedSteps[this.passedSteps.length - 1] ===
                this.builderData[this.builderData?.length - 1].stepId
            ) {
                return "end";
            } else if (
                this.currentStepData &&
                this.builderData[0].stepId === this.currentStepData.stepId
            ) {
                return "start";
            } else return undefined;
        }
        return undefined;
    };

    setCreatingDoorData = (data: TCreatingDoorData): void => {
        this.creatingDoorData = data;
    };
}
