import { FC } from "react";
import { Input } from "antd";

import { EFormFieldType, TFormFieldInput } from "../types";
import cn from "classnames";
import { FORM_FIELD_CLASSNAME_PREFIX } from "@components/form/consts";
import FormItemWrapper from "../FormItemWrapper";

const FormFieldInput: FC<TFormFieldInput> = (props) => {
    const {
        className,
        label,
        wrapperClassName,
        errorMessage,
        icon,
        iconPosition,
        showError,
        ...rest
    } = props;

    return (
        <FormItemWrapper
            fieldType={EFormFieldType.input}
            errorMessage={errorMessage}
            showError={showError}
            label={label}
            wrapperClassName={cn(
                wrapperClassName,
                iconPosition && `_icon-${iconPosition}`,
                { _icon: icon },
            )}
        >
            <Input
                className={cn(
                    `${FORM_FIELD_CLASSNAME_PREFIX}_field`,
                    className,
                )}
                {...rest}
            />
            {icon && icon}
        </FormItemWrapper>
    );
};

export default FormFieldInput;
