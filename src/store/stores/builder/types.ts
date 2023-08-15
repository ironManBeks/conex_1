export enum EBuilderFieldTypes {
    card = "card",
    checkbox = "checkbox",
    colorPicker = "colorPicker",
    radioButton = "radioButton",
    radio = "radio",
}

export type TBuilderElementDataDTO = {
    id: number;
    mainTitle: string;
    subTitle: string | null;
    value: string;
    popular: boolean;
    price: number;
    priceCurrency: string;
    nextQuestion: number | null;
};

export type TBuilderStepDataDTO = {
    id: number;
    attributes: {
        fieldType: EBuilderFieldTypes;
        fieldName: string;
        fieldTitle: string;
        fieldTitleSize: "small" | "big";
        fieldRequired: boolean;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
        fieldElements: TBuilderElementDataDTO[];
    };
};

export type TBuilderDTO = {
    data: TBuilderStepDataDTO[];
    meta: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
        date: number;
    };
};

export type TStepHistoryActions = "add" | "remove" | "clear";

export type TStepQueueActions = "add" | "remove" | "clear";

export type TResultDoorData = Record<string, string | string[] | number> | null;

export interface IBuilderStore {
    builderData: TBuilderDTO | null;
    builderDataFetching: boolean;
    currentStepData: TBuilderStepDataDTO | null;
    currentStepId: number | null;
    stepHistory: number[];
    stepQueue: number[];
    resultDoorData: TResultDoorData;
    // functions
    getBuilderData: () => Promise<void>;
    setBuilderData: (data: TBuilderDTO) => void;
    setBuilderDataFetching: (value: boolean) => void;
    setCurrentStepData: (data: TBuilderStepDataDTO | null) => void;
    setCurrentStepId: (value: number | null) => void;
    updateCurrentStepData: (value: "start" | "prev" | number) => void;
    setStepHistory: (
        stepId: number | undefined,
        action: TStepHistoryActions | undefined,
    ) => void;
    setStepQueue: (
        stepId: number | undefined | number[],
        action: TStepQueueActions | undefined,
    ) => void;
    setResultDoorData: (data: TResultDoorData) => void;
}
