import { TNullable } from "@globalTypes/commonTypes";

export enum EBuilderFieldTypes {
    card = "card",
    checkbox = "checkbox",
    colorPicker = "colorPicker",
    radioButton = "radioButton",
    radio = "radio",
    multiple = "multiple",
}

export interface IBuilderElementDataDTO {
    subfieldName: TNullable<string>;
    id: number;
    mainTitle: string;
    subTitle: TNullable<string>;
    value: string;
    price: number;
    priceCurrency: string;
    popular: boolean;
    default: boolean;
    image?: {
        alt: TNullable<string>;
        url: TNullable<string>;
    };
    nextQuestion: TNullable<number>;
}

export interface IBuilderFieldDataDTO {
    id: number;
    fieldTitle: string;
    fieldType: EBuilderFieldTypes;
    subfieldName: TNullable<string>;
    questions: IBuilderElementDataDTO[];
}

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
        subQuestions: IBuilderElementDataDTO[] | IBuilderFieldDataDTO[];
        nextQuestion: TNullable<number>;
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

export type TResultDoorData = {
    stepId: number;
    stepTitle: string;
    stepType: EBuilderFieldTypes;
    fields: {
        fieldName: string | null;
        fieldTitle: string | null;
        fieldType: EBuilderFieldTypes;
        elements: IBuilderElementDataDTO[];
    }[];
};

export interface IBuilderStore {
    builderData: TNullable<TBuilderDTO>;
    builderDataFetching: boolean;
    currentStepData: TNullable<TBuilderStepDataDTO>;
    currentStepId: TNullable<number>;
    stepHistory: number[];
    stepQueue: number[];
    resultDoorData: TNullable<TResultDoorData[]>;
    endDoorData: TNullable<TResultDoorData[]>;
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
    setResultDoorData: (data: TNullable<TResultDoorData[]>) => void;
    setEndDoorData: (data: TNullable<TResultDoorData[]>) => void;
}
