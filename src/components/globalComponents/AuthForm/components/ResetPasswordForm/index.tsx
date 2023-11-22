import React, { FC } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { isFunction } from "lodash";
import cn from "classnames";
import { inject, observer } from "mobx-react";

import ButtonPrimary from "@components/buttons/ButtonPrimary";
import { P } from "@components/Text";
import FieldPasswordController from "@components/form/formControllers/FieldPasswordController";

import { EButtonColor } from "@components/buttons/types";
import { IRoot } from "@store/store";
import { useRouter } from "next/router";
import { PATH_MY_ACCOUNT_PAGE } from "@consts/pathsConsts";

import {
    EResetPasswordFormFieldsNames,
    resetPasswordFormDefaultValues,
    resetPasswordFormResolver,
    TResetPasswordForm,
} from "./formAttrs";
import { AUTH_FORM_CLASSNAME_PREFIX, RESET_PASSWORD_QUERY } from "../../consts";
import { EAuthFormType, TAuthFormProps, TAuthFormTypes } from "../../types";
import AuthActions from "../AuthActions";
import { AUTH_FORM_QUERY } from "@consts/queryNamesConsts";

const ResetPasswordForm: FC<TAuthFormProps & TAuthFormTypes> = inject("store")(
    observer(({ store, className, onAuth }) => {
        const { authStore } = store as IRoot;
        const { authRequestFetching, resetPasswordRequest } = authStore;
        const methods = useForm<TResetPasswordForm>({
            resolver: resetPasswordFormResolver(),
            defaultValues: resetPasswordFormDefaultValues,
        });
        const router = useRouter();

        const resetPasswordCode = router.query[RESET_PASSWORD_QUERY];

        const { handleSubmit } = methods;

        const onSubmit: SubmitHandler<TResetPasswordForm> = (data) => {
            if (typeof resetPasswordCode === "string")
                resetPasswordRequest({ ...data, code: resetPasswordCode }).then(
                    () =>
                        router.push(PATH_MY_ACCOUNT_PAGE, {
                            query: { [AUTH_FORM_QUERY]: EAuthFormType.login },
                        }),
                );
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
                    <AuthActions>
                        <ButtonPrimary
                            type="submit"
                            color={EButtonColor.primary}
                            isLoading={authRequestFetching}
                            disabled={authRequestFetching}
                        >
                            Change password
                        </ButtonPrimary>
                    </AuthActions>
                </form>
            </FormProvider>
        );
    }),
);

export default ResetPasswordForm;
