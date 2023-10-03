import { FC, useEffect, useRef, useState } from "react";
import cn from "classnames";
import { AutoComplete, Input, InputRef } from "antd";
import type { SelectProps } from "antd/es/select";
import { isFunction } from "lodash";

import { IconSearch } from "@components/Icons";
import FormItemWrapper from "@components/form/FormItemWrapper";

import { FORM_FIELD_CLASSNAME_PREFIX } from "@components/form/consts";
import { EFormFieldType } from "@components/form/types";
import { TFieldAutoCompleteController } from "@components/form/formControllers/FieldAutoComplete/types";
import { BaseSelectRef } from "rc-select";

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

const FormFieldAutoComplete: FC<TFieldAutoCompleteController> = (props) => {
    const {
        wrapperClassName,
        errorMessage,
        showError,
        onSelect,
        onAddonButtonClick,
        icon,
        fieldLabel,
        disabled,
        onChangeValue,
        fieldPlaceholder,
        fieldValue,
        ...rest
    } = props;

    // ToDo Remove mock options
    // eslint-disable-next-line @typescript-eslint/ban-types
    const [options, setOptions] = useState<SelectProps<object>["options"]>([]);

    const handleSearch = (value: string) => {
        setOptions(value ? searchResult(value) : []);
    };

    const handleSelect = (value: string) => {
        // setSearchText(value);
        if (isFunction(onSelect)) {
            onSelect(value);
        }
    };

    return (
        <FormItemWrapper
            fieldType={EFormFieldType.autocomplete}
            errorMessage={errorMessage}
            label={fieldLabel}
            wrapperClassName={wrapperClassName}
            showError={showError}
        >
            <AutoComplete
                options={options}
                onSelect={(value) => {
                    handleSelect(value);
                }}
                onSearch={handleSearch}
                size="large"
                popupClassName={cn(
                    `${FORM_FIELD_CLASSNAME_PREFIX}_dropdown`,
                    `_${EFormFieldType.autocomplete}`,
                )}
                className={cn(`${FORM_FIELD_CLASSNAME_PREFIX}_field`)}
                value={fieldValue}
            >
                <Input
                    {...rest}
                    size="large"
                    onChange={(e) => {
                        const val = e.target.value;
                        // handleChange(val);
                        if (onChangeValue) onChangeValue(val);
                    }}
                    disabled={disabled}
                    placeholder={fieldPlaceholder}
                    addonBefore={
                        <button
                            type="button"
                            onClick={() => {
                                if (
                                    fieldValue &&
                                    isFunction(onAddonButtonClick)
                                ) {
                                    onAddonButtonClick(fieldValue);
                                }
                            }}
                        >
                            {icon ?? <IconSearch opacity={"0.36"} />}
                        </button>
                    }
                />
            </AutoComplete>
        </FormItemWrapper>
    );
};

export default FormFieldAutoComplete;
