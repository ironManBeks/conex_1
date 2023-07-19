import { FC, useEffect } from "react";
import {
    Controller,
    ControllerRenderProps,
    FieldValues,
    useFormContext,
} from "react-hook-form";

import FormItemWrapper from "@components/form/FormItemWrapper";

import { EFormFieldType } from "@components/form/types";
import { TFieldCheckboxArrayController } from "./types";
import cn from "classnames";
import { Checkbox as AntCheckbox, Checkbox } from "antd";
import { FORM_FIELD_CLASSNAME_PREFIX } from "@components/form/consts";
import { IconCheck } from "@components/Icons";
import { COLOR_WHITE } from "@common/theme/colorTheme";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { EDirection } from "@globalTypes/commonTypes";

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
        setValue,
        getValues,
        formState: { errors, touchedFields },
    } = useFormContext();
    const errorMessage = errors[name]?.message;
    const isError = !!errorMessage && !!touchedFields;

    useEffect(() => {
        console.log("errors", errors[name]);
    }, [errors]);

    const getCheckboxValues = (field?: string): Record<string, boolean> => {
        const checkboxValues = getValues();
        if (!field) {
            return checkboxValues;
        }
        return checkboxValues[field] || {};
    };

    const getCheckboxValue = (
        field: string,
        checkboxName?: string | number | null,
    ): boolean => {
        if (!checkboxName) {
            return false;
        }
        const checkboxValues = getCheckboxValues(field);
        const result: boolean | undefined = checkboxValues[`${checkboxName}`];
        return result === undefined ? false : result;
    };

    const checkboxOnChangeHandlerFactory =
        (
            field: ControllerRenderProps<FieldValues, string>,
            name?: string | number | null,
        ) =>
        (e: CheckboxChangeEvent): void => {
            if (!name) {
                return;
            }
            const val = e.target.checked;
            const values = getCheckboxValues(field.name);
            field.onChange({
                ...values,
                [`${name}`]: val,
            });
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
                            {options.map((item) => (
                                <div
                                    className={cn(
                                        `${FORM_FIELD_CLASSNAME_PREFIX}_field`,
                                        {
                                            _checked: getCheckboxValue(
                                                field.name,
                                                item.value,
                                            ),
                                        },
                                    )}
                                    key={`${field.name}.${item.value}`}
                                >
                                    <AntCheckbox
                                        {...rest}
                                        ref={field.ref}
                                        onChange={checkboxOnChangeHandlerFactory(
                                            field,
                                            item.value,
                                        )}
                                        id={`id_${EFormFieldType.checkboxArray}.${field.name}.${item.value}`}
                                        value={`${field.name}.${item.value}`}
                                        checked={getCheckboxValue(
                                            field.name,
                                            item.value,
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
                                            htmlFor={`id_${EFormFieldType.checkboxArray}.${field.name}.${item.value}`}
                                            className={cn(
                                                `${FORM_FIELD_CLASSNAME_PREFIX}_sub-label`,
                                            )}
                                        >
                                            {item.label}
                                        </label>
                                    </div>
                                </div>
                            ))}
                        </Checkbox.Group>
                    </FormItemWrapper>
                );
            }}
        />
    );
};

export default FieldCheckboxArrayController;
