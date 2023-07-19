import { DefaultOptionType, SelectProps } from "antd/lib/select";
import { InputProps } from "antd/lib/input/Input";
import { CheckboxProps } from "antd/lib/checkbox";
import { RadioProps } from "antd/lib/radio";
import { ReactNode } from "react";

export enum EFormFieldType {
    input = "input",
    select = "select",
    checkbox = "checkbox",
    checkboxArray = "checkboxArray",
    radio = "radio",
    radioArray = "radioArray",
    radioButtonArray = "radioButtonArray",
}

export type TDefaultOption = {
    value?: string | number | null;
    label: ReactNode;
    disabled?: boolean;
};

export type TFormFieldInput = {
    name: string;
    icon?: ReactNode;
    onIconClick?: () => void;
} & InputProps;

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
    options: TDefaultOption[];
} & RadioProps;
