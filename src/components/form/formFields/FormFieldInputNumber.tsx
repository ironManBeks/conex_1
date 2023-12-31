import { FC, useState } from "react";
import { InputNumber } from "antd";
import cn from "classnames";

import { EFormFieldType, TFormFieldInputNumber } from "../types";
import { FORM_FIELD_CLASSNAME_PREFIX } from "@components/form/consts";
import FormItemWrapper from "../FormItemWrapper";
import { IconArrowSingle, IconMinus, IconPlus } from "@components/Icons";
import { isFunction, isNumber, isObject } from "lodash";
import { EArrowDirection } from "@components/Icons/types";

const FormFieldInputNumber: FC<TFormFieldInputNumber> = (props) => {
    const {
        className,
        label,
        wrapperClassName,
        errorMessage,
        onValueChange,
        sideButtons,
        min,
        max,
        isFloatingLabel,
        defaultValue,
        disabled,
        ...rest
    } = props;

    const sideButtonContent = isObject(sideButtons) ? sideButtons : null;
    const [fieldValue, setFieldValue] = useState<number>(
        isNumber(defaultValue) ? defaultValue : isNumber(min) ? min : 0,
    );

    // useEffect(() => {
    //     if (isFunction(onValueChange)) {
    //         onValueChange(fieldValue);
    //     }
    // }, [fieldValue]);

    const handleValueChange = (val: number) => {
        if (isFunction(onValueChange)) {
            onValueChange(val);
        }
    };

    return (
        <FormItemWrapper
            fieldType={EFormFieldType.inputnumber}
            errorMessage={errorMessage}
            label={label}
            isFloatingLabel={isFloatingLabel}
            wrapperClassName={cn(wrapperClassName, {
                _sidebuttons: sideButtons,
            })}
            disabled={!!disabled}
        >
            {sideButtons && (
                <button
                    onClick={() => {
                        setFieldValue((oldVal) => {
                            const newValue = oldVal - 1;
                            handleValueChange(newValue);
                            return newValue;
                        });
                        if (isFunction(sideButtonContent?.beforeButtonClick)) {
                            sideButtonContent?.beforeButtonClick();
                        }
                    }}
                    className={cn(
                        `${FORM_FIELD_CLASSNAME_PREFIX}_button _before`,
                    )}
                    disabled={isNumber(min) ? fieldValue <= min : false}
                >
                    {sideButtonContent?.beforeButtonContent ? (
                        sideButtonContent?.beforeButtonContent
                    ) : (
                        <IconMinus />
                    )}
                </button>
            )}
            <InputNumber
                {...rest}
                max={max}
                min={min}
                value={fieldValue}
                className={cn(
                    `${FORM_FIELD_CLASSNAME_PREFIX}_field`,
                    className,
                )}
                onChange={(val) => {
                    if (isNumber(val)) {
                        setFieldValue(val);
                        handleValueChange(val);
                    } else handleValueChange(0);
                }}
                controls={
                    !sideButtons
                        ? {
                              upIcon: (
                                  <IconArrowSingle width={12} height={12} />
                              ),
                              downIcon: (
                                  <IconArrowSingle
                                      width={12}
                                      height={12}
                                      direction={EArrowDirection.bottom}
                                  />
                              ),
                          }
                        : false
                }
                disabled={disabled}
            />
            {sideButtons && (
                <button
                    onClick={() => {
                        setFieldValue((oldVal) => {
                            const newValue = oldVal + 1;
                            handleValueChange(newValue);
                            return newValue;
                        });
                        if (isFunction(sideButtonContent?.afterButtonClick)) {
                            sideButtonContent?.afterButtonClick();
                        }
                    }}
                    className={cn(
                        `${FORM_FIELD_CLASSNAME_PREFIX}_button _after`,
                    )}
                    disabled={isNumber(max) ? fieldValue >= max : false}
                >
                    {sideButtonContent?.afterButtonContent ? (
                        sideButtonContent?.afterButtonContent
                    ) : (
                        <IconPlus />
                    )}
                </button>
            )}
        </FormItemWrapper>
    );
};

export default FormFieldInputNumber;
