import { TNullable } from "@globalTypes/commonTypes";

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
    subTitle: TNullable<string>;
    value: string;
    popular: boolean;
    price: number;
    priceCurrency: string;
    image?: {
        alt: TNullable<string>;
        url: TNullable<string>;
    };
    nextQuestion: TNullable<number>;
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
    builderData: TNullable<TBuilderDTO>;
    builderDataFetching: boolean;
    currentStepData: TNullable<TBuilderStepDataDTO>;
    currentStepId: TNullable<number>;
    stepHistory: number[];
    stepQueue: number[];
    resultDoorData: TResultDoorData;
    endDoorData: TResultDoorData;
    // functions
    getBuilderData: () => Promise<void>;
    setBuilderData: (data: TBuilderDTO) => void;
    setBuilderDataFetching: (value: boolean) => void;
    setCurrentStepData: (data: TNullable<TBuilderStepDataDTO>) => void;
    setCurrentStepId: (value: TNullable<number>) => void;
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
    setEndDoorData: (data: TResultDoorData) => void;
}
