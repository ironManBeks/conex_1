import { FC } from "react";
import { FORM_FIELD_CLASSNAME_PREFIX } from "../consts";
import FormFieldInput from "./FormFieldInput";
import { TFormFieldInput } from "../types";

const FormFieldInputWithText: FC<TFormFieldInput> = (props) => {
    return (
        <div className={`${FORM_FIELD_CLASSNAME_PREFIX}__input-text-container`}>
            <div className={`${FORM_FIELD_CLASSNAME_PREFIX}__input-text`}>
                From
            </div>
            <FormFieldInput
                {...props}
                className={`${FORM_FIELD_CLASSNAME_PREFIX}__input-text-input`}
            />
            <div
                className={`${FORM_FIELD_CLASSNAME_PREFIX}__input-text-input-border`}
            />
        </div>
    );
};

export default FormFieldInputWithText;
