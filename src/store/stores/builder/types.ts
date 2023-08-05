import { TBuilderStep } from "@components/pages/BuilderPage/types";

export interface IBuilderStore {
    builderData: TBuilderStep[] | null;
    getBuilderData: () => void;
    setBuilderData: (data: TBuilderStep[]) => void;
    builderDataFetching: boolean;
    setBuilderDataFetching: (value: boolean) => void;
    passedSteps: string[];
    getCurrentStepData: () => TBuilderStep | null;
    setPassedStep: (value: string) => void;
}
