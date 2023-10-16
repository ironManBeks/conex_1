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
        showError,
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
    } = useFormContext();

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
                        errorMessage={errors[name]?.message}
                        showError={showError}
                        wrapperClassName={cn(wrapperClassName, {
                            _addonafter: addonAfter,
                        })}
                        label={label}
                        isFloatingLabel={isFloatingLabel}
                        fieldValue={field.value}
                        disabled={!!disabled}
                    >
                        <MaskedInput
                            {...field}
                            {...rest}
                            className={cn(
                                `${FORM_FIELD_CLASSNAME_PREFIX}_field`,
                            )}
                            value={field.value}
                            onChange={(e) => {
                                const val = saveOnlyNumber
                                    ? e.target.value.replace(/[^0-9]/g, "")
                                    : e.target.value;
                                console.log(`bbb${e.target.value}bbb`);
                                field.onChange(val);
                                if (onChangeValue) onChangeValue(val);
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
