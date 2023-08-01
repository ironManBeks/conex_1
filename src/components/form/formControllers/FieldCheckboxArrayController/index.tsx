import { FC } from "react";
import {
    Controller,
    ControllerRenderProps,
    FieldValues,
    useFormContext,
} from "react-hook-form";
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
        ...rest
    } = props;
    const {
        control,
        getValues,
        formState: { errors, touchedFields },
    } = useFormContext();
    const errorMessage = errors[name]?.message;
    const isError = !!errorMessage && !!touchedFields;

    const getIsChecked = (
        value: string | number | null | undefined,
    ): boolean => {
        const fieldValues = getValues();
        if (fieldValues[name]) {
            return fieldValues[name].includes(value);
        }
        return false;
    };

    const getUpdatedFieldValue = (
        field: ControllerRenderProps<FieldValues, string>,
        value: string | number | null | undefined,
    ): string[] => {
        let result: string[] = [];
        const isIncludes = getIsChecked(value);
        if (!isIncludes) {
            result = [...field.value, value];
        } else {
            result = field.value.filter((item: string) => item !== value);
        }
        return result;
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
                        label={label}
                        wrapperClassName={cn(wrapperClassName, {
                            _disabled: disabled,
                        })}
                    >
                        <Checkbox.Group
                            style={{
                                flexDirection:
                                    direction === EDirection.vertical
                                        ? "column"
                                        : "row",
                            }}
                        >
                            {options.map((item) => {
                                // console.log("item", item);
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
                                        key={`${field.name}.${item.value}`}
                                    >
                                        <AntCheckbox
                                            {...rest}
                                            ref={field.ref}
                                            onChange={(event) => {
                                                // const val =
                                                //     event.target.checked;
                                                if (!item.disabled) {
                                                    field.onChange(
                                                        getUpdatedFieldValue(
                                                            field,
                                                            event.target.value,
                                                        ),
                                                    );
                                                }
                                            }}
                                            id={checkboxId}
                                            value={item.value}
                                            checked={getIsChecked(item.value)}
                                            disabled={disabled || item.disabled}
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
