import { JSX, ReactNode } from "react";
import { SelectProps } from "antd/lib/select";
import { InputProps } from "antd/lib/input/Input";
import { CheckboxProps } from "antd/lib/checkbox";
import { InputNumberProps } from "antd/lib/input-number";
import {
    TFormItemLabel,
    TFormShowError,
    TFormWrapperClassName,
    TFormWrapperErrorMessage,
} from "@components/form/FormItemWrapper/types";
import { RadioProps } from "antd/lib/radio";

export enum EFormFieldType {
    input = "input",
    select = "select",
    checkbox = "checkbox",
    checkboxArray = "checkboxarray",
    radio = "radio",
    radioArray = "radioarray",
    radioButtonArray = "radiobuttonarray",
    textArea = "textarea",
    inputNumber = "inputnumber",
}

export type TDefaultOption = {
    value?: string | number | null;
    label: ReactNode;
    disabled?: boolean;
};

export type TFormFieldInput = {
    name: string;
    icon?: JSX.Element;
    iconPosition?: "left" | "right";
    onIconClick?: () => void;
} & InputProps &
    TFormWrapperClassName &
    TFormItemLabel &
    TFormWrapperErrorMessage &
    TFormShowError;

export type TFormFieldInputNumber = {
    name: string;
    icon?: JSX.Element;
    onIconClick?: () => void;
} & InputNumberProps &
    TFormWrapperClassName &
    TFormItemLabel &
    TFormWrapperErrorMessage;

export type TFormFieldSelect = {
    name: string;
    options: TDefaultOption[];
} & SelectProps;

export type TFormFieldCheckbox = {
    name: string;
    label?: string;
} & CheckboxProps;

export type TFormFieldRadio = {
    name: string;
    label?: string;
} & RadioProps;
