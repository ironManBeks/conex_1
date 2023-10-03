import { ReactNode } from "react";
import { AutoCompleteProps } from "antd";
import {
    TFormItemLabel,
    TFormShowError,
    TFormWrapperClassName,
    TFormWrapperErrorMessage,
} from "@components/form/FormItemWrapper/types";

export type TFieldAutoCompleteController = {
    name: string;
    label?: string;
    onAddonButtonClick?: (value: string) => void;
    onChangeValue?: (value: string) => void;
    fieldPlaceholder?: string;
    icon?: ReactNode;
    fieldLabel?: ReactNode;
} & AutoCompleteProps &
    TFormWrapperClassName &
    TFormItemLabel &
    TFormWrapperErrorMessage &
    TFormShowError;
