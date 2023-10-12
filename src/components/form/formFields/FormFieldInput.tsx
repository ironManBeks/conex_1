import { FC, useEffect, useRef, useState } from "react";
import { Input } from "antd";

import { EFormFieldType, TFormFieldInput } from "../types";
import cn from "classnames";
import { FORM_FIELD_CLASSNAME_PREFIX } from "@components/form/consts";
import FormItemWrapper from "../FormItemWrapper";
import { isFunction } from "lodash";

const FormFieldInput: FC<TFormFieldInput> = (props) => {
    const {
        className,
        label,
        wrapperClassName,
        errorMessage,
        showError,
        isFloatingLabel,
        addonAfter,
        onAddonClick,
        minAddonWidth,
        addonDisabled,
        ...rest
    } = props;
    const addonAfterRef = useRef<HTMLDivElement>(null);
    const [addonAfterWidth, setAddonAfterWidth] = useState<number>(0);

    useEffect(() => {
        if (addonAfterRef?.current?.clientHeight) {
            setAddonAfterWidth(addonAfterRef.current.clientHeight);
        }
    }, [addonAfterRef?.current?.clientHeight]);

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
                {...rest}
                className={cn(
                    `${FORM_FIELD_CLASSNAME_PREFIX}_field`,
                    className,
                )}
                style={{
                    paddingRight: addonAfterWidth
                        ? `${addonAfterWidth + 10}px`
                        : undefined,
                }}
            />
            {addonAfter && (
                <div
                    className={cn(`${FORM_FIELD_CLASSNAME_PREFIX}_addonafter`, {
                        _click: isFunction(onAddonClick),
                        _disable: addonDisabled,
                    })}
                    ref={addonAfterRef}
                    onClick={(e) => {
                        if (isFunction(onAddonClick) && !addonDisabled) {
                            onAddonClick(e);
                        }
                    }}
                    style={{ minWidth: minAddonWidth }}
                >
                    {addonAfter}
                </div>
            )}
        </FormItemWrapper>
    );
};

export default FormFieldInput;
