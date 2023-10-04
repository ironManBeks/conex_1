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
    required: boolean | null;
    image?: {
        alt: TNullable<string>;
        url: TNullable<string>;
    };
    color?: THEX | null;
    nextQuestion: TNullable<number>;
}

export interface IBuilderFieldDataDTO {
    id: number;
    fieldTitle: string;
    fieldTitleSize: "small" | "big";
    fieldType: EBuilderFieldTypes;
    subfieldName: TNullable<string>;
    fieldWidth: number;
    required: boolean;
    questions: IBuilderElementDataDTO[];
}

export type TBuilderBranch = {
    doorType: number;
    next: number;
};

export type TBuilderStepDataDTO = {
    id: number;
    attributes: {
        branching: TBuilderBranch[];
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
    | "replace"
    | "clear";

export type TStepQueueActions =
    | "add-to-start"
    | "add-to-end"
    | "remove"
    | "clear";

export type TBuilderCartActions =
    | "add-to-start"
    | "add-to-end"
    | {
          id: string | string[];
          action: "remove";
      }
    | "update"
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
        lastUpdate: string;
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

export type TCartItem = {
    doorId: string;
    doorData: TResultDoorData[];
    history: number[];
    builderParentId: number;
};

export type TBuilderCartData = {
    elements: TCartItem[];
};

export type TEditBuilderCartItemData = TCartItem;

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
    builderCartData: TNullable<TBuilderCartData>;
    editBuilderCartItemData: TNullable<TEditBuilderCartItemData>;
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
        changeHistory?: boolean,
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
    resetBuilderFormData: (withUpdateData?: boolean) => void;
    setBuilderCartData: (data: TNullable<TBuilderCartData>) => void;
    setElementsToBuilderCard: (
        data: TCartItem[] | undefined,
        action: TBuilderCartActions | undefined,
    ) => void;
    setEditBuilderCartItemData: (
        data: TNullable<TEditBuilderCartItemData>,
    ) => void;
}
