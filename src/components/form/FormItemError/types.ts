import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

export type TFormItemError = {
    errorMessage:
        | string
        | FieldError
        | Merge<FieldError, FieldErrorsImpl>
        | undefined;
};
