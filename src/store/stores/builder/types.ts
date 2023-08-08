import { TBuilderStep } from "@components/pages/BuilderPage/types";

export type TCreatingDoorData = Record<
    string,
    string | string[] | number
> | null;

export enum EStepPosition {
    start = "start",
    end = "end",
    confirm = "confirm",
}

export interface IBuilderStore {
    builderData: TBuilderStep[] | null;
    builderDataFetching: boolean;
    currentStepData: TBuilderStep | null;
    passedSteps: string[];
    creatingDoorData: TCreatingDoorData;
    // functions
    getBuilderData: () => void;
    setBuilderData: (data: TBuilderStep[]) => void;
    setBuilderDataFetching: (value: boolean) => void;
    setCurrentStepData: (data: TBuilderStep | null) => void;
    updateCurrentStepData: (way: "next" | "back" | "start") => void;
    getCurrentStepIndex: () => number | undefined;
    setPassedStep: (data: string[]) => void;
    addPassedStep: (value: string) => void;
    removePassedStep: (value: string, removeLast?: boolean) => void;
    getStepPosition: () => EStepPosition | undefined;
    setCreatingDoorData: (data: TCreatingDoorData) => void;
}
