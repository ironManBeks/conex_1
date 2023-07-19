import { InputProps } from "antd/lib/input/Input";
import {
    TFormItemLabel,
    TFormWrapperClassName,
} from "@components/form/FormItemWrapper/types";
import { TDefaultOption } from "@components/form/types";

export type TFieldRadioButtonArrayController = {
    name: string;
    options: TDefaultOption[];
} & InputProps &
    TFormItemLabel &
    TFormWrapperClassName;
