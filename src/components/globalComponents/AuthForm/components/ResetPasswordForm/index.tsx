import React, { FC } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { isFunction } from "lodash";
import cn from "classnames";
import { observer } from "mobx-react";

import ButtonPrimary from "@components/buttons/ButtonPrimary";
import { P } from "@components/Text";
import FieldPasswordController from "@components/form/formControllers/FieldPasswordController";

import { EButtonColor } from "@components/buttons/types";
import {
    EResetPasswordFormFieldsNames,
    resetPasswordFormDefaultValues,
    resetPasswordFormResolver,
    TResetPasswordForm,
} from "./formAttrs";
import { AUTH_FORM_CLASSNAME_PREFIX } from "../../consts";
import { TAuthFormProps, TAuthFormTypes } from "../../types";
import { useRootStore } from "@store";

const ResetPasswordForm: FC<TAuthFormProps & TAuthFormTypes> = observer(
    ({ className, onAuth }) => {
        const { authStore } = useRootStore();
        const { authRequestFetching, resetPasswordRequest } = authStore;
        const methods = useForm<TResetPasswordForm>({
            resolver: resetPasswordFormResolver(),
            defaultValues: resetPasswordFormDefaultValues,
        });

        const { handleSubmit } = methods;

        const onSubmit: SubmitHandler<TResetPasswordForm> = (data) => {
            resetPasswordRequest({ ...data, code: "what?" });
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
                        Fill in your new password and we'll send you a link to
                        update your password.
                    </P>
                    <FieldPasswordController
                        name={EResetPasswordFormFieldsNames.password}
                        placeholder="Password"
                        label="Password"
                    />
                    <FieldPasswordController
                        name={
                            EResetPasswordFormFieldsNames.passwordConfirmation
                        }
                        placeholder="Confirm password"
                        label="Confirm password"
                    />
                    <P>
                        If link doesn’t appear within a few minutes, check your
                        spam folder.
                    </P>
                    <div className={`${AUTH_FORM_CLASSNAME_PREFIX}_actions`}>
                        <ButtonPrimary
                            type="submit"
                            color={EButtonColor.primary}
                            isLoading={authRequestFetching}
                            disabled={authRequestFetching}
                        >
                            Change password
                        </ButtonPrimary>
                    </div>
                </form>
            </FormProvider>
        );
    },
);

export default ResetPasswordForm;
