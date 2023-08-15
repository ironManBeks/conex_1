import { FC, useEffect, useRef, useState } from "react";
import { Input as AntInput, InputRef } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import cn from "classnames";

import FormItemWrapper from "@components/form/FormItemWrapper";

import { FORM_FIELD_CLASSNAME_PREFIX } from "@components/form/consts";

import { EFormFieldType } from "@components/form/types";
import { TFieldPasswordController } from "./types";
import { IconEyeOpen, IconEyeClose } from "@components/Icons";

const FieldPasswordController: FC<TFieldPasswordController> = (props) => {
    const { name, onChangeValue, label, wrapperClassName, disabled, ...rest } =
        props;
    const {
        control,
        formState: { errors, touchedFields },
    } = useFormContext();
    const errorMessage = errors[name]?.message;
    const isError = !!errorMessage && !!touchedFields;
    const fieldRef = useRef<InputRef | null>(null);
    const [passwordVisible, setPasswordVisible] = useState(false);

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => {
                return (
                    <FormItemWrapper
                        fieldType={EFormFieldType.password}
                        errorMessage={errorMessage}
                        label={label}
                        wrapperClassName={wrapperClassName}
                    >
                        <AntInput.Password
                            {...field}
                            {...rest}
                            ref={fieldRef}
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
                            iconRender={(visible) =>
                                visible ? (
                                    <IconEyeOpen
                                        onClick={() =>
                                            setPasswordVisible(
                                                (prevState) => !prevState,
                                            )
                                        }
                                        width={16}
                                        height={16}
                                    />
                                ) : (
                                    <IconEyeClose
                                        onClick={() =>
                                            setPasswordVisible(
                                                (prevState) => !prevState,
                                            )
                                        }
                                        width={16}
                                        height={16}
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
