import { THEX, TNullable } from "@globalTypes/commonTypes";
import {
    EBuilderFieldTypes,
    IBuilderElementDataDTO,
    TBuilderStepDataDTO,
} from "@store/builder/types";
import { TStore } from "@globalTypes/storeTypes";

export type TBuilderCompProps = {
    pageClassPrefix: string;
} & TStore;

export type TBuilderElementComp = {
    onClick?: (value: string) => void;
    isActive?: boolean;
    fieldName: string;
};

export interface IBuilderElementBase extends IBuilderElementDataDTO {
    className?: string;
}

export interface IBuilderElementCardProps extends IBuilderElementBase {
    imgSrc?: TNullable<string>;
}

export type TReferenceProps<
    T extends EBuilderFieldTypes,
    E extends IBuilderElementBase = IBuilderElementBase,
> = {
    type: T;
    elements: E[];
};

export type TBuilderElements =
    | TReferenceProps<EBuilderFieldTypes.card, IBuilderElementCardProps>
    | TReferenceProps<EBuilderFieldTypes.checkbox>
    | TReferenceProps<EBuilderFieldTypes.colorPicker>
    | TReferenceProps<EBuilderFieldTypes.radio>
    | TReferenceProps<EBuilderFieldTypes.radioButton>;

export type TBuilderStepBase = {
    className?: string;
} & TStore;
