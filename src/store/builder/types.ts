import { THEX, TNullable } from "@globalTypes/commonTypes";
import { AxiosResponse } from "axios";
import { TResponseMeta } from "@globalTypes/requestTypes";
import { TGetNextStepResult } from "@helpers/builderHelper";

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
    color?: THEX;
    nextQuestion: TNullable<number>;
}

export interface IBuilderFieldDataDTO {
    id: number;
    fieldTitle: string;
    fieldType: EBuilderFieldTypes;
    subfieldName: TNullable<string>;
    fieldWidth: number;
    required: true;
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

export type TStepHistoryActions =
    | "add-to-end"
    | "add-to-start"
    | "remove"
    | "clear";

export type TStepQueueActions =
    | "add-to-start"
    | "add-to-end"
    | "remove"
    | "clear";

export type TStepPath = number | number[] | null | undefined;

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

export type TGetBuilderAllDataResponse = {
    data: TBuilderStepDataDTO[];
} & TResponseMeta;

export type TGetBuilderSettingsResponse = {
    data: {
        quizStartId: number;
    };
} & TResponseMeta;

export type TGetBuilderParamsDataParams = {
    parent?: number;
};

export type TGetBuilderParamsDataResponse = {
    data?: TBuilderStepDataDTO[];
    filteredData?: TBuilderStepDataDTO[];
};

export type TUpdateCurrentStepWay =
    | "main-step"
    | { action: "start-way"; parentId: number; nextStep: TGetNextStepResult } // second step -> feature way
    | "prev"
    | number;

export interface IBuilderStore {
    builderAllData: TNullable<TGetBuilderAllDataResponse>;
    builderAllDataFetching: boolean;
    //
    builderParamsData: TNullable<TGetBuilderParamsDataResponse>;
    builderParamsDataFetching: boolean;
    //
    builderSettings: TNullable<TGetBuilderSettingsResponse>;
    builderSettingsFetching: boolean;
    // not request
    currentStepData: TNullable<TBuilderStepDataDTO>;
    currentStepId: TNullable<number>;
    stepHistory: number[];
    stepQueue: number[];
    resultDoorData: TNullable<TResultDoorData[]>;
    endDoorData: TNullable<TResultDoorData[]>;
    //______________________
    // functions
    getBuilderAllData: () => Promise<AxiosResponse<TGetBuilderAllDataResponse>>;
    setBuilderAllData: (data: TNullable<TGetBuilderAllDataResponse>) => void;
    setBuilderAllDataFetching: (value: boolean) => void;
    //
    getBuilderParamsData: (
        params: TGetBuilderParamsDataParams,
    ) => Promise<AxiosResponse<TGetBuilderParamsDataResponse>>;
    setBuilderParamsData: (
        data: TNullable<TGetBuilderParamsDataResponse>,
    ) => void;
    setBuilderParamsDataFetching: (value: boolean) => void;
    //
    getBuilderSettings: () => Promise<
        AxiosResponse<TGetBuilderSettingsResponse>
    >;
    setBuilderSettings: (data: TNullable<TGetBuilderSettingsResponse>) => void;
    setBuilderSettingsFetching: (value: boolean) => void;
    //______________________
    // not request
    setCurrentStepData: (data: TNullable<TBuilderStepDataDTO>) => void;
    setCurrentStepId: (value: TNullable<number>) => void;
    updateCurrentStepData: (
        value: TUpdateCurrentStepWay,
        changeQueue?: boolean,
    ) => void;
    setStepHistory: (
        stepId: TStepPath,
        action: TStepHistoryActions | undefined,
    ) => void;
    setStepQueue: (
        stepId: TStepPath,
        action: TStepQueueActions | undefined,
    ) => void;
    setResultDoorData: (data: TNullable<TResultDoorData[]>) => void;
    setEndDoorData: (data: TNullable<TResultDoorData[]>) => void;
    setDefaultValuesToBuilder: (
        history: number[],
        queue: number[],
        result: TResultDoorData[],
        stepId: number,
        parentId: number,
    ) => void;
    resetAllBuilderData: (withUpdateData?: boolean) => void;
}
