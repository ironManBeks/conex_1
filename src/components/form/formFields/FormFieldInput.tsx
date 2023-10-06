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
        showError,
        isFloatingLabel,
        ...rest
    } = props;

    return (
        <FormItemWrapper
            fieldType={EFormFieldType.input}
            errorMessage={errorMessage}
            showError={showError}
            label={label}
            wrapperClassName={cn(wrapperClassName, {
                _floatinglabel: isFloatingLabel && label,
            })}
        >
            <Input
                className={cn(
                    `${FORM_FIELD_CLASSNAME_PREFIX}_field`,
                    className,
                )}
                {...rest}
            />
        </FormItemWrapper>
    );
};

export default FormFieldInput;
