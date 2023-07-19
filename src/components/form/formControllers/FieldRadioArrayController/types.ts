import { RadioProps } from "antd/lib/radio";
import {
    TFormItemLabel,
    TFormWrapperClassName,
} from "@components/form/FormItemWrapper/types";
import { TDefaultOption } from "@components/form/types";
import { EDirection } from "@globalTypes/commonTypes";

export type TFieldRadioArrayController = {
    name: string;
    options: TDefaultOption[];
    onChangeValue?: (value: unknown) => void;
    direction?: EDirection;
} & RadioProps &
    TFormWrapperClassName &
    TFormItemLabel;
