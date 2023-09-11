import { InputProps } from "antd/lib/input/Input";

import {
    TFormItemLabel,
    TFormShowError,
    TFormWrapperClassName,
} from "@components/form/FormItemWrapper/types";

export type TFieldInputController = {
    name: string;
    onChangeValue?: (value: unknown) => void;
    onAddonClick?: () => void;
    minAddonWidth?: number;
} & InputProps &
    TFormItemLabel &
    TFormWrapperClassName &
    TFormShowError;
