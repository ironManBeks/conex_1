import { TextAreaProps } from "antd/lib/input/TextArea";

import {
    TFormItemLabel,
    TFormWrapperClassName,
} from "@components/form/FormItemWrapper/types";

export type TFieldTextAreaController = {
    name: string;
    charCounter?: boolean;
    maxSymbolLength?: number;
    onChangeValue?: (value: unknown) => void;
    minHeight?: number;
} & TextAreaProps &
    TFormItemLabel &
    TFormWrapperClassName;
