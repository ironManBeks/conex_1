import { FC } from "react";
import { InputNumber } from "antd";
import cn from "classnames";

import { EFormFieldType, TFormFieldInputNumber } from "../types";
import { FORM_FIELD_CLASSNAME_PREFIX } from "@components/form/consts";
import FormItemWrapper from "../FormItemWrapper";
import { IconArrowSingle } from "@components/Icons";
import { EArrowDirection } from "@components/Icons/types";

const FormFieldInputNumber: FC<TFormFieldInputNumber> = (props) => {
    const { className, label, wrapperClassName, errorMessage, ...rest } = props;

    return (
        <FormItemWrapper
            fieldType={EFormFieldType.inputNumber}
            errorMessage={errorMessage}
            label={label}
            wrapperClassName={cn(wrapperClassName)}
        >
            <InputNumber
                className={cn(
                    `${FORM_FIELD_CLASSNAME_PREFIX}_field`,
                    className,
                )}
                controls={{
                    upIcon: <IconArrowSingle width={5} height={5} />,
                    downIcon: (
                        <IconArrowSingle
                            width={5}
                            height={5}
                            direction={EArrowDirection.bottom}
                        />
                    ),
                }}
                {...rest}
            />
        </FormItemWrapper>
    );
};

export default FormFieldInputNumber;
