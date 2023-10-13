import {
    TFormItemLabel,
    TFormShowError,
    TFormWrapperClassName,
} from "@components/form/FormItemWrapper/types";
import { SliderProps } from "rc-slider";

export type TFieldSliderController = {
    name: string;
    onChangeValue?: (value: unknown) => void;
    innerLabel?: boolean;
} & SliderProps &
    TFormItemLabel &
    TFormWrapperClassName &
    TFormShowError;
