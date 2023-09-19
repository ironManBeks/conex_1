import { FC, useEffect, useRef, useState } from "react";
import cn from "classnames";
import { Select as AntSelect } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import type { BaseSelectRef } from "rc-select";

import FormItemWrapper from "@components/form/FormItemWrapper";

import { EFormFieldType } from "@components/form/types";
import { TFieldSelectController } from "./types";
import { isFunction } from "lodash";
import { FORM_FIELD_CLASSNAME_PREFIX } from "@components/form/consts";
import { IconArrowSingle, IconCross, IconUser } from "@components/Icons";
import { EArrowDirection } from "@components/Icons/types";

const FieldSelectController: FC<TFieldSelectController> = (props) => {
    const {
        name,
        onChangeValue,
        label,
        wrapperClassName,
        disabled,
        showSearch = true,
        allowClear = true,
        isFloatingLabel = true,
        placeholder,
        mode,
        ...rest
    } = props;
    const {
        control,
        formState: { errors, touchedFields },
    } = useFormContext();
    const errorMessage = errors[name]?.message;
    const isError = !!errorMessage && !!touchedFields;
    const fieldRef = useRef<any | null>(null);
    const [isLabelActive, setIsLabelActive] = useState(false);
    const [focus, setFocus] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const focusOnField = () => {
        if (fieldRef.current) {
            fieldRef.current.focus();
        }
    };

    const focusHandler = (val: boolean, dropdownHandler?: boolean) => {
        console.log("focusHandler", val, dropdownHandler);
        setFocus(val);
        if (dropdownHandler) {
            setDropdownOpen(val);
        }
    };

    useEffect(() => {
        console.log("dropdownOpen", dropdownOpen);
    }, [dropdownOpen]);

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => {
                if (field.value) {
                    setIsLabelActive(true);
                } else if (!focus && !field.value) {
                    setIsLabelActive(false);
                }
                return (
                    <FormItemWrapper
                        fieldType={EFormFieldType.select}
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
                        <AntSelect
                            {...field}
                            {...rest}
                            ref={fieldRef}
                            className={cn(
                                `${FORM_FIELD_CLASSNAME_PREFIX}_field`,
                                {
                                    _disabled: disabled,
                                    _floatingLabel: isFloatingLabel && label,
                                    _activeLabel:
                                        isFloatingLabel &&
                                        label &&
                                        isLabelActive,
                                },
                            )}
                            popupClassName={cn(
                                `${FORM_FIELD_CLASSNAME_PREFIX}_dropdown`,
                                `_${EFormFieldType.select}`,
                            )}
                            onChange={(val) => {
                                field.onChange(val);
                                focusHandler(false, true);
                                if (isFunction(onChangeValue))
                                    onChangeValue(val);
                            }}
                            onFocus={() => {
                                focusHandler(true, true);
                                setIsLabelActive(true);
                            }}
                            onBlur={() => {
                                focusHandler(false, true);
                                setIsLabelActive(false);
                            }}
                            onClick={() => {
                                if (!focus) {
                                    setDropdownOpen(true);
                                }
                            }}
                            suffixIcon={
                                <IconArrowSingle
                                    direction={
                                        dropdownOpen
                                            ? EArrowDirection.top
                                            : EArrowDirection.bottom
                                    }
                                />
                            }
                            clearIcon={<IconCross />}
                            open={dropdownOpen}
                            disabled={disabled}
                            showSearch={showSearch}
                            allowClear={allowClear}
                            placeholder={
                                isFloatingLabel && label
                                    ? undefined
                                    : placeholder
                            }
                            mode={mode}
                        />
                    </FormItemWrapper>
                );
            }}
        />
    );
};

export default FieldSelectController;
