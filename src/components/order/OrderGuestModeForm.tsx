import { FC, useEffect, useImperativeHandle } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import cn from "classnames";

import FieldInputController from "@components/form/formControllers/FieldInputController";

import {
    EGuestModeFormFieldsNames,
    guestModeDefaultValues,
    guestModeFormResolver,
    TGuestModeForm,
} from "./formAttrs";
import { TOrderGuestModeForm } from "./types";
import { isFunction } from "lodash";
import { FieldErrors } from "react-hook-form/dist/types/errors";

const OrderGuestModeForm: FC<TOrderGuestModeForm> = ({
    className,
    onValuesChange,
    reference,
}) => {
    const classPrefix = "order-guest-mode-form";
    const methods = useForm<TGuestModeForm>({
        mode: "all",
        resolver: guestModeFormResolver(),
        defaultValues: guestModeDefaultValues,
    });

    const fields = [
        EGuestModeFormFieldsNames.name,
        EGuestModeFormFieldsNames.phone,
    ];

    const { watch, handleSubmit, trigger, getFieldState } = methods;
    const nameValue = watch(EGuestModeFormFieldsNames.name);
    const phoneValue = watch(EGuestModeFormFieldsNames.phone);

    useImperativeHandle(reference, () => ({
        submitForm: () =>
            new Promise((resolve, reject) => {
                trigger().then((validationResult) => {
                    if (!validationResult) {
                        const errors: FieldErrors<TGuestModeForm> = {};

                        for (const field of fields) {
                            const { error } = getFieldState(field);

                            if (!error) continue;

                            errors[field] = error;
                        }
                        reject(errors);
                        return;
                    }
                    handleSubmit((data) => resolve(data))();
                });
            }),
    }));

    useEffect(() => {
        if (isFunction(onValuesChange)) {
            onValuesChange({
                [EGuestModeFormFieldsNames.name]: nameValue,
                [EGuestModeFormFieldsNames.phone]: phoneValue,
            });
        }
    }, [nameValue, phoneValue]);

    return (
        <div className={cn(`${classPrefix}_wrapper`, className)}>
            <FormProvider {...methods}>
                <form className={`${classPrefix}__form`}>
                    <FieldInputController
                        name={EGuestModeFormFieldsNames.name}
                        placeholder="Your name"
                        label="Your name"
                    />
                    <FieldInputController
                        name={EGuestModeFormFieldsNames.phone}
                        placeholder="Phone number"
                        label="Phone number"
                    />
                </form>
            </FormProvider>
        </div>
    );
};

export default OrderGuestModeForm;
