import { FC, useState } from "react";
import { Input as AntInput } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import cn from "classnames";

import FormItemWrapper from "@components/form/FormItemWrapper";
import { IconEyeOpen, IconEyeClose } from "@components/Icons";

import { FORM_FIELD_CLASSNAME_PREFIX } from "@components/form/consts";
import { EFormFieldType } from "@components/form/types";
import { TFieldPasswordController } from "./types";

const FieldPasswordController: FC<TFieldPasswordController> = (props) => {
    const {
        name,
        onChangeValue,
        label,
        wrapperClassName,
        disabled,
        isFloatingLabel = true,
        placeholder,
        showError,
        ...rest
    } = props;
    const {
        control,
        formState: { errors },
    } = useFormContext();
    const [passwordVisible, setPasswordVisible] = useState(false);

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => {
                return (
                    <FormItemWrapper
                        fieldType={EFormFieldType.password}
                        errorMessage={errors[name]?.message}
                        wrapperClassName={wrapperClassName}
                        showError={showError}
                        label={label}
                        isFloatingLabel={isFloatingLabel}
                        fieldValue={field.value}
                        disabled={!!disabled}
                    >
                        <AntInput.Password
                            {...field}
                            {...rest}
                            className={cn(
                                `${FORM_FIELD_CLASSNAME_PREFIX}_field`,
                                { _visible: passwordVisible },
                            )}
                            value={field.value}
                            onChange={(e) => {
                                const val = e.target.value;
                                field.onChange(val);
                                if (onChangeValue) onChangeValue(val);
                            }}
                            disabled={disabled}
                            placeholder={
                                isFloatingLabel && label
                                    ? undefined
                                    : placeholder
                            }
                            iconRender={(visible) =>
                                visible ? (
                                    <IconEyeOpen
                                        onClick={() =>
                                            setPasswordVisible(
                                                (prevState) => !prevState,
                                            )
                                        }
                                        width={20}
                                        height={20}
                                    />
                                ) : (
                                    <IconEyeClose
                                        onClick={() =>
                                            setPasswordVisible(
                                                (prevState) => !prevState,
                                            )
                                        }
                                        width={20}
                                        height={20}
                                    />
                                )
                            }
                        />
                    </FormItemWrapper>
                );
            }}
        />
    );
};

export default FieldPasswordController;
