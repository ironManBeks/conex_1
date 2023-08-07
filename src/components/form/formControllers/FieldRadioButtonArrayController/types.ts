import { InputProps } from "antd/lib/input/Input";
import {
    TFormItemLabel,
    TFormShowError,
    TFormWrapperClassName,
} from "@components/form/FormItemWrapper/types";
import { TDefaultOption } from "@components/form/types";

export type TFieldRadioButtonArrayController = {
    name: string;
    options: TDefaultOption[];
} & InputProps &
    TFormItemLabel &
    TFormWrapperClassName &
    TFormShowError;
