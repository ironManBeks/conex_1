import { SelectProps } from "antd/lib/select";

import {
    TFormItemLabel,
    TFormShowError,
    TFormWrapperClassName,
} from "@components/form/FormItemWrapper/types";
import { TDefaultOption } from "@components/form/types";

export type TFieldSelectController = {
    name: string;
    options: TDefaultOption[];
    onChangeValue?: (value: unknown) => void;
} & SelectProps &
    TFormItemLabel &
    TFormWrapperClassName &
    TFormShowError;
