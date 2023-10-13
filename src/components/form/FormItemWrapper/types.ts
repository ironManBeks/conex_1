import { ReactNode } from "react";
import { EFormFieldType } from "@components/form/types";
import { TFormItemError } from "@components/form/FormItemError/types";

export type TFormItemLabel = {
    label?: ReactNode;
    isFloatingLabel?: boolean;
};

export type TFormWrapperClassName = {
    wrapperClassName?: string;
};

export type TFormShowError = {
    showError?: boolean;
};

export type TFormWrapperErrorMessage = TFormItemError;

export type TFormItemWrapper = {
    children: ReactNode;
    fieldType: EFormFieldType;
    required?: boolean;
    fieldValue?: string | number;
} & TFormItemLabel &
    TFormWrapperClassName &
    TFormWrapperErrorMessage &
    TFormShowError;
