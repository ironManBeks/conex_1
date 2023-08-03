import { InputProps } from "antd/lib/input/Input";

import {
    TFormItemLabel,
    TFormShowError,
    TFormWrapperClassName,
} from "@components/form/FormItemWrapper/types";
import { THEX } from "@globalTypes/commonTypes";

export type TFieldInputController = {
    name: string;
    onChangeValue?: (value: unknown) => void;
    onAddonClick?: () => void;
    minAddonWidth?: number;
    floatingLabel?: boolean;
    floatingBgColor?: THEX;
    editIcon?: boolean;
    onEditIconClick?: () => void;
} & InputProps &
    TFormItemLabel &
    TFormWrapperClassName &
    TFormShowError;
