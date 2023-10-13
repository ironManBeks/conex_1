import { FC, useState } from "react";
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
    fieldValue,
}) => {
    const [focus, setFocus] = useState(false);

    return (
        <div
            className={cn(
                `${FORM_FIELD_CLASSNAME_PREFIX}_wrapper`,
                fieldType && `_${fieldType}`,
                wrapperClassName,
                { _error: errorMessage },
                { _floatinglabel: isFloatingLabel && label },
            )}
        >
            <div className={cn(`${FORM_FIELD_CLASSNAME_PREFIX}_inner-wrapper`)}>
                {label && !isFloatingLabel && (
                    <div
                        className={cn(
                            `${FORM_FIELD_CLASSNAME_PREFIX}_label-wrapper`,
                        )}
                    >
                        <span>{label}</span>
                    </div>
                )}
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
                                className={cn(
                                    `${FORM_FIELD_CLASSNAME_PREFIX}_label`,
                                    { _activelabel: focus || fieldValue },
                                    // { _activelabel: isLabelActive },
                                    // { _disabled: disabled },
                                )}
                            >
                                {label}
                            </label>
                        )}
                    </div>
                    {errorMessage && showError && (
                        <div
                            className={cn(
                                `${FORM_FIELD_CLASSNAME_PREFIX}_error-wrapper`,
                            )}
                        >
                            <span>{errorMessage.toString()}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FormItemWrapper;
