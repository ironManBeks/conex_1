import React, { FC } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { isFunction } from "lodash";
import cn from "classnames";
import { inject, observer } from "mobx-react";

import FieldInputController from "@components/form/formControllers/FieldInputController";
import ButtonPrimary from "@components/buttons/ButtonPrimary";
import { P } from "@components/Text";
import AuthActions from "../AuthActions";

import { TAuthFormProps, TAuthFormTypes } from "../../types";
import { AUTH_FORM_CLASSNAME_PREFIX } from "../../consts";
import { EButtonColor } from "@components/buttons/types";
import {
    EForgotPasswordFormFieldsNames,
    forgotPasswordFormDefaultValues,
    forgotPasswordFormResolver,
    TForgotPasswordForm,
} from "./formAttrs";
import { IRoot } from "@store/store";

const ForgotPasswordForm: FC<TAuthFormProps & TAuthFormTypes> = inject("store")(
    observer(({ store, className, onAuth }) => {
        const { authStore } = store as IRoot;

        const { authRequestFetching, forgotPasswordRequest } = authStore;
        const methods = useForm<TForgotPasswordForm>({
            resolver: forgotPasswordFormResolver(),
            defaultValues: forgotPasswordFormDefaultValues,
        });

        const { handleSubmit } = methods;

        const onSubmit: SubmitHandler<TForgotPasswordForm> = (data) => {
            forgotPasswordRequest(data);
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
                    <P>
                        Fill in your email and we'll send you a link to reset
                        your password.
                    </P>
                    <FieldInputController
                        name={EForgotPasswordFormFieldsNames.email}
                        placeholder="Email"
                        label="Email"
                    />
                    <P>
                        If link doesn’t appear within a few minutes, check your
                        spam folder.
                    </P>
                    <AuthActions>
                        <ButtonPrimary
                            type="submit"
                            color={EButtonColor.primary}
                            isLoading={authRequestFetching}
                            disabled={authRequestFetching}
                        >
                            Reset password
                        </ButtonPrimary>
                    </AuthActions>
                </form>
            </FormProvider>
        );
    }),
);

export default ForgotPasswordForm;
