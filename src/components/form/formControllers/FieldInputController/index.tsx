import { FC, useEffect, useRef, useState } from "react";
import { Input as AntInput, InputRef } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import cn from "classnames";

import FormItemWrapper from "@components/form/FormItemWrapper";

import { FORM_FIELD_CLASSNAME_PREFIX } from "@components/form/consts";

import { EFormFieldType } from "@components/form/types";
import { TFieldInputController } from "./types";

const FieldInputController: FC<TFieldInputController> = (props) => {
    const {
        name,
        onChangeValue,
        label,
        isFloatingLabel = true,
        wrapperClassName,
        placeholder,
        disabled,
        ...rest
    } = props;
    const {
        control,
        formState: { errors, touchedFields },
    } = useFormContext();
    const errorMessage = errors[name]?.message;
    const isError = !!errorMessage && !!touchedFields;
    const fieldRef = useRef<InputRef | null>(null);
    const [isLabelActive, setIsLabelActive] = useState(false);

    const focusOnField = () => {
        if (fieldRef.current) {
            fieldRef.current.focus();
        }
    };

    useEffect(() => {
        if (fieldRef?.current?.input?.value) {
            setIsLabelActive(true);
        }
    }, [fieldRef?.current?.input?.value]);

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => {
                return (
                    <FormItemWrapper
                        fieldType={EFormFieldType.input}
                        errorMessage={errorMessage}
                        label={label}
                        isFloatingLabel={isFloatingLabel}
                        wrapperClassName={wrapperClassName}
                    >
                        {isFloatingLabel && label && (
                            <label
                                className={cn(
                                    `${FORM_FIELD_CLASSNAME_PREFIX}_label`,
                                    { _activeLabel: isLabelActive },
                                    { _disabled: disabled },
                                )}
                                onClick={focusOnField}
                            >
                                {label}
                            </label>
                        )}
                        <AntInput
                            {...field}
                            {...rest}
                            ref={fieldRef}
                            className={cn(
                                `${FORM_FIELD_CLASSNAME_PREFIX}_field`,
                                { _floatingLabel: isFloatingLabel && label },
                                {
                                    _activeLabel:
                                        isFloatingLabel &&
                                        label &&
                                        isLabelActive,
                                },
                            )}
                            value={field.value}
                            onChange={(e) => {
                                const val = e.target.value;
                                field.onChange(val);
                                if (onChangeValue) onChangeValue(val);
                            }}
                            onFocus={() => {
                                setIsLabelActive(true);
                            }}
                            onBlur={(e) => {
                                if (!e.target.value) {
                                    setIsLabelActive(false);
                                }
                            }}
                            placeholder={
                                isFloatingLabel && label
                                    ? undefined
                                    : placeholder
                            }
                            disabled={disabled}
                        />
                    </FormItemWrapper>
                );
            }}
        />
    );
};

export default FieldInputController;

// import { FC, useEffect, useRef, useState } from "react";
// import { Input as AntInput, InputRef } from "antd";
// import { Controller, useFormContext } from "react-hook-form";
// import cn from "classnames";
// import { isFunction } from "lodash";
//
// import FormItemWrapper from "@components/form/FormItemWrapper";
//
// import { FORM_FIELD_CLASSNAME_PREFIX } from "@components/form/consts";
//
// import { EFormFieldType } from "@components/form/types";
// import { TFieldInputController } from "./types";
//
// const FieldInputController: FC<TFieldInputController> = (props) => {
//     const {
//         name,
//         onChangeValue,
//         label,
//         wrapperClassName,
//         disabled,
//         addonAfter,
//         onAddonClick,
//         minAddonWidth,
//         isFloatingLabel,
//         showError = true,
//         placeholder,
//         readOnly: propsReadOnly = false,
//         ...rest
//     } = props;
//     const addonAfterRef = useRef<HTMLDivElement>(null);
//     const [addonAfterWidth, setAddonAfterWidth] = useState<number>(0);
//     const {
//         control,
//         formState: { errors, touchedFields },
//     } = useFormContext();
//     const errorMessage = errors[name]?.message;
//     const isError = !!errorMessage && !!touchedFields;
//     const fieldRef = useRef<InputRef | null>(null);
//     const [isLabelActive, setIsLabelActive] = useState(false);
//
//     useEffect(() => {
//         if (addonAfterRef?.current?.clientHeight) {
//             setAddonAfterWidth(addonAfterRef.current.clientHeight);
//         }
//     }, [addonAfterRef?.current?.clientHeight]);
//
//     const focusOnField = () => {
//         if (fieldRef.current) {
//             fieldRef.current.focus();
//         }
//     };
//
//     useEffect(() => {
//         if (fieldRef?.current?.input?.value) {
//             setIsLabelActive(true);
//         }
//     }, [fieldRef?.current?.input?.value]);
//
//     return (
//         <Controller
//             name={name}
//             control={control}
//             render={({ field }) => {
//                 return (
//                     <FormItemWrapper
//                         fieldType={EFormFieldType.input}
//                         errorMessage={errorMessage}
//                         showError={showError}
//                         label={label}
//                         isFloatingLabel={isFloatingLabel}
//                         wrapperClassName={cn(wrapperClassName, {
//                             _addonAfter: addonAfter,
//                             _floating: isFloatingLabel,
//                         })}
//                     >
//                         {isFloatingLabel && label && (
//                             <label
//                                 className={cn(
//                                     `${FORM_FIELD_CLASSNAME_PREFIX}_label`,
//                                     { _activeLabel: isLabelActive },
//                                     { _disabled: disabled },
//                                 )}
//                                 onClick={focusOnField}
//                             >
//                                 {label}
//                             </label>
//                         )}
//                         <AntInput
//                             {...field}
//                             {...rest}
//                             ref={fieldRef}
//                             className={cn(
//                                 `${FORM_FIELD_CLASSNAME_PREFIX}_field`,
//                                 { _floatingLabel: isFloatingLabel && label },
//                                 {
//                                     _activeLabel:
//                                         isFloatingLabel &&
//                                         label &&
//                                         isLabelActive,
//                                 },
//                             )}
//                             value={field.value}
//                             onChange={(e) => {
//                                 const val = e.target.value;
//                                 field.onChange(val);
//                                 if (onChangeValue) onChangeValue(val);
//                             }}
//                             placeholder={
//                                 isFloatingLabel && label
//                                     ? undefined
//                                     : placeholder
//                             }
//                             disabled={disabled}
//                             style={{
//                                 paddingRight: addonAfterWidth
//                                     ? `${addonAfterWidth + 10}px`
//                                     : undefined,
//                             }}
//                             readOnly={propsReadOnly}
//                         />
//                         {addonAfter && (
//                             <div
//                                 className={cn(
//                                     `${FORM_FIELD_CLASSNAME_PREFIX}_addonAfter`,
//                                     {
//                                         _click: isFunction(onAddonClick),
//                                     },
//                                 )}
//                                 ref={addonAfterRef}
//                                 onClick={onAddonClick}
//                                 style={{ minWidth: minAddonWidth }}
//                             >
//                                 {addonAfter}
//                             </div>
//                         )}
//                     </FormItemWrapper>
//                 );
//             }}
//         />
//     );
// };
//
// export default FieldInputController;
