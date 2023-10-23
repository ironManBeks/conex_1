import { FC, useEffect, useMemo, useRef, useState } from "react";
import cn from "classnames";
import { Transition, TransitionStatus } from "react-transition-group";
import CSS from "csstype";

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
    const errorRef = useRef<HTMLDivElement>(null);
    const [focus, setFocus] = useState(false);
    const [errorHeight, setErrorHeight] = useState<number>(0);

    const errorTransitionStyles: Partial<
        Record<TransitionStatus, CSS.Properties>
    > = {
        entering: { height: `${errorHeight}px`, opacity: 1 },
        entered: { height: `${errorHeight}px`, opacity: 1 },
        exiting: { height: 0, opacity: 0 },
        exited: { height: 0, opacity: 0 },
    };

    useEffect(() => {
        if (errorRef?.current && showError) {
            setErrorHeight(errorRef?.current?.getBoundingClientRect().height);
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
                    {showError && (
                        <Transition in={!!errorMessage} timeout={0}>
                            {(state) => (
                                <div
                                    style={{
                                        transition: "all 0.2s ease",
                                        transitionProperty: "height, opacity",
                                        ...errorTransitionStyles[state],
                                    }}
                                >
                                    <div
                                        ref={errorRef}
                                        className={cn(
                                            `${FORM_FIELD_CLASSNAME_PREFIX}_error-wrapper`,
                                        )}
                                    >
                                        <span>{errorMessage?.toString()}</span>
                                    </div>
                                </div>
                            )}
                        </Transition>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FormItemWrapper;
