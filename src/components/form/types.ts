import { JSX, ReactNode, MouseEvent } from "react";
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
    inputnumber = "inputnumber",
    password = "password",
    autocomplete = "autocomplete",
    slider = "slider",
}

export type TDefaultOption = {
    value?: string | number | null;
    label: ReactNode;
    disabled?: boolean;
};

export type TFormFieldInput = {
    name: string;
    onIconClick?: () => void;
    addonDisabled?: boolean;
    onAddonClick?: (e: MouseEvent<HTMLDivElement>) => void;
    minAddonWidth?: number;
} & InputProps &
    TFormWrapperClassName &
    TFormItemLabel &
    TFormWrapperErrorMessage &
    TFormShowError;

export type TFormFieldInputNumber = {
    name: string;
    icon?: JSX.Element;
    onIconClick?: () => void;
    onValueChange?: (value: number) => void;
    sideButtons?: true | TSideButtonsProps;
} & InputNumberProps &
    TFormWrapperClassName &
    TFormItemLabel &
    TFormWrapperErrorMessage;

export type TSideButtonsProps = {
    beforeButtonContent: ReactNode;
    afterButtonContent: ReactNode;
    beforeButtonClick?: () => void;
    afterButtonClick?: () => void;
};

export type TFormFieldSelect = {
    name: string;
    options: TDefaultOption[];
} & SelectProps;

export type TFormFieldCheckbox = {
    name: string;
    label?: string;
} & CheckboxProps &
    TFormWrapperClassName &
    TFormItemLabel &
    TFormWrapperErrorMessage;

export type TFormFieldRadio = {
    name: string;
    label?: string;
} & RadioProps;
