import { ReactNode } from "react";
import { AutoCompleteProps } from "antd";
import {
    TFormItemLabel,
    TFormShowError,
    TFormWrapperClassName,
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
    TFormItemLabel &
    TFormWrapperClassName &
    TFormShowError;
