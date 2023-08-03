import { CSSProperties } from "react";
import { THEX } from "@globalTypes/commonTypes";

export type TBuilderRightSide = {
    pageClassPrefix: string;
};

export type TBuilderProgress = {
    pageClassPrefix: string;
};

export enum EBuilderFieldTypes {
    card = "card",
    checkbox = "checkbox",
    colorPicker = "colorPicker",
    radioButton = "radioButton",
    radio = "radio",
}

export type TBuilderElement = {
    id: string;
    value: string;
    title: string;
    popular?: boolean;
    disabled?: boolean;
    className?: string;
    onClick: (value: string) => void;
};

// EBuilderFieldTypes.card
export type TBuilderElementCard = {
    subTitle: string;
    imgSrc: string;
    price: string;
    currency: string;
} & TBuilderElement;

// EBuilderFieldTypes.checkbox
export type TBuilderElementCheckbox = {
    default?: boolean;
} & TBuilderElement;

// EBuilderFieldTypes.colorPicker
export type TBuilderElementColorPicker = {
    color: THEX;
} & TBuilderElement;

// EBuilderFieldTypes.radioButton
export type TBuilderElementRadioButton = TBuilderElement;

// EBuilderFieldTypes.radioButton
export type TBuilderElementRadio = TBuilderElement;

export type TBuilderField = {
    id: string;
    type: EBuilderFieldTypes;
    value: string;
    title?: string;
    titleSize?: "big" | "small";
    isRequired?: boolean;
    className?: string;
} & TBuilderElements &
    TBuilderOpportunity;

export type TBuilderOpportunity = {
    opportunity?: {
        description: string;
        value: string;
        isRequired?: boolean;
        position: "left" | "center" | "right";
    };
};

export type TBuilderElements = {
    elements:
        | TBuilderElementCard[]
        | TBuilderElementCheckbox[]
        | TBuilderElementColorPicker[]
        | TBuilderElementRadioButton[]
        | TBuilderElementRadio[];
};

export type TBuilderStepLayout = {
    pageClassPrefix: string;
};

export type TBuilderStep = {
    id: string;
    title?: string;
    description?: string;
    fields: TBuilderField[];
};

export type TBuilderStepActions = {
    pageClassPrefix: string;
    onBackClick: () => void;
    onNextClick: () => void;
};
