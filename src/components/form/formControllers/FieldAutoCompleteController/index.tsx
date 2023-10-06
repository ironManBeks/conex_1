import { FC, useRef, useState } from "react";
import cn from "classnames";
import { AutoComplete, Input, InputRef } from "antd";
import { isFunction } from "lodash";
import { Controller, useFormContext } from "react-hook-form";

import { IconSearch } from "@components/Icons";
import FormItemWrapper from "@components/form/FormItemWrapper";

import { FORM_FIELD_CLASSNAME_PREFIX } from "@components/form/consts";
import { EFormFieldType } from "@components/form/types";
import { TFieldAutoCompleteController } from "@components/form/formControllers/FieldAutoCompleteController/types";
import { DefaultOptionType } from "antd/es/select";

const FieldAutoCompleteController: FC<TFieldAutoCompleteController> = (
    props,
) => {
    const {
        wrapperClassName,
        showError,
        onSelect,
        onAddonButtonClick,
        fieldPlaceholder,
        icon,
        name,
        isFloatingLabel = true,
        fieldLabel,
        disabled,
        onChangeValue,
        ...rest
    } = props;
    const {
        control,
        formState: { errors },
    } = useFormContext();
    const errorMessage = errors[name]?.message;
    const [options, setOptions] = useState<DefaultOptionType[]>([]);
    const fieldRef = useRef<InputRef | null>(null);
    const [isLabelActive, setIsLabelActive] = useState(false);
    const [focus, setFocus] = useState(false);

    const handleSearch = (value: string) => {
        setOptions(
            !value
                ? []
                : [
                      { label: value, value: value },
                      { label: value + value, value: value + value },
                      {
                          label: value + value + value,
                          value: value + value + value,
                      },
                  ],
        );
    };

    const focusOnField = () => {
        if (fieldRef.current) {
            fieldRef.current.focus();
        }
    };

    const handleSelect = (value: string, option: DefaultOptionType) => {
        if (isFunction(onSelect)) {
            onSelect(value, option);
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
                        fieldType={EFormFieldType.autocomplete}
                        errorMessage={errorMessage}
                        label={fieldLabel}
                        isFloatingLabel={isFloatingLabel}
                        wrapperClassName={wrapperClassName}
                        showError={showError}
                    >
                        {isFloatingLabel && fieldLabel && (
                            <label
                                className={cn(
                                    `${FORM_FIELD_CLASSNAME_PREFIX}_label`,
                                    { _activelabel: isLabelActive },
                                    { _disabled: disabled },
                                )}
                                onClick={focusOnField}
                            >
                                {fieldLabel}
                            </label>
                        )}
                        <AutoComplete
                            options={options}
                            onSelect={(value, option) => {
                                field.onChange(value);
                                handleSelect(value, option);
                            }}
                            onSearch={handleSearch}
                            size="large"
                            popupClassName={cn(
                                `${FORM_FIELD_CLASSNAME_PREFIX}_dropdown`,
                                `_${EFormFieldType.autocomplete}`,
                            )}
                            className={cn(
                                `${FORM_FIELD_CLASSNAME_PREFIX}_field`,
                                {
                                    _floatinglabel:
                                        isFloatingLabel && fieldLabel,
                                    _activelabel:
                                        isFloatingLabel &&
                                        fieldLabel &&
                                        isLabelActive,
                                },
                            )}
                            value={field.value}
                        >
                            <Input
                                {...field}
                                {...rest}
                                allowClear={false}
                                ref={fieldRef}
                                placeholder={
                                    isFloatingLabel && fieldLabel
                                        ? undefined
                                        : fieldPlaceholder
                                }
                                value={field.value}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    field.onChange(val);
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
                                disabled={disabled}
                                addonBefore={
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (
                                                field.value &&
                                                isFunction(onAddonButtonClick)
                                            ) {
                                                onAddonButtonClick(field.value);
                                            }
                                        }}
                                    >
                                        {icon ?? (
                                            <IconSearch opacity={"0.36"} />
                                        )}
                                    </button>
                                }
                            />
                        </AutoComplete>
                    </FormItemWrapper>
                );
            }}
        />
    );
};

export default FieldAutoCompleteController;
