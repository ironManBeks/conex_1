import { FC, useEffect, useRef, useState } from "react";
import { Input as AntInput, InputRef } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import cn from "classnames";

import FormItemWrapper from "@components/form/FormItemWrapper";

import { FORM_FIELD_CLASSNAME_PREFIX } from "@components/form/consts";

import { EFormFieldType } from "@components/form/types";
import { TFieldInputController } from "./types";
import { isFunction } from "lodash";

const FieldInputController: FC<TFieldInputController> = (props) => {
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
    const fieldRef = useRef<InputRef | null>(null);

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
                        label={label}
                        wrapperClassName={cn(wrapperClassName, {
                            _addonAfter: addonAfter,
                            _floating: floatingLabel,
                        })}
                    >
                        <AntInput
                            {...field}
                            {...rest}
                            ref={fieldRef}
                            className={cn(
                                `${FORM_FIELD_CLASSNAME_PREFIX}_field`,
                            )}
                            value={field.value}
                            onChange={(e) => {
                                const val = e.target.value;
                                field.onChange(val);
                                if (onChangeValue) onChangeValue(val);
                            }}
                            disabled={disabled}
                            style={{
                                paddingRight: addonAfterWidth
                                    ? `${addonAfterWidth + 10}px`
                                    : undefined,
                            }}
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

export default FieldInputController;
