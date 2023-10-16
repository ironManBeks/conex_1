import { FC, useMemo, useState } from "react";
import cn from "classnames";

import { FORM_FIELD_CLASSNAME_PREFIX } from "@components/form/consts";

import { TFormItemWrapper } from "./types";

const FormItemWrapper: FC<TFormItemWrapper> = ({
    children,
    fieldType,
    errorMessage,
    label,
    wrapperClassName,
    isFloatingLabel = false,
    showError = true,
    disabled,
    fieldValue,
}) => {
    const [focus, setFocus] = useState(false);

    const errorContent = useMemo(() => {
        if (errorMessage && showError) {
            return (
                <div
                    className={cn(
                        `${FORM_FIELD_CLASSNAME_PREFIX}_error-wrapper`,
                    )}
                >
                    <span>{errorMessage.toString()}</span>
                </div>
            );
        }
    }, [errorMessage, showError]);

    const simpleLabelContent = useMemo(() => {
        if (label && !isFloatingLabel) {
            return (
                <div
                    className={cn(
                        `${FORM_FIELD_CLASSNAME_PREFIX}_label-wrapper`,
                    )}
                >
                    <span>{label}</span>
                </div>
            );
        }
    }, [label, isFloatingLabel]);

    return (
        <div
            className={cn(
                `${FORM_FIELD_CLASSNAME_PREFIX}_wrapper`,
                fieldType && `_${fieldType}`,
                wrapperClassName,
                { _error: errorMessage },
                { _floatinglabel: isFloatingLabel && label },
                { _focus: focus },
                { _disabled: disabled },
            )}
        >
            <div className={cn(`${FORM_FIELD_CLASSNAME_PREFIX}_inner-wrapper`)}>
                {simpleLabelContent}
                <div
                    className={cn(
                        `${FORM_FIELD_CLASSNAME_PREFIX}_content-wrapper`,
                    )}
                >
                    <div
                        className={cn(
                            `${FORM_FIELD_CLASSNAME_PREFIX}_field-wrapper`,
                        )}
                        onBlur={() => setFocus(false)}
                        onFocus={() => setFocus(true)}
                    >
                        {children}
                        {label && isFloatingLabel && (
                            <label
                                onClick={() => {
                                    setFocus(true);
                                }}
                                className={cn(
                                    `${FORM_FIELD_CLASSNAME_PREFIX}_label`,
                                    {
                                        _activelabel:
                                            focus ||
                                            fieldValue ||
                                            fieldValue === 0,
                                        _disabled: disabled,
                                    },
                                )}
                            >
                                {label}
                            </label>
                        )}
                    </div>
                    {errorContent}
                </div>
            </div>
        </div>
    );
};

export default FormItemWrapper;
