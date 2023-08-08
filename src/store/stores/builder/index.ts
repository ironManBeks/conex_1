import { makeAutoObservable, observable } from "mobx";
import { isEmpty, isNil } from "lodash";

import { BuilderDataMockup } from "../../../mockups/BuilderStepsMockup";

import { TBuilderStep } from "@components/pages/BuilderPage/types";
import { EStepPosition, IBuilderStore, TCreatingDoorData } from "./types";

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

    getCurrentStepIndex = (): number | undefined => {
        return this.builderData?.findIndex(
            (step) => step.stepId === this.currentStepData?.stepId,
        );
    };

    updateCurrentStepData = (way: "next" | "back" | "start"): void => {
        if (!this.builderData) return;
        const currentStepIndex = this.getCurrentStepIndex() || 0;
        if (way === "start") {
            this.setCurrentStepData(this.builderData[0]);
            return;
        }

        if (way === "next" && !isEmpty(this.currentStepData)) {
            const nextPage = this.builderData[currentStepIndex + 1];
            this.addPassedStep(this.currentStepData.stepId);
            this.setCurrentStepData(nextPage);
            return;
        }

        if (way === "back") {
            if (!isEmpty(this.currentStepData)) {
                const prevPage = this.builderData[currentStepIndex - 1];
                this.removePassedStep("", true);
                this.setCurrentStepData(prevPage);
                return;
            }
            if (!isEmpty(this.creatingDoorData)) {
                const prevPage = this.builderData[this.builderData.length - 1];
                this.removePassedStep("", true);
                this.setCurrentStepData(prevPage);
                this.setCreatingDoorData(null);
                return;
            }
        }
    };

    setPassedStep = (data: string[]): void => {
        this.passedSteps = data;
    };

    addPassedStep = (value: string): void => {
        if (value && value !== this.passedSteps[this.passedSteps.length - 1]) {
            this.setPassedStep([...this.passedSteps, value]);
        }
    };
    removePassedStep = (value: string, removeLast?: boolean): void => {
        if (removeLast) {
            const result = [...this.passedSteps].slice(0, -1);
            this.setPassedStep(result);
        }
    };

    getStepPosition = (): EStepPosition | undefined => {
        const currentStepIndex = this.getCurrentStepIndex();
        if (isNil(currentStepIndex)) return undefined;

        if (this.builderData) {
            if (currentStepIndex + 1 === this.builderData.length) {
                return EStepPosition.end;
            } else if (
                this.currentStepData &&
                this.getCurrentStepIndex() === 0
            ) {
                return EStepPosition.start;
            } else if (!isEmpty(this.creatingDoorData)) {
                return EStepPosition.confirm;
            }
        }
        return undefined;
    };

    setCreatingDoorData = (data: TCreatingDoorData): void => {
        this.creatingDoorData = data;
    };
}
