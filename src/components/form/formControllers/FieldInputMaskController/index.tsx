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
        floatingLabel,
        style,
        showError = true,
        saveOnlyNumber = true,
        readOnly: propsReadOnly = false,
        editIcon,
        onEditIconClick,
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

    useEffect(() => {
        if (addonAfterRef?.current?.clientHeight) {
            setAddonAfterWidth(addonAfterRef.current.clientHeight);
        }
    }, [addonAfterRef?.current?.clientHeight]);

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
                        wrapperClassName={cn(wrapperClassName, {
                            _addonAfter: addonAfter,
                            _floating: floatingLabel,
                        })}
                    >
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
                                if (onChangeValue) onChangeValue(val);
                            }}
                            disabled={disabled}
                            style={{
                                ...style,
                                paddingRight: addonAfterWidth
                                    ? `${addonAfterWidth + 10}px`
                                    : undefined,
                            }}
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
                        {editIcon && (
                            <ButtonPrimary
                                onClick={() => {
                                    if (isFunction(onEditIconClick)) {
                                        onEditIconClick();
                                    }
                                }}
                                color={EButtonColor.transparent}
                                className={cn(
                                    `${FORM_FIELD_CLASSNAME_PREFIX}_edit`,
                                )}
                            >
                                <IconEdit color="#757474" />
                            </ButtonPrimary>
                        )}
                    </FormItemWrapper>
                );
            }}
        />
    );
};

export default FieldInputMaskController;
