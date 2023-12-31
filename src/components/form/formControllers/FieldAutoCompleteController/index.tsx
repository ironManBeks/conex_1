import { FC, useState } from "react";
import cn from "classnames";
import { AutoComplete, Input } from "antd";
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
    const [options, setOptions] = useState<DefaultOptionType[]>([]);

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
                return (
                    <FormItemWrapper
                        fieldType={EFormFieldType.autocomplete}
                        errorMessage={errors[name]?.message}
                        wrapperClassName={wrapperClassName}
                        showError={showError}
                        label={fieldLabel}
                        isFloatingLabel={isFloatingLabel}
                        fieldValue={field.value}
                        disabled={!!disabled}
                    >
                        <AutoComplete
                            options={options}
                            onSelect={(value, option) => {
                                field.onChange(value);
                                handleSelect(value, option);
                            }}
                            onSearch={handleSearch}
                            popupClassName={cn(
                                `${FORM_FIELD_CLASSNAME_PREFIX}_dropdown`,
                                `_${EFormFieldType.autocomplete}`,
                            )}
                            className={cn(
                                `${FORM_FIELD_CLASSNAME_PREFIX}_field`,
                            )}
                            value={field.value}
                        >
                            <Input
                                {...field}
                                {...rest}
                                allowClear={false}
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
