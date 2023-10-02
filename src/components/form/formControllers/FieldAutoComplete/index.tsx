import { FC, useRef, useState } from "react";
import cn from "classnames";
import { AutoComplete, Input, InputRef } from "antd";
import type { SelectProps } from "antd/es/select";
import { isFunction } from "lodash";
import { Controller, useFormContext } from "react-hook-form";

import { IconSearch } from "@components/Icons";
import FormItemWrapper from "@components/form/FormItemWrapper";

import { FORM_FIELD_CLASSNAME_PREFIX } from "@components/form/consts";
import { EFormFieldType, TFormFieldAutoComplete } from "@components/form/types";

const getRandomInt = (max: number, min = 0) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

const searchResult = (query: string) =>
    new Array(getRandomInt(5))
        .join(".")
        .split(".")
        .map((_, idx) => {
            const category = `${query}${idx}`;
            return {
                value: category,
                label: (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            background: "red !important",
                        }}
                    >
                        <span>{category}</span>
                    </div>
                ),
            };
        });

const FieldAutoComplete: FC<TFormFieldAutoComplete> = (props) => {
    const {
        wrapperClassName,
        errorMessage,
        showError,
        onSelect,
        onSearchButtonClick,
        fieldPlaceholder,
        icon,
        name,
        isFloatingLabel = true,
        fieldLabel,
        disabled,
        onChangeValue,
        ...rest
    } = props;
    const { control } = useFormContext();

    // ToDo Remove mock options
    // eslint-disable-next-line @typescript-eslint/ban-types
    const [options, setOptions] = useState<SelectProps<object>["options"]>([]);
    const [searchText, setSearchText] = useState<string>("");
    const fieldRef = useRef<InputRef | null>(null);
    const [isLabelActive, setIsLabelActive] = useState(false);
    const [focus, setFocus] = useState(false);

    const handleSearch = (value: string) => {
        setOptions(value ? searchResult(value) : []);
    };

    const focusOnField = () => {
        if (fieldRef.current) {
            fieldRef.current.focus();
        }
    };

    const handleChange = (value: string) => {
        setSearchText(value);
    };

    const handleSelect = (value: string) => {
        setSearchText(value);
        if (isFunction(onSelect)) {
            onSelect(value);
        }
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
                        fieldType={EFormFieldType.autocomplete}
                        errorMessage={errorMessage}
                        label={fieldLabel}
                        isFloatingLabel={isFloatingLabel}
                        wrapperClassName={wrapperClassName}
                        showError={showError}
                    >
                        {isFloatingLabel && fieldLabel && (
                            <label
                                className={cn(
                                    `${FORM_FIELD_CLASSNAME_PREFIX}_label`,
                                    { _activeLabel: isLabelActive },
                                    { _disabled: disabled },
                                )}
                                onClick={focusOnField}
                            >
                                {fieldLabel}
                            </label>
                        )}
                        <AutoComplete
                            options={options}
                            onSelect={(value) => {
                                field.onChange(value);
                                handleSelect(value);
                            }}
                            onSearch={handleSearch}
                            size="large"
                            popupClassName={cn(
                                `${FORM_FIELD_CLASSNAME_PREFIX}_dropdown`,
                                `_${EFormFieldType.autocomplete}`,
                            )}
                            className={cn(
                                `${FORM_FIELD_CLASSNAME_PREFIX}_field`,
                                {
                                    _floatingLabel:
                                        isFloatingLabel && fieldLabel,
                                    _activeLabel:
                                        isFloatingLabel &&
                                        fieldLabel &&
                                        isLabelActive,
                                },
                            )}
                            value={field.value}
                        >
                            <Input
                                {...field}
                                {...rest}
                                size="large"
                                ref={fieldRef}
                                placeholder={
                                    isFloatingLabel && fieldLabel
                                        ? undefined
                                        : fieldPlaceholder
                                }
                                value={field.value}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    field.onChange(val);
                                    handleChange(val);
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
                                disabled={disabled}
                                addonBefore={
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (
                                                searchText &&
                                                isFunction(onSearchButtonClick)
                                            ) {
                                                onSearchButtonClick(searchText);
                                            }
                                        }}
                                    >
                                        {icon ?? (
                                            <IconSearch opacity={"0.36"} />
                                        )}
                                    </button>
                                }
                            />
                        </AutoComplete>
                    </FormItemWrapper>
                );
            }}
        />
    );
};

export default FieldAutoComplete;
