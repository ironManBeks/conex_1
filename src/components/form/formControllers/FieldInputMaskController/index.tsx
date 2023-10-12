import { FC, useEffect, useRef, useState } from "react";
import MaskedInput from "react-text-mask";
import { Controller, useFormContext } from "react-hook-form";
import cn from "classnames";
import { isFunction } from "lodash";

import FormItemWrapper from "@components/form/FormItemWrapper";

import { FORM_FIELD_CLASSNAME_PREFIX } from "@components/form/consts";
import { EFormFieldType } from "@components/form/types";
import { TFieldInputMaskController } from "./types";

const FieldInputMaskController: FC<TFieldInputMaskController> = (props) => {
    const {
        name,
        onChangeValue,
        label,
        wrapperClassName,
        disabled,
        addonAfter,
        onAddonClick,
        minAddonWidth,
        style,
        showError = true,
        saveOnlyNumber = true,
        readOnly: propsReadOnly = false,
        isFloatingLabel = true,
        placeholder,
        ...rest
    } = props;
    const addonAfterRef = useRef<HTMLDivElement>(null);
    const [addonAfterWidth, setAddonAfterWidth] = useState<number>(0);
    const {
        control,
        formState: { errors },
        watch,
    } = useFormContext();
    const errorMessage = errors[name]?.message;
    const fieldRef = useRef<MaskedInput>(null);
    const [isLabelActive, setIsLabelActive] = useState(false);
    const [focus, setFocus] = useState(false);
    const fieldValue = watch(name);

    useEffect(() => {
        if (addonAfterRef?.current?.clientHeight) {
            setAddonAfterWidth(addonAfterRef.current.clientHeight);
        }
    }, [addonAfterRef?.current?.clientHeight]);

    const focusOnField = () => {
        if (fieldRef.current) {
            fieldRef?.current?.inputElement.focus();
        }
    };

    useEffect(() => {
        if (fieldValue) {
            setIsLabelActive(true);
        } else if (!focus && !fieldValue) {
            setIsLabelActive(false);
        }
    }, [fieldValue, focus]);

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => {
                return (
                    <FormItemWrapper
                        fieldType={EFormFieldType.input}
                        errorMessage={errorMessage}
                        showError={showError}
                        label={label}
                        isFloatingLabel={isFloatingLabel}
                        wrapperClassName={cn(wrapperClassName, {
                            _addonafter: addonAfter,
                        })}
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
                        <MaskedInput
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
                                const val = saveOnlyNumber
                                    ? e.target.value.replace(/[^0-9]/g, "")
                                    : e.target.value;
                                field.onChange(val);
                                if (val) setIsLabelActive(true);
                                if (onChangeValue) onChangeValue(val);
                            }}
                            onFocus={() => {
                                setFocus(true);
                                setIsLabelActive(true);
                            }}
                            onBlur={() => {
                                setFocus(false);
                                setIsLabelActive(false);
                            }}
                            style={{
                                ...style,
                                paddingRight: addonAfterWidth
                                    ? `${addonAfterWidth + 10}px`
                                    : undefined,
                            }}
                            placeholder={
                                isFloatingLabel && label
                                    ? undefined
                                    : placeholder
                            }
                            readOnly={propsReadOnly}
                            disabled={disabled}
                        />
                        {addonAfter && (
                            <div
                                className={cn(
                                    `${FORM_FIELD_CLASSNAME_PREFIX}_addonafter`,
                                    {
                                        _click: isFunction(onAddonClick),
                                    },
                                )}
                                ref={addonAfterRef}
                                onClick={onAddonClick}
                                style={{ minWidth: minAddonWidth }}
                            >
                                {addonAfter}
                            </div>
                        )}
                    </FormItemWrapper>
                );
            }}
        />
    );
};

export default FieldInputMaskController;
