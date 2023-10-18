import { FC } from "react";
import { Checkbox as AntCheckbox } from "antd";

import cn from "classnames";
import FormItemWrapper from "../FormItemWrapper";
import { IconCheck } from "@components/Icons";

import { EFormFieldType, TFormFieldCheckbox } from "../types";
import { FORM_FIELD_CLASSNAME_PREFIX } from "@components/form/consts";
import { COLOR_WHITE } from "@assets/theme/colorTheme";

const FormFieldCheckbox: FC<TFormFieldCheckbox> = (props) => {
    const {
        name,
        errorMessage,
        wrapperClassName,
        checked,
        label,
        disabled,
        ...rest
    } = props;

    return (
        <FormItemWrapper
            fieldType={EFormFieldType.checkbox}
            errorMessage={errorMessage}
            label={undefined}
            showError={false}
            wrapperClassName={cn(wrapperClassName, "_simple-field", {
                _checked: checked,
            })}
            disabled={!!disabled}
        >
            <label
                className={cn(
                    `${FORM_FIELD_CLASSNAME_PREFIX}_sub-label-wrapper`,
                )}
            >
                <AntCheckbox
                    {...rest}
                    checked={checked}
                    name={name}
                    className={cn(`${FORM_FIELD_CLASSNAME_PREFIX}_field`)}
                >
                    <IconCheck color={COLOR_WHITE} width={16} height={16} />
                </AntCheckbox>
                <span
                    className={cn(`${FORM_FIELD_CLASSNAME_PREFIX}_sub-label`)}
                >
                    {label}
                </span>
            </label>
        </FormItemWrapper>
    );
};

export default FormFieldCheckbox;
