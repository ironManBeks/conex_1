import { THEX } from "@globalTypes/commonTypes";

export type TBuilderCompProps = {
    pageClassPrefix: string;
};

export enum EBuilderFieldTypes {
    card = "card",
    checkbox = "checkbox",
    colorPicker = "colorPicker",
    radioButton = "radioButton",
    radio = "radio",
}

export type TBuilderElementComp = {
    onClick?: (value: string) => void;
    isActive?: boolean;
    fieldValue: string;
};

export interface IBuilderElementBase {
    id: string;
    value: string;
    title: string;
    popular?: boolean;
    disabled?: boolean;
    className?: string;
}

export interface IBuilderElementCardProps extends IBuilderElementBase {
    subTitle: string;
    imgSrc: string;
    price: string;
    currency: string;
}

export interface IBuilderElementCheckboxProps extends IBuilderElementBase {
    default?: boolean;
}

export interface IBuilderElementColorPickerProps extends IBuilderElementBase {
    color: THEX;
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
    | TReferenceProps<EBuilderFieldTypes.checkbox, IBuilderElementCheckboxProps>
    | TReferenceProps<
          EBuilderFieldTypes.colorPicker,
          IBuilderElementColorPickerProps
      >
    | TReferenceProps<EBuilderFieldTypes.radio>
    | TReferenceProps<EBuilderFieldTypes.radioButton>;

export type TBuilderFieldBase = {
    id: string;
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

export type TBuilderStep = {
    stepId: string;
    stepTitle?: string;
    stepDescription?: string;
    fields: TBuilderFieldBase[];
};
