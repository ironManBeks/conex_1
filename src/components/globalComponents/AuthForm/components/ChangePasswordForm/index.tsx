import React, { FC } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { isFunction } from "lodash";
import cn from "classnames";
import { observer } from "mobx-react";

import ButtonPrimary from "@components/buttons/ButtonPrimary";
import FieldPasswordController from "@components/form/formControllers/FieldPasswordController";

import { EButtonColor } from "@components/buttons/types";
import {
    changePasswordFormDefaultValues,
    changePasswordFormResolver,
    EChangePasswordFormFieldsNames,
    TChangePasswordForm,
} from "./formAttrs";
import { AUTH_FORM_CLASSNAME_PREFIX } from "../../consts";
import { TAuthFormProps, TAuthFormTypes } from "../../types";
import { useRootStore } from "@store";

const ChangePasswordForm: FC<TAuthFormProps & TAuthFormTypes> = observer(
    ({ className, onAuth }) => {
        const { authStore } = useRootStore();
        const { authRequestFetching, changePasswordRequest } = authStore;
        const methods = useForm<TChangePasswordForm>({
            resolver: changePasswordFormResolver(),
            defaultValues: changePasswordFormDefaultValues,
        });

        const { handleSubmit } = methods;

        const onSubmit: SubmitHandler<TChangePasswordForm> = (data) => {
            changePasswordRequest(data);
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
                        name={EChangePasswordFormFieldsNames.currentPassword}
                        placeholder="Old password"
                        label="Old password"
                    />
                    <FieldPasswordController
                        name={
                            EChangePasswordFormFieldsNames.passwordConfirmation
                        }
                        placeholder="New password"
                        label="New password"
                    />
                    <FieldPasswordController
                        name={
                            EChangePasswordFormFieldsNames.passwordConfirmation
                        }
                        placeholder="Confirm password"
                        label="Confirm password"
                    />
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

export default ChangePasswordForm;
