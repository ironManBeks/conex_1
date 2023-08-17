import React, { FC } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { isFunction } from "lodash";
import cn from "classnames";
import { observer } from "mobx-react";

import ButtonPrimary from "@components/buttons/ButtonPrimary";
import FieldInputController from "@components/form/formControllers/FieldInputController";

import { EButtonColor } from "@components/buttons/types";
import { AUTH_FORM_CLASSNAME_PREFIX } from "../../consts";
import { TAuthFormProps, TAuthFormTypes } from "../../types";
import {
    EEmailConfirmationFormFieldsNames,
    emailConfirmationFormDefaultValues,
    emailConfirmationFormResolver,
    TEmailConfirmationForm,
} from "./formAttrs";
import { useRootStore } from "@store";

const ChangePasswordForm: FC<TAuthFormProps & TAuthFormTypes> = observer(
    ({ className, onAuth }) => {
        const { authStore } = useRootStore();
        const { authRequestFetching, emailConfirmationRequest } = authStore;
        const methods = useForm<TEmailConfirmationForm>({
            resolver: emailConfirmationFormResolver(),
            defaultValues: emailConfirmationFormDefaultValues,
        });

        const { handleSubmit } = methods;

        const onSubmit: SubmitHandler<TEmailConfirmationForm> = (data) => {
            emailConfirmationRequest(data);
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
                    <FieldInputController
                        name={EEmailConfirmationFormFieldsNames.email}
                        placeholder="Email"
                        label="Email"
                    />
                    <div className={`${AUTH_FORM_CLASSNAME_PREFIX}_actions`}>
                        <ButtonPrimary
                            type="submit"
                            color={EButtonColor.primary}
                            isLoading={authRequestFetching}
                            disabled={authRequestFetching}
                        >
                            Confirm email
                        </ButtonPrimary>
                    </div>
                </form>
            </FormProvider>
        );
    },
);

export default ChangePasswordForm;
