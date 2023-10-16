import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import cn from "classnames";
import { Radio as AntRadio } from "antd";

import FormItemWrapper from "@components/form/FormItemWrapper";

import { FORM_FIELD_CLASSNAME_PREFIX } from "@components/form/consts";
import { EFormFieldType } from "@components/form/types";
import { TFieldRadioButtonArrayController } from "./types";

const FieldRadioButtonArrayController: FC<TFieldRadioButtonArrayController> = (
    props,
) => {
    const { name, wrapperClassName, label, disabled, options, showError } =
        props;
    const {
        control,
        formState: { errors },
    } = useFormContext();
    const errorMessage = errors[name]?.message;

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => {
                return (
                    <FormItemWrapper
                        fieldType={EFormFieldType.radioButtonArray}
                        errorMessage={errorMessage}
                        label={label}
                        showError={showError}
                        wrapperClassName={wrapperClassName}
                        disabled={!!disabled}
                    >
                        <AntRadio.Group
                            onChange={(e) => field.onChange(e.target.value)}
                            value={field.value}
                            optionType="button"
                            buttonStyle="solid"
                        >
                            {options.map((item, index) => (
                                <AntRadio.Button
                                    key={`${name}.${index}.${item.value}`}
                                    value={item.value}
                                    disabled={disabled || item.disabled}
                                    className={cn(
                                        `${FORM_FIELD_CLASSNAME_PREFIX}_field`,
                                        `${EFormFieldType.radioButtonArray}`,
                                        {
                                            _checked:
                                                field.value === item.value,
                                            _disabled:
                                                disabled || item.disabled,
                                        },
                                    )}
                                >
                                    {item.label}
                                </AntRadio.Button>
                            ))}
                        </AntRadio.Group>
                    </FormItemWrapper>
                );
            }}
        />
    );
};

export default FieldRadioButtonArrayController;
