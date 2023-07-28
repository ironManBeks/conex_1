import { ReactNode } from "react";
import { EFormFieldType } from "@components/form/types";
import { TFormItemError } from "@components/form/FormItemError/types";

export type TFormItemLabel = {
    label?: ReactNode;
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
} & TFormItemLabel &
    TFormWrapperClassName &
    TFormWrapperErrorMessage &
    TFormShowError;
