import { MaskedInputProps } from "react-text-mask";
import { ReactNode } from "react";

import {
    TFormItemLabel,
    TFormShowError,
    TFormWrapperClassName,
} from "@components/form/FormItemWrapper/types";

export type TFieldInputMaskController = {
    name: string;
    onChangeValue?: (value: unknown) => void;
    onAddonClick?: () => void;
    addonAfter?: ReactNode;
    minAddonWidth?: number;
    saveOnlyNumber?: boolean;
} & TFormItemLabel &
    TFormWrapperClassName &
    MaskedInputProps &
    TFormShowError;
