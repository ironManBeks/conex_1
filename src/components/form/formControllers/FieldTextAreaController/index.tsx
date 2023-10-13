import React, { FC, useEffect, useRef, useState } from "react";
import { Input as AntInput } from "antd";
import { TextAreaRef } from "antd/lib/input/TextArea";
import { Controller, useFormContext } from "react-hook-form";
import cn from "classnames";

import FormItemWrapper from "@components/form/FormItemWrapper";

import { FORM_FIELD_CLASSNAME_PREFIX } from "@components/form/consts";
import { EFormFieldType } from "@components/form/types";
import { TFieldTextAreaController } from "./types";
import { isNil } from "lodash";

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
        formState: { errors },
        watch,
    } = useFormContext();
    const errorMessage = errors[name]?.message;
    const fieldRef = useRef<TextAreaRef | null>(null);
    const [isLabelActive, setIsLabelActive] = useState(false);
    const [focus, setFocus] = useState(false);
    const [letterCount, setLetterCount] = useState(0);
    const fieldValue = watch(name);

    const focusOnField = () => {
        if (fieldRef.current) {
            fieldRef.current.focus();
        }
    };

    useEffect(() => {
        if (!isNil(fieldValue?.length)) {
            setLetterCount(fieldValue.length || 0);
            if (fieldValue) {
                setIsLabelActive(true);
            } else if (!focus && !fieldValue) {
                setIsLabelActive(false);
            }
        }
    }, [fieldValue, focus]);

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
                        isFloatingLabel={isFloatingLabel}
                        wrapperClassName={wrapperClassName}
                    >
                        {isFloatingLabel && label && (
                            <label
                                className={cn(
                                    `${FORM_FIELD_CLASSNAME_PREFIX}_label`,
                                    { _activelabel: isLabelActive },
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
                                    _floatinglabel: isFloatingLabel && label,
                                    _activelabel:
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
