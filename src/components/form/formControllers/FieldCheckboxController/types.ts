import { CheckboxProps } from "antd/lib/checkbox";
import {
    TFormItemLabel,
    TFormShowError,
    TFormWrapperClassName,
} from "@components/form/FormItemWrapper/types";

export type TFieldCheckboxController = {
    name: string;
    onChangeValue?: (e: boolean) => void;
} & CheckboxProps &
    TFormWrapperClassName &
    TFormItemLabel &
    TFormShowError;
