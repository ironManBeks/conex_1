import { THEX } from "@globalTypes/commonTypes";
import {
    EBuilderFieldTypes,
    TBuilderElementDataDTO,
    TBuilderStepDataDTO,
} from "@store/stores/builder/types";

export type TBuilderCompProps = {
    pageClassPrefix: string;
};

export type TBuilderElementComp = {
    onClick?: (value: string) => void;
    isActive?: boolean;
    fieldName: string;
};

export interface IBuilderElementBase extends TBuilderElementDataDTO {
    className?: string;
}

export interface IBuilderElementCardProps extends IBuilderElementBase {
    imgSrc: string | null;
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
    className?: string;
} & TBuilderStepDataDTO;

// export type TBuilderFieldBase = {
//     value: string;
//     title?: string;
//     titleSize?: "big" | "small";
//     isRequired?: boolean;
//     className?: string;
// } & TBuilderElements &
//     TBuilderOpportunity;

// export type TBuilderOpportunity = {
//     opportunity?: {
//         description: string;
//         value: string;
//         isRequired?: boolean;
//         position: "left" | "center" | "right";
//     };
// };

// export type TBuilderStep = {
//     stepId: string;
//     stepTitle?: string;
//     stepDescription?: string;
//     fields: TBuilderFieldBase[];
// };
