import {
    TFormItemLabel,
    TFormWrapperClassName,
} from "@components/form/FormItemWrapper/types";
import { InputNumberProps } from "antd/lib/input-number";

export type TFieldInputNumberController = {
    name: string;
    onChangeValue?: (value: unknown) => void;
} & InputNumberProps &
    TFormItemLabel &
    TFormWrapperClassName;
