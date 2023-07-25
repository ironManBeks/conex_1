import { ReactNode } from "react";
import { EFormFieldType } from "@components/form/types";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

export type TFormItemLabel = {
    label?: ReactNode;
};

export type TFormWrapperClassName = {
    wrapperClassName?: string;
};

export type TFormWrapperErrorMessage = {
    errorMessage:
        | string
        | FieldError
        | Merge<FieldError, FieldErrorsImpl<any>>
        | undefined;
};

export type TFormItemWrapper = {
    children: ReactNode;
    fieldType: EFormFieldType;
    required?: boolean;
} & TFormItemLabel &
    TFormWrapperClassName &
    TFormWrapperErrorMessage;
