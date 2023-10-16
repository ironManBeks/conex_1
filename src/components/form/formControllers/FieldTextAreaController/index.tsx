import React, { FC, useState } from "react";
import { Input as AntInput } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import cn from "classnames";
import { isNil } from "lodash";

import FormItemWrapper from "@components/form/FormItemWrapper";

import { FORM_FIELD_CLASSNAME_PREFIX } from "@components/form/consts";
import { EFormFieldType } from "@components/form/types";
import { TFieldTextAreaController } from "./types";

const { TextArea } = AntInput;

const FieldTextAreaController: FC<TFieldTextAreaController> = (props) => {
    const {
        name,
        onChangeValue,
        label,
        wrapperClassName,
        disabled,
        charCounter = true,
        maxSymbolLength = 500,
        minHeight,
        isFloatingLabel = true,
        showError,
        placeholder,
        ...rest
    } = props;
    const {
        control,
        formState: { errors },
    } = useFormContext();
    const [letterCount, setLetterCount] = useState(0);

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => {
                if (!isNil(field.value?.length)) {
                    setLetterCount(field.value.length || 0);
                }
                return (
                    <FormItemWrapper
                        fieldType={EFormFieldType.textArea}
                        errorMessage={errors[name]?.message}
                        wrapperClassName={wrapperClassName}
                        showError={showError}
                        label={label}
                        isFloatingLabel={isFloatingLabel}
                        fieldValue={field.value}
                        disabled={!!disabled}
                    >
                        <TextArea
                            {...field}
                            {...rest}
                            className={cn(
                                `${FORM_FIELD_CLASSNAME_PREFIX}_field`,
                            )}
                            value={field.value}
                            onChange={(e) => {
                                const val = e.target.value;
                                setLetterCount(val.length);
                                field.onChange(val);
                                if (onChangeValue) onChangeValue(val);
                            }}
                            disabled={disabled}
                            maxLength={maxSymbolLength}
                            placeholder={
                                isFloatingLabel && label
                                    ? undefined
                                    : placeholder
                            }
                            style={{
                                minHeight,
                            }}
                        />
                        {charCounter && (
                            <div
                                className={cn(
                                    `${FORM_FIELD_CLASSNAME_PREFIX}_char-counter`,
                                    {
                                        _disabled: disabled,
                                        _error: letterCount === maxSymbolLength,
                                    },
                                )}
                            >
                                <span>
                                    {`${letterCount} / ${maxSymbolLength}`}
                                </span>
                            </div>
                        )}
                    </FormItemWrapper>
                );
            }}
        />
    );
};

export default FieldTextAreaController;
