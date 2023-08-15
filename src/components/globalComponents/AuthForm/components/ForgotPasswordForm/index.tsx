import React, { FC } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { isFunction } from "lodash";
import cn from "classnames";
import { observer } from "mobx-react";

import FieldInputController from "@components/form/formControllers/FieldInputController";
import ButtonPrimary from "@components/buttons/ButtonPrimary";
import { H2, P } from "@components/Text";

import { notImplemented } from "@helpers/notImplemented";
import { TAuthFormProps, TAuthFormTypes } from "../../types";
import { AUTH_FORM_CLASSNAME_PREFIX } from "@components/globalComponents/AuthForm/consts";
import { EButtonColor } from "@components/buttons/types";
import {
    EForgotPasswordFormFieldsNames,
    forgotPasswordFormDefaultValues,
    forgotPasswordFormResolver,
    TForgotPasswordForm,
} from "./formAttrs";

const ForgotPasswordForm: FC<TAuthFormProps & TAuthFormTypes> = observer(
    ({ className, onAuth, setFormType }) => {
        const methods = useForm<TForgotPasswordForm>({
            resolver: forgotPasswordFormResolver(),
            defaultValues: forgotPasswordFormDefaultValues,
        });

        const { handleSubmit } = methods;

        const onSubmit: SubmitHandler<TForgotPasswordForm> = (data) => {
            notImplemented(`value: ${JSON.stringify(data)}`);
            if (isFunction(onAuth)) {
                onAuth();
            }
        };

        return (
            <FormProvider {...methods}>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className={cn(
                        `${AUTH_FORM_CLASSNAME_PREFIX}_form`,
                        className,
                    )}
                >
                    <H2>Forgot your password?</H2>
                    <P>
                        No worries! Fill in your email and we'll send you a link
                        to reset your password
                    </P>
                    <FieldInputController
                        name={EForgotPasswordFormFieldsNames.email}
                        placeholder="Email"
                        label="Email"
                    />
                    <div className={`${AUTH_FORM_CLASSNAME_PREFIX}_actions`}>
                        <ButtonPrimary
                            type="submit"
                            color={EButtonColor.primary}
                        >
                            Reset password
                        </ButtonPrimary>
                    </div>
                </form>
            </FormProvider>
        );
    },
);

export default ForgotPasswordForm;
