import { TBuilderStep } from "@components/pages/BuilderPage/types";

export type TCreatingDoorData = Record<
    string,
    string | string[] | number
> | null;

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
    setPassedStep: (value: string) => void;
    getStepWay: () => "start" | "end" | undefined;
    setCreatingDoorData: (data: TCreatingDoorData) => void;
}
