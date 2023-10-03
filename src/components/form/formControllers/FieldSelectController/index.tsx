import { FC, useRef, useState } from "react";
import cn from "classnames";
import { Select as AntSelect } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import { isFunction } from "lodash";
import { BaseSelectRef } from "rc-select";

import FormItemWrapper from "@components/form/FormItemWrapper";
import { IconArrowSingle, IconCross } from "@components/Icons";

import { EFormFieldType } from "@components/form/types";
import { TFieldSelectController } from "./types";
import { FORM_FIELD_CLASSNAME_PREFIX } from "@components/form/consts";
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
        formState: { errors },
    } = useFormContext();
    const errorMessage = errors[name]?.message;
    const fieldRef = useRef<BaseSelectRef | null>(null);
    const [isLabelActive, setIsLabelActive] = useState(false);
    const [focus, setFocus] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const focusOnField = () => {
        if (fieldRef.current) {
            fieldRef.current.focus();
        }
    };

    const focusHandler = (val: boolean) => {
        setFocus(val);
    };

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
                                onClick={(e) => {
                                    e.stopPropagation();
                                    focusOnField();
                                    setDropdownOpen((val) => !val);
                                }}
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
                                focusHandler(false);
                                if (isFunction(onChangeValue))
                                    onChangeValue(val);
                            }}
                            onFocus={() => {
                                focusHandler(true);
                                setIsLabelActive(true);
                            }}
                            onBlur={() => {
                                focusHandler(false);
                                setIsLabelActive(false);
                                setDropdownOpen(false);
                            }}
                            onClick={(e) => {
                                e.stopPropagation();
                                setDropdownOpen((val) => !val);
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
                            onSearch={(val) => {
                                if (val) {
                                    focusHandler(true);
                                    setIsLabelActive(true);
                                }
                            }}
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
