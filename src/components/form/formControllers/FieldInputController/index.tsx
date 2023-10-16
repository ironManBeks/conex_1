import { FC } from "react";
import { Input as AntInput } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import cn from "classnames";

import FormItemWrapper from "@components/form/FormItemWrapper";

import { FORM_FIELD_CLASSNAME_PREFIX } from "@components/form/consts";
import { EFormFieldType } from "@components/form/types";
import { TFieldInputController } from "./types";

const FieldInputController: FC<TFieldInputController> = (props) => {
    const {
        name,
        onChangeValue,
        label,
        isFloatingLabel = true,
        wrapperClassName,
        placeholder,
        disabled,
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
                        fieldType={EFormFieldType.input}
                        errorMessage={errors[name]?.message}
                        wrapperClassName={wrapperClassName}
                        showError={showError}
                        label={label}
                        isFloatingLabel={isFloatingLabel}
                        fieldValue={field.value}
                        disabled={!!disabled}
                    >
                        <AntInput
                            {...field}
                            {...rest}
                            className={cn(
                                `${FORM_FIELD_CLASSNAME_PREFIX}_field`,
                            )}
                            value={field.value}
                            onChange={(e) => {
                                const val = e.target.value;
                                field.onChange(val);
                                if (onChangeValue) onChangeValue(val);
                            }}
                            placeholder={
                                isFloatingLabel && label
                                    ? undefined
                                    : placeholder
                            }
                            disabled={disabled}
                        />
                    </FormItemWrapper>
                );
            }}
        />
    );
};

export default FieldInputController;
