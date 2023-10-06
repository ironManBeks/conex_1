import { FC, useState } from "react";
import cn from "classnames";
import { AutoComplete, Input } from "antd";
import type { DefaultOptionType } from "antd/es/select";
import { isFunction } from "lodash";

import { IconSearch } from "@components/Icons";
import FormItemWrapper from "@components/form/FormItemWrapper";

import { FORM_FIELD_CLASSNAME_PREFIX } from "@components/form/consts";
import { EFormFieldType } from "@components/form/types";
import { TFieldAutoCompleteController } from "@components/form/formControllers/FieldAutoCompleteController/types";

const FormFieldAutoComplete: FC<
    TFieldAutoCompleteController & { fieldValue: string }
> = (props) => {
    const {
        wrapperClassName,
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

    const [options, setOptions] = useState<DefaultOptionType[]>([]);

    const handleSearch = (value: string) => {
        setOptions(
            !value
                ? []
                : [
                      { label: value, value: value },
                      { label: value + value, value: value + value },
                      {
                          label: value + value + value,
                          value: value + value + value,
                      },
                  ],
        );
    };

    const handleSelect = (value: string, option: DefaultOptionType) => {
        // setSearchText(value);
        if (isFunction(onSelect)) {
            onSelect(value, option);
        }
    };

    return (
        <FormItemWrapper
            fieldType={EFormFieldType.autocomplete}
            errorMessage={undefined}
            label={fieldLabel}
            wrapperClassName={wrapperClassName}
            showError={showError}
        >
            <AutoComplete
                options={options}
                onSelect={(value, option) => {
                    handleSelect(value, option);
                }}
                onSearch={handleSearch}
                popupClassName={cn(
                    `${FORM_FIELD_CLASSNAME_PREFIX}_dropdown`,
                    `_${EFormFieldType.autocomplete}`,
                )}
                className={cn(`${FORM_FIELD_CLASSNAME_PREFIX}_field`)}
                value={fieldValue}
                style={{
                    width: 200,
                }}
            >
                <Input
                    {...rest}
                    allowClear={false}
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
