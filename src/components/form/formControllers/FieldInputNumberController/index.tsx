import { FC } from "react";
import { InputNumber as AntInputNumber } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import cn from "classnames";

import FormItemWrapper from "@components/form/FormItemWrapper";
import { IconArrowSingle } from "@components/Icons";

import { FORM_FIELD_CLASSNAME_PREFIX } from "@components/form/consts";

import { EFormFieldType } from "@components/form/types";
import { TFieldInputNumberController } from "./types";
import { EArrowDirection } from "@components/Icons/types";

const FieldInputNumberController: FC<TFieldInputNumberController> = (props) => {
    const { name, onChangeValue, label, wrapperClassName, disabled, ...rest } =
        props;
    const {
        control,
        formState: { errors, touchedFields },
    } = useFormContext();
    const errorMessage = errors[name]?.message;
    const isError = !!errorMessage && !!touchedFields;

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => {
                return (
                    <FormItemWrapper
                        fieldType={EFormFieldType.inputNumber}
                        errorMessage={errorMessage}
                        label={label}
                        wrapperClassName={cn(wrapperClassName)}
                    >
                        <AntInputNumber
                            {...field}
                            {...rest}
                            className={cn(
                                `${FORM_FIELD_CLASSNAME_PREFIX}_field`,
                            )}
                            value={field.value}
                            onChange={(value) => {
                                // const val = e.target.value;
                                field.onChange(value);
                                if (onChangeValue) onChangeValue(value);
                            }}
                            disabled={disabled}
                            controls={{
                                upIcon: (
                                    <IconArrowSingle width={5} height={5} />
                                ),
                                downIcon: (
                                    <IconArrowSingle
                                        width={5}
                                        height={5}
                                        direction={EArrowDirection.bottom}
                                    />
                                ),
                            }}
                        />
                    </FormItemWrapper>
                );
            }}
        />
    );
};

export default FieldInputNumberController;
