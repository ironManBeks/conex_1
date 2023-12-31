import React, { FC } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { isFunction } from "lodash";
import cn from "classnames";
import { inject, observer } from "mobx-react";

import FieldInputController from "@components/form/formControllers/FieldInputController";
import FieldPasswordController from "@components/form/formControllers/FieldPasswordController";
import ButtonPrimary from "@components/buttons/ButtonPrimary";
import AuthActions from "../AuthActions";

import { EAuthFormType, TAuthFormProps } from "../../types";
import { AUTH_FORM_CLASSNAME_PREFIX } from "../../consts";
import { EButtonColor } from "@components/buttons/types";
import {
    ESignUpFormFieldsNames,
    signUpFormDefaultValues,
    signUpFormResolver,
    TSignUpForm,
} from "./formAttrs";
import { IRoot } from "@store/store";
import { useSelectAuthForm } from "@hooks/useSelectAuthForm";

const SignUpForm: FC<TAuthFormProps> = inject("store")(
    observer(({ store, className, onAuth }) => {
        const { authStore } = store as IRoot;
        const { setForm } = useSelectAuthForm();
        const { authRequestFetching, authSignUpRequest } = authStore;
        const methods = useForm<TSignUpForm>({
            resolver: signUpFormResolver(),
            defaultValues: signUpFormDefaultValues,
        });

        const { handleSubmit } = methods;

        const onSubmit: SubmitHandler<TSignUpForm> = (data) => {
            authSignUpRequest(data).then(() => {
                setForm(EAuthFormType.login);
            });
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
                        name={ESignUpFormFieldsNames.username}
                        placeholder="Username"
                        label="Username"
                    />
                    <FieldInputController
                        name={ESignUpFormFieldsNames.email}
                        placeholder="Email"
                        label="Email"
                    />
                    <FieldPasswordController
                        name={ESignUpFormFieldsNames.password}
                        placeholder="Password"
                        label="Password"
                    />
                    <AuthActions>
                        <ButtonPrimary
                            type="submit"
                            color={EButtonColor.primary}
                            isLoading={authRequestFetching}
                            disabled={authRequestFetching}
                        >
                            Sign up
                        </ButtonPrimary>
                    </AuthActions>
                </form>
            </FormProvider>
        );
    }),
);

export default SignUpForm;
