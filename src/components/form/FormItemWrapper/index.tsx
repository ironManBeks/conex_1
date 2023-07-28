import { FC } from "react";
import cn from "classnames";

import { FORM_FIELD_CLASSNAME_PREFIX } from "@components/form/consts";

import { TFormItemWrapper } from "./types";

const FormItemWrapper: FC<TFormItemWrapper> = ({
    children,
    fieldType,
    errorMessage,
    label,
    wrapperClassName,
    showError,
}) => {
    return (
        <div
            className={cn(
                `${FORM_FIELD_CLASSNAME_PREFIX}_wrapper`,
                fieldType && `_${fieldType}`,
                wrapperClassName,
                { _error: errorMessage },
            )}
        >
            <div className={cn(`${FORM_FIELD_CLASSNAME_PREFIX}_inner-wrapper`)}>
                {label && (
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
                    >
                        {children}
                    </div>
                    {errorMessage && showError && (
                        <div
                            className={cn(
                                `${FORM_FIELD_CLASSNAME_PREFIX}_error-wrapper`,
                            )}
                        >
                            <span>{errorMessage}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FormItemWrapper;
