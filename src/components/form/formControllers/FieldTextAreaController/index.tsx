import React, { FC, useEffect, useRef, useState } from "react";
import { Input as AntInput } from "antd";
import { TextAreaRef } from "antd/lib/input/TextArea";

import { Controller, useFormContext } from "react-hook-form";
import cn from "classnames";

import FormItemWrapper from "@components/form/FormItemWrapper";

import { FORM_FIELD_CLASSNAME_PREFIX } from "@components/form/consts";

import { EFormFieldType } from "@components/form/types";
import { TFieldTextAreaController } from "./types";
import { ColorTheme } from "@common/theme/colorTheme";

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
        ...rest
    } = props;
    const {
        control,
        formState,
        formState: { errors, touchedFields },
    } = useFormContext();
    const errorMessage = errors[name]?.message;
    const isError = !!errorMessage && !!touchedFields;
    const fieldRef = useRef<TextAreaRef | null>(null);
    const [letterCount, setLetterCount] = useState(0);

    useEffect(() => {
        if (formState?.defaultValues) {
            const currentValue = formState.defaultValues[name];
            setLetterCount(currentValue?.length || 0);
        }
    }, [formState?.defaultValues]);

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => {
                return (
                    <FormItemWrapper
                        fieldType={EFormFieldType.textArea}
                        errorMessage={errorMessage}
                        label={label}
                        wrapperClassName={wrapperClassName}
                    >
                        <TextArea
                            {...field}
                            {...rest}
                            ref={fieldRef}
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
                                    },
                                )}
                            >
                                <span
                                    style={{
                                        color:
                                            letterCount === maxSymbolLength
                                                ? ColorTheme.red._500
                                                : "inherit",
                                    }}
                                >
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
