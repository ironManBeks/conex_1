import React, { FC } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { isFunction, isNil } from "lodash";
import cn from "classnames";
import { inject, observer } from "mobx-react";

import FieldInputController from "@components/form/formControllers/FieldInputController";
import FieldPasswordController from "@components/form/formControllers/FieldPasswordController";
import ButtonPrimary from "@components/buttons/ButtonPrimary";
import AuthActions from "../AuthActions";

import { EButtonColor } from "@components/buttons/types";
import { AUTH_FORM_CLASSNAME_PREFIX } from "../../consts";
import { EAuthFormType, TAuthFormProps, TAuthFormTypes } from "../../types";
import {
    ESignInFormFieldsNames,
    signInFormDefaultValues,
    signInFormResolver,
    TSignInForm,
} from "./formAttrs";
import { IRoot } from "@store/store";
import { useSelectAuthForm } from "@hooks/useSelectAuthForm";

const SignInForm: FC<TAuthFormProps & TAuthFormTypes> = inject("store")(
    observer(({ store, className, onAuth }) => {
        const { authStore } = store as IRoot;
        const { setForm } = useSelectAuthForm();

        const {
            authRequestFetching,
            authSignInRequest,
            getUserData,
            userData,
        } = authStore;

        const methods = useForm<TSignInForm>({
            resolver: signInFormResolver(),
            defaultValues: signInFormDefaultValues,
        });

        const { handleSubmit } = methods;

        const onSubmit: SubmitHandler<TSignInForm> = (data) => {
            authSignInRequest(data).then(({ data }) => {
                if (data?.jwt && isNil(userData)) {
                    getUserData();
                }
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
                        name={ESignInFormFieldsNames.identifier}
                        placeholder="Username or email"
                        label="Username or email"
                    />
                    <FieldPasswordController
                        name={ESignInFormFieldsNames.password}
                        placeholder="Password"
                        label="Password"
                    />
                    <a onClick={() => setForm(EAuthFormType.forgotPassword)}>
                        Forgot password?
                    </a>
                    <AuthActions>
                        <ButtonPrimary
                            type="submit"
                            color={EButtonColor.primary}
                            isLoading={authRequestFetching}
                            disabled={authRequestFetching}
                        >
                            Log in
                        </ButtonPrimary>
                    </AuthActions>
                </form>
            </FormProvider>
        );
    }),
);

export default SignInForm;
