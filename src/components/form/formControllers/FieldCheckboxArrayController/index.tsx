import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import cn from "classnames";
import { Checkbox as AntCheckbox, Checkbox } from "antd";

import FormItemWrapper from "@components/form/FormItemWrapper";
import { IconCheck } from "@components/Icons";

import { FORM_FIELD_CLASSNAME_PREFIX } from "@components/form/consts";
import { COLOR_WHITE } from "@common/theme/colorTheme";
import { EDirection } from "@globalTypes/commonTypes";
import { EFormFieldType } from "@components/form/types";
import { TFieldCheckboxArrayController } from "./types";

const FieldCheckboxArrayController: FC<TFieldCheckboxArrayController> = (
    props,
) => {
    const {
        name,
        wrapperClassName,
        label,
        disabled,
        options,
        direction,
        showError = true,
        ...rest
    } = props;
    const {
        control,
        getValues,
        formState: { errors },
    } = useFormContext();
    const errorMessage = errors[name]?.message;

    const getIsChecked = (
        value: string | number | null | undefined,
    ): boolean => {
        const fieldValues = getValues();
        if (fieldValues[name]) {
            return fieldValues[name].includes(value);
        }
        return false;
    };

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => {
                return (
                    <FormItemWrapper
                        fieldType={EFormFieldType.checkboxArray}
                        errorMessage={errorMessage}
                        showError={showError}
                        label={label}
                        wrapperClassName={cn(wrapperClassName, {
                            _disabled: disabled,
                        })}
                    >
                        <Checkbox.Group
                            value={field.value}
                            style={{
                                flexDirection:
                                    direction === EDirection.vertical
                                        ? "column"
                                        : "row",
                            }}
                            onChange={(checkedValue) => {
                                field.onChange(checkedValue);
                            }}
                        >
                            {options.map((item, index) => {
                                const checkboxId = `id_${EFormFieldType.checkboxArray}.${field.name}.${item.value}`;
                                return (
                                    <div
                                        className={cn(
                                            `${FORM_FIELD_CLASSNAME_PREFIX}_field`,
                                            {
                                                _checked: getIsChecked(
                                                    item.value,
                                                ),
                                            },
                                            {
                                                _disabled: item.disabled,
                                            },
                                        )}
                                        key={`${field.name}.${item.value}.${index}`}
                                    >
                                        <AntCheckbox
                                            {...rest}
                                            {...field}
                                            id={checkboxId}
                                            value={item.value}
                                            disabled={disabled || item.disabled}
                                        >
                                            <IconCheck width={16} height={16} />
                                        </AntCheckbox>
                                        <div
                                            className={cn(
                                                `${FORM_FIELD_CLASSNAME_PREFIX}_sub-label-wrapper`,
                                            )}
                                        >
                                            <label
                                                htmlFor={checkboxId}
                                                className={cn(
                                                    `${FORM_FIELD_CLASSNAME_PREFIX}_sub-label`,
                                                )}
                                            >
                                                {item.label}
                                            </label>
                                        </div>
                                    </div>
                                );
                            })}
                        </Checkbox.Group>
                    </FormItemWrapper>
                );
            }}
        />
    );
};

export default FieldCheckboxArrayController;
