import { FC, useRef, cloneElement } from "react";
import Slider, { SliderProps, SliderRef } from "rc-slider";
import { Controller, useFormContext } from "react-hook-form";
import cn from "classnames";
import "rc-slider/assets/index.css";

import FormItemWrapper from "@components/form/FormItemWrapper";
import { IconDrag } from "@components/Icons";

import { FORM_FIELD_CLASSNAME_PREFIX } from "@components/form/consts";
import { EFormFieldType } from "@components/form/types";
import { TFieldSliderController } from "./types";

const handleRender: SliderProps["handleRender"] = (node, props) => {
    return cloneElement(node, props, <IconDrag />);
};

const FieldSliderController: FC<TFieldSliderController> = (props) => {
    const {
        name,
        onChangeValue,
        label,
        innerLabel = true,
        wrapperClassName,
        disabled,
        ...rest
    } = props;
    const {
        control,
        formState: { errors },
    } = useFormContext();
    const errorMessage = errors[name]?.message;
    const fieldRef = useRef<SliderRef>(null);

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => {
                return (
                    <FormItemWrapper
                        fieldType={EFormFieldType.slider}
                        errorMessage={errorMessage}
                        label={label}
                        isFloatingLabel={false}
                        wrapperClassName={wrapperClassName}
                    >
                        {innerLabel && (
                            <span
                                className={`${FORM_FIELD_CLASSNAME_PREFIX}_sub-label`}
                            >
                                {field.value} inch
                            </span>
                        )}
                        <Slider
                            {...field}
                            {...rest}
                            max={125}
                            ref={fieldRef}
                            className={cn(
                                `${FORM_FIELD_CLASSNAME_PREFIX}_field`,
                            )}
                            value={field.value}
                            onChange={(val) => {
                                field.onChange(val);
                                if (onChangeValue) onChangeValue(val);
                            }}
                            handleRender={handleRender}
                            disabled={disabled}
                            dotStyle={{
                                background: "red",
                            }}
                        />
                    </FormItemWrapper>
                );
            }}
        />
    );
};

export default FieldSliderController;
