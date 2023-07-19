import { InputProps } from "antd/lib/input/Input";
import {
    TFormItemLabel,
    TFormWrapperClassName,
} from "@components/form/FormItemWrapper/types";

export type TFieldInputController = {
    name: string;
    onChangeValue?: (value: unknown) => void;
} & InputProps &
    TFormItemLabel &
    TFormWrapperClassName;
