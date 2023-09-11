import { FC, useEffect, useRef, useState } from "react";
import MaskedInput from "react-text-mask";

import { Controller, useFormContext } from "react-hook-form";
import cn from "classnames";
import { isFunction } from "lodash";

import FormItemWrapper from "@components/form/FormItemWrapper";
import { IconEdit } from "@components/Icons";
import ButtonPrimary from "@components/buttons/ButtonPrimary";

import { FORM_FIELD_CLASSNAME_PREFIX } from "@components/form/consts";
import { EFormFieldType } from "@components/form/types";
import { TFieldInputMaskController } from "./types";
import { EButtonColor } from "@components/buttons/types";

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
        formState: { errors, touchedFields },
    } = useFormContext();
    const errorMessage = errors[name]?.message;
    const isError = !!errorMessage && !!touchedFields;
    const fieldRef = useRef<MaskedInput>(null);
    const [isLabelActive, setIsLabelActive] = useState(false);

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
                            _addonAfter: addonAfter,
                        })}
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
                        <MaskedInput
                            {...field}
                            {...rest}
                            ref={fieldRef}
                            className={cn(
                                `${FORM_FIELD_CLASSNAME_PREFIX}_field`,
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
                                setIsLabelActive(true);
                            }}
                            onBlur={(e) => {
                                if (!e.target.value) {
                                    setIsLabelActive(false);
                                }
                            }}
                            disabled={disabled}
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
                        />
                        {addonAfter && (
                            <div
                                className={cn(
                                    `${FORM_FIELD_CLASSNAME_PREFIX}_addonAfter`,
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
