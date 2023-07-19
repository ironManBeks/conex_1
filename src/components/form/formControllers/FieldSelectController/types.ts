import { SelectProps } from "antd/lib/select";

import {
    TFormItemLabel,
    TFormWrapperClassName,
} from "@components/form/FormItemWrapper/types";
import { TDefaultOption } from "@components/form/types";

export type TFieldSelectController = {
    name: string;
    options: TDefaultOption[];
    onChangeValue?: (value: unknown) => void;
} & SelectProps &
    TFormItemLabel &
    TFormWrapperClassName;
