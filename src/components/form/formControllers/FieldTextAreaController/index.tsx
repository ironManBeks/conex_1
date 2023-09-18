import React, { FC, useRef, useState } from "react";
import { Input as AntInput } from "antd";
import { TextAreaRef } from "antd/lib/input/TextArea";

import { Controller, useFormContext } from "react-hook-form";
import cn from "classnames";

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
        placeholder,
        ...rest
    } = props;
    const {
        control,
        formState: { errors, touchedFields },
    } = useFormContext();
    const errorMessage = errors[name]?.message;
    const isError = !!errorMessage && !!touchedFields;
    const fieldRef = useRef<TextAreaRef | null>(null);
    const [isLabelActive, setIsLabelActive] = useState(false);
    const [focus, setFocus] = useState(false);
    const [letterCount, setLetterCount] = useState(0);

    const focusOnField = () => {
        if (fieldRef.current) {
            fieldRef.current.focus();
        }
    };

    // useEffect(() => {
    //     if (formState?.defaultValues) {
    //         const currentValue = formState.defaultValues[name];
    //         setLetterCount(currentValue?.length || 0);
    //     }
    // }, [formState?.defaultValues]);

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => {
                setLetterCount(field.value?.length || 0);
                if (field.value) {
                    setIsLabelActive(true);
                } else if (!focus && !field.value) {
                    setIsLabelActive(false);
                }
                return (
                    <FormItemWrapper
                        fieldType={EFormFieldType.textArea}
                        errorMessage={errorMessage}
                        label={label}
                        isFloatingLabel={isFloatingLabel}
                        wrapperClassName={wrapperClassName}
                    >
                        {isFloatingLabel && label && (
                            <label
                                className={cn(
                                    `${FORM_FIELD_CLASSNAME_PREFIX}_label`,
                                    { _activeLabel: isLabelActive },
                                    { _disabled: disabled },
                                )}
                                onClick={focusOnField}
                            >
                                {label}
                            </label>
                        )}
                        <TextArea
                            {...field}
                            {...rest}
                            ref={fieldRef}
                            className={cn(
                                `${FORM_FIELD_CLASSNAME_PREFIX}_field`,
                                {
                                    _floatingLabel: isFloatingLabel && label,
                                    _activeLabel:
                                        isFloatingLabel &&
                                        label &&
                                        isLabelActive,
                                },
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
                            onFocus={() => {
                                setFocus(true);
                                setIsLabelActive(true);
                            }}
                            onBlur={() => {
                                setFocus(false);
                                setIsLabelActive(false);
                            }}
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
