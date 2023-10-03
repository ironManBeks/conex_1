import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import cn from "classnames";

import FormItemWrapper from "@components/form/FormItemWrapper";

import { FORM_FIELD_CLASSNAME_PREFIX } from "@components/form/consts";
import { EFormFieldType } from "@components/form/types";
import { TFieldCheckboxController } from "./types";
import { IconCheck } from "@components/Icons";
import { Checkbox as AntCheckbox } from "antd";
import { COLOR_WHITE } from "@common/theme/colorTheme";

const FieldCheckboxController: FC<TFieldCheckboxController> = (props) => {
    const {
        name,
        wrapperClassName,
        label,
        disabled,
        onChangeValue,
        showError = true,
        ...rest
    } = props;
    const {
        control,
        formState: { errors },
    } = useFormContext();
    const errorMessage = errors[name]?.message;

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => {
                return (
                    <FormItemWrapper
                        fieldType={EFormFieldType.checkbox}
                        errorMessage={errorMessage}
                        label={undefined}
                        showError={showError}
                        wrapperClassName={cn(wrapperClassName, {
                            _checked: field.value,
                            _disabled: disabled,
                        })}
                    >
                        <AntCheckbox
                            {...rest}
                            ref={field.ref}
                            id={`id_${EFormFieldType.checkbox}.${field.name}`}
                            checked={!!field.value}
                            onChange={(event) => {
                                const val = event.target.checked;
                                if (!disabled) {
                                    field.onChange(val);
                                    if (onChangeValue) onChangeValue(val);
                                }
                            }}
                            name={name}
                            className={cn(
                                `${FORM_FIELD_CLASSNAME_PREFIX}_field`,
                            )}
                            disabled={disabled}
                        >
                            <IconCheck
                                color={COLOR_WHITE}
                                width={16}
                                height={16}
                            />
                        </AntCheckbox>
                        <div
                            className={cn(
                                `${FORM_FIELD_CLASSNAME_PREFIX}_sub-label-wrapper`,
                            )}
                        >
                            <label
                                htmlFor={`id_${EFormFieldType.checkbox}.${field.name}`}
                                className={cn(
                                    `${FORM_FIELD_CLASSNAME_PREFIX}_sub-label`,
                                )}
                            >
                                {label}
                            </label>
                        </div>
                    </FormItemWrapper>
                );
            }}
        />
    );
};

export default FieldCheckboxController;
