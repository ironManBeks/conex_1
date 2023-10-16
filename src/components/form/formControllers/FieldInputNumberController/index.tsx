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
    const {
        name,
        onChangeValue,
        label,
        wrapperClassName,
        disabled,
        isFloatingLabel = true,
        placeholder,
        showError,
        ...rest
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
                        fieldType={EFormFieldType.inputnumber}
                        errorMessage={errors[name]?.message}
                        wrapperClassName={cn(wrapperClassName)}
                        showError={showError}
                        label={label}
                        isFloatingLabel={isFloatingLabel}
                        fieldValue={field.value}
                        disabled={!!disabled}
                    >
                        <AntInputNumber
                            {...field}
                            {...rest}
                            className={cn(
                                `${FORM_FIELD_CLASSNAME_PREFIX}_field`,
                            )}
                            value={field.value}
                            onChange={(value) => {
                                field.onChange(value);
                                if (onChangeValue) onChangeValue(value);
                            }}
                            placeholder={
                                isFloatingLabel && label
                                    ? undefined
                                    : placeholder
                            }
                            disabled={disabled}
                            controls={{
                                upIcon: (
                                    <IconArrowSingle width={12} height={12} />
                                ),
                                downIcon: (
                                    <IconArrowSingle
                                        width={12}
                                        height={12}
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
