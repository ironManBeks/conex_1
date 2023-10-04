import { FC, useRef, useState } from "react";
import { Input as AntInput, InputRef } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import cn from "classnames";

import FormItemWrapper from "@components/form/FormItemWrapper";

import { FORM_FIELD_CLASSNAME_PREFIX } from "@components/form/consts";

import { EFormFieldType } from "@components/form/types";
import { TFieldPasswordController } from "./types";
import { IconEyeOpen, IconEyeClose } from "@components/Icons";

const FieldPasswordController: FC<TFieldPasswordController> = (props) => {
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
        formState: { errors },
    } = useFormContext();
    const errorMessage = errors[name]?.message;
    const fieldRef = useRef<InputRef | null>(null);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [isLabelActive, setIsLabelActive] = useState(false);
    const [focus, setFocus] = useState(false);

    const focusOnField = () => {
        if (fieldRef.current) {
            fieldRef.current.focus();
        }
    };

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => {
                if (field.value) {
                    setIsLabelActive(true);
                } else if (!focus && !field.value) {
                    setIsLabelActive(false);
                }
                return (
                    <FormItemWrapper
                        fieldType={EFormFieldType.password}
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
                        <AntInput.Password
                            {...field}
                            {...rest}
                            ref={fieldRef}
                            className={cn(
                                `${FORM_FIELD_CLASSNAME_PREFIX}_field`,
                                { _visible: passwordVisible },
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
                                field.onChange(val);
                                if (onChangeValue) onChangeValue(val);
                            }}
                            disabled={disabled}
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
                            iconRender={(visible) =>
                                visible ? (
                                    <IconEyeOpen
                                        onClick={() =>
                                            setPasswordVisible(
                                                (prevState) => !prevState,
                                            )
                                        }
                                        width={20}
                                        height={20}
                                    />
                                ) : (
                                    <IconEyeClose
                                        onClick={() =>
                                            setPasswordVisible(
                                                (prevState) => !prevState,
                                            )
                                        }
                                        width={20}
                                        height={20}
                                    />
                                )
                            }
                        />
                    </FormItemWrapper>
                );
            }}
        />
    );
};

export default FieldPasswordController;
