import { InputNumberProps } from "antd/lib/input-number";
import {
    TFormItemLabel,
    TFormShowError,
    TFormWrapperClassName,
} from "@components/form/FormItemWrapper/types";

export type TFieldInputNumberController = {
    name: string;
    onChangeValue?: (value: unknown) => void;
} & InputNumberProps &
    TFormItemLabel &
    TFormWrapperClassName &
    TFormShowError;
