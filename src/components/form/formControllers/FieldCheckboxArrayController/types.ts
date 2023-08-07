import { CheckboxProps } from "antd/lib/checkbox";
import {
    TFormItemLabel,
    TFormShowError,
    TFormWrapperClassName,
} from "@components/form/FormItemWrapper/types";
import { TDefaultOption } from "@components/form/types";
import { EDirection } from "@globalTypes/commonTypes";

export type TFieldCheckboxArrayController = {
    name: string;
    options: TDefaultOption[];
    direction?: EDirection;
} & CheckboxProps &
    TFormWrapperClassName &
    TFormItemLabel &
    TFormShowError;
