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
        formState: { errors },
        watch,
    } = useFormContext();
    const errorMessage = errors[name]?.message;
    const fieldRef = useRef<InputRef | null>(null);
    const [isLabelActive, setIsLabelActive] = useState(false);
    const [focus, setFocus] = useState(false);
    const fieldValue = watch(name);

    const focusOnField = () => {
        if (fieldRef.current) {
            fieldRef.current.focus();
        }
    };

    useEffect(() => {
        if (fieldValue) {
            setIsLabelActive(true);
        } else if (!focus && !fieldValue) {
            setIsLabelActive(false);
        }
    }, [fieldValue, focus]);

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
                        fieldValue={field.value}
                    >
                        {/*{isFloatingLabel && label && (*/}
                        {/*    <label*/}
                        {/*        className={cn(*/}
                        {/*            `${FORM_FIELD_CLASSNAME_PREFIX}_label`,*/}
                        {/*            { _activelabel: isLabelActive },*/}
                        {/*            { _disabled: disabled },*/}
                        {/*        )}*/}
                        {/*        onClick={focusOnField}*/}
                        {/*    >*/}
                        {/*        {label}*/}
                        {/*    </label>*/}
                        {/*)}*/}
                        <AntInput
                            {...field}
                            {...rest}
                            ref={fieldRef}
                            className={cn(
                                `${FORM_FIELD_CLASSNAME_PREFIX}_field`,
                                {
                                    _floatinglabel: isFloatingLabel && label,
                                    _activelabel:
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
                                setFocus(true);
                                setIsLabelActive(true);
                            }}
                            onBlur={() => {
                                setFocus(false);
                                setIsLabelActive(false);
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
