import cn from "classnames";

import { FORM_FIELD_CLASSNAME_PREFIX } from "@components/form/consts";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { FC } from "react";
import { TDefaultOption } from "@components/form/types";
import { Checkbox as AntCheckbox } from "antd";
import { IconCheck } from "@components/Icons";

import { TFieldCheckboxArrayController } from "./types";

interface CheckboxOptionProps extends Partial<TFieldCheckboxArrayController> {
    field: ControllerRenderProps<FieldValues, string>;
    item: TDefaultOption;
    checkboxId: string;
    index: number;
    getIsChecked: (value?: string | number | null) => void;
    disabled?: boolean;
}

const CheckboxOption: FC<CheckboxOptionProps> = ({
    field,
    item,
    getIsChecked,
    checkboxId,
    disabled,
    index,
    ...rest
}) => {
    return (
        <div
            className={cn(
                `${FORM_FIELD_CLASSNAME_PREFIX}_field`,
                {
                    _checked: getIsChecked(item.value),
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
                    className={cn(`${FORM_FIELD_CLASSNAME_PREFIX}_sub-label`)}
                >
                    {item.label}
                </label>
            </div>
        </div>
    );
};

export default CheckboxOption;
