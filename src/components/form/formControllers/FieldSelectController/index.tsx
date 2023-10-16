import { FC } from "react";
import cn from "classnames";
import { Select as AntSelect } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import { isFunction } from "lodash";

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
        allowClear,
        isFloatingLabel = true,
        placeholder,
        showError,
        mode,
        ...rest
    } = props;
    const {
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => {
                return (
                    <FormItemWrapper
                        fieldType={EFormFieldType.select}
                        errorMessage={errors[name]?.message}
                        wrapperClassName={wrapperClassName}
                        showError={showError}
                        label={label}
                        isFloatingLabel={isFloatingLabel}
                        fieldValue={field.value}
                        disabled={!!disabled}
                    >
                        <AntSelect
                            {...field}
                            {...rest}
                            className={cn(
                                `${FORM_FIELD_CLASSNAME_PREFIX}_field`,
                                {
                                    _disabled: disabled,
                                },
                            )}
                            popupClassName={cn(
                                `${FORM_FIELD_CLASSNAME_PREFIX}_dropdown`,
                                `_${EFormFieldType.select}`,
                            )}
                            onChange={(val) => {
                                field.onChange(val);
                                if (isFunction(onChangeValue))
                                    onChangeValue(val);
                            }}
                            onClick={(e) => {
                                e.stopPropagation();
                            }}
                            suffixIcon={
                                <IconArrowSingle
                                    direction={EArrowDirection.bottom}
                                />
                            }
                            allowClear={
                                allowClear || { clearIcon: <IconCross /> }
                            }
                            disabled={disabled}
                            showSearch={showSearch}
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
