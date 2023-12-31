import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import cn from "classnames";
import { Radio as AntRadio } from "antd";
import { isFunction } from "lodash";

import FormItemWrapper from "@components/form/FormItemWrapper";

import { FORM_FIELD_CLASSNAME_PREFIX } from "@components/form/consts";
import { EFormFieldType } from "@components/form/types";
import { TFieldRadioArrayController } from "./types";
import { EDirection } from "@globalTypes/commonTypes";

const FieldRadioArrayController: FC<TFieldRadioArrayController> = (props) => {
    const {
        name,
        wrapperClassName,
        label,
        disabled,
        options,
        onChangeValue,
        direction,
        showError,
    } = props;
    const {
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => {
                return (
                    <FormItemWrapper
                        fieldType={EFormFieldType.radioArray}
                        errorMessage={errors[name]?.message}
                        label={label}
                        showError={showError}
                        wrapperClassName={wrapperClassName}
                        disabled={!!disabled}
                    >
                        <AntRadio.Group
                            onChange={(e) => {
                                const value = e.target.value;
                                if (isFunction(onChangeValue)) {
                                    onChangeValue(value);
                                }
                                field.onChange(value);
                            }}
                            value={field.value}
                            style={{
                                flexDirection:
                                    direction === EDirection.vertical
                                        ? "column"
                                        : "row",
                            }}
                        >
                            {options.map((item, index) => (
                                <AntRadio
                                    key={`${name}.${index}.${item.value}`}
                                    value={item.value}
                                    className={cn(
                                        `${FORM_FIELD_CLASSNAME_PREFIX}_field`,
                                        `_${EFormFieldType.radio}`,
                                        {
                                            _checked:
                                                field.value === item.value,
                                            _disabled: disabled,
                                        },
                                    )}
                                    disabled={disabled || item.disabled}
                                >
                                    {item.label}
                                </AntRadio>
                            ))}
                        </AntRadio.Group>
                    </FormItemWrapper>
                );
            }}
        />
    );
};

export default FieldRadioArrayController;
