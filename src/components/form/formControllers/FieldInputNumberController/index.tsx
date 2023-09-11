import { FC, useEffect, useRef, useState } from "react";
import { InputNumber as AntInputNumber, InputRef } from "antd";
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
        ...rest
    } = props;
    const {
        control,
        formState: { errors, touchedFields },
    } = useFormContext();
    const errorMessage = errors[name]?.message;
    const isError = !!errorMessage && !!touchedFields;
    const fieldRef = useRef<HTMLInputElement | null>(null);
    const [isLabelActive, setIsLabelActive] = useState(false);

    const focusOnField = () => {
        if (fieldRef.current) {
            fieldRef.current.focus();
        }
    };

    useEffect(() => {
        console.log("fieldRef?.current", fieldRef);
        if (fieldRef?.current?.value) {
            setIsLabelActive(true);
        }
    }, [fieldRef?.current]);

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
                        <AntInputNumber
                            {...field}
                            {...rest}
                            ref={fieldRef}
                            className={cn(
                                `${FORM_FIELD_CLASSNAME_PREFIX}_field`,
                                { _floatingLabel: isFloatingLabel && label },
                                {
                                    _activeLabel:
                                        isFloatingLabel &&
                                        label &&
                                        isLabelActive,
                                },
                            )}
                            value={field.value}
                            onChange={(value) => {
                                // const val = e.target.value;
                                field.onChange(value);
                                if (onChangeValue) onChangeValue(value);
                            }}
                            onFocus={() => {
                                setIsLabelActive(true);
                            }}
                            onBlur={(e) => {
                                if (!e.target.value) {
                                    setIsLabelActive(false);
                                }
                            }}
                            disabled={disabled}
                            placeholder={
                                isFloatingLabel && label
                                    ? undefined
                                    : placeholder
                            }
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
