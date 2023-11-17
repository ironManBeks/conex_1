import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import cn from "classnames";
import { Checkbox } from "antd";

import FormItemWrapper from "@components/form/FormItemWrapper";

import { EDirection } from "@globalTypes/commonTypes";
import { EFormFieldType } from "@components/form/types";
import { TFieldCheckboxArrayController } from "./types";
import CheckboxOption from "./CheckboxOption";
import CollapsibleBlockWithTitle from "@components/globalComponents/CollapsibleBlockWithTitle";

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
        showError,
        shownOptions,
        showContentClassName,
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
                const optionProps = {
                    disabled,
                    field,
                    getIsChecked,
                    ...rest,
                };

                return (
                    <FormItemWrapper
                        fieldType={EFormFieldType.checkboxArray}
                        errorMessage={errorMessage}
                        showError={showError}
                        label={label}
                        wrapperClassName={cn(wrapperClassName, {
                            _disabled: disabled,
                        })}
                        disabled={!!disabled}
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
                            {options
                                .slice(0, shownOptions)
                                .map((item, index) => {
                                    const checkboxId = `id_${EFormFieldType.checkboxArray}.${field.name}.${item.value}`;

                                    return (
                                        <CheckboxOption
                                            checkboxId={checkboxId}
                                            index={index}
                                            item={item}
                                            {...optionProps}
                                        />
                                    );
                                })}
                            {shownOptions && options.length > shownOptions && (
                                <CollapsibleBlockWithTitle
                                    expandTitle="Show more"
                                    closeTitle="Show less"
                                    defaultOpen={false}
                                    wrapperClassName={"_list"}
                                    titlePosition={"bottom"}
                                    titleContentClassName={showContentClassName}
                                >
                                    {options
                                        .slice(shownOptions)
                                        .map((item, index) => {
                                            const checkboxId = `id_${EFormFieldType.checkboxArray}.${field.name}.${item.value}`;

                                            return (
                                                <CheckboxOption
                                                    checkboxId={checkboxId}
                                                    index={index}
                                                    item={item}
                                                    {...optionProps}
                                                />
                                            );
                                        })}
                                </CollapsibleBlockWithTitle>
                            )}
                        </Checkbox.Group>
                    </FormItemWrapper>
                );
            }}
        />
    );
};

export default FieldCheckboxArrayController;
