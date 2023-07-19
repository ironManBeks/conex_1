import { FC, useRef } from "react";
import cn from "classnames";
import { Select as AntSelect } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import type { BaseSelectRef } from "rc-select";

import FormItemWrapper from "@components/form/FormItemWrapper";

import { EFormFieldType } from "@components/form/types";
import { TFieldSelectController } from "./types";
import { isFunction } from "lodash";
import { FORM_FIELD_CLASSNAME_PREFIX } from "@components/form/consts";

const FieldSelectController: FC<TFieldSelectController> = (props) => {
    const {
        name,
        onChangeValue,
        label,
        wrapperClassName,
        disabled,
        showSearch = true,
        allowClear = true,
        mode,
        ...rest
    } = props;
    const {
        control,
        formState: { errors, touchedFields },
    } = useFormContext();
    const errorMessage = errors[name]?.message;
    const isError = !!errorMessage && !!touchedFields;
    const fieldRef = useRef<BaseSelectRef | null>(null);

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <FormItemWrapper
                    fieldType={EFormFieldType.select}
                    errorMessage={errorMessage}
                    label={label}
                    wrapperClassName={wrapperClassName}
                >
                    <AntSelect
                        {...field}
                        {...rest}
                        ref={fieldRef}
                        className={cn(`${FORM_FIELD_CLASSNAME_PREFIX}_field`, {
                            _disabled: disabled,
                        })}
                        popupClassName={cn(
                            `${FORM_FIELD_CLASSNAME_PREFIX}_dropdown`,
                            `_${EFormFieldType.select}`,
                        )}
                        onChange={(val) => {
                            field.onChange(val);
                            if (isFunction(onChangeValue)) onChangeValue(val);
                        }}
                        disabled={disabled}
                        showSearch={showSearch}
                        allowClear={allowClear}
                        mode={mode}
                    />
                </FormItemWrapper>
            )}
        />
    );
};

export default FieldSelectController;
