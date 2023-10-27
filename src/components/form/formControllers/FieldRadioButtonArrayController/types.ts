import { InputProps } from "antd/lib/input/Input";
import {
    TFormItemLabel,
    TFormShowError,
    TFormWrapperClassName,
} from "@components/form/FormItemWrapper/types";
import { TDefaultOption } from "@components/form/types";

export enum ERadioButtonRenderStyles {
    colorpicker = "colorpicker",
    imagepicker = "imagepicker",
    reduced = "reduced",
}

export type TFieldRadioButtonOptions =
    | {
          options: Array<TDefaultOption & { color: string }>;
          renderStyle: ERadioButtonRenderStyles.colorpicker;
      }
    | {
          options: Array<TDefaultOption & { src: string }>;
          renderStyle: ERadioButtonRenderStyles.imagepicker;
      }
    | {
          options: Array<TDefaultOption>;
          renderStyle: ERadioButtonRenderStyles.reduced;
      }
    | { options: Array<TDefaultOption>; renderStyle?: undefined };

export type TFieldRadioButtonArrayController = {
    name: string;
} & InputProps &
    TFormItemLabel &
    TFormWrapperClassName &
    TFormShowError &
    TFieldRadioButtonOptions;
