import cn from "classnames";
import React, { FC, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import FieldInputController from "@components/form/formControllers/FieldInputController";
import LoginWithApple from "./components/LoginWithApple";
import LoginWithGoogle from "./components/LoginWithGoogle";
import ButtonPrimary from "@components/buttons/ButtonPrimary";
import ImgWrapper from "@components/globalComponents/ImgWrapper";
import { P } from "@components/Text";

import {
    authFormDefaultValues,
    authFormResolver,
    EAuthFormFieldsNames,
    TAuthForm,
} from "./formAttrs";
import { notImplemented } from "@helpers/notImplemented";
import { EButtonColor } from "@components/buttons/types";
import { isFunction } from "lodash";
import { EAuthFormType } from "@components/globalComponents/AuthForm/types";

const AuthForm: FC<{ className: string; onAuth?: () => void }> = ({
    className,
    onAuth,
}) => {
    const classPrefix = "auth-form";

    const [formType, setFormType] = useState<EAuthFormType>(
        EAuthFormType.logIn,
    );

    const methods = useForm<TAuthForm>({
        resolver: authFormResolver(),
        defaultValues: authFormDefaultValues,
    });

    const { handleSubmit } = methods;

    const onSubmit: SubmitHandler<TAuthForm> = (data) => {
        notImplemented(`value: ${JSON.stringify(data)}`);
        onAuthSuccess();
    };

    const onAuthSuccess = () => {
        if (isFunction(onAuth)) {
            onAuth();
        }
    };

    return (
        <div className={cn(`${classPrefix}_wrapper`, className)}>
            <ImgWrapper
                src="/images/svg/auth-form.svg"
                alt="Image: Auth form"
                width="185"
                height="113"
            />
            <LoginWithGoogle />
            <LoginWithApple />
            <P className="divider">or</P>
            <FormProvider {...methods}>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className={`${classPrefix}_form`}
                >
                    <FieldInputController
                        name={EAuthFormFieldsNames.name}
                        placeholder="Email"
                        label="Email"
                    />
                    <FieldInputController
                        name={EAuthFormFieldsNames.password}
                        placeholder="Password"
                        label="Password"
                    />
                    <div className={`${classPrefix}_actions`}>
                        <ButtonPrimary
                            type="submit"
                            color={EButtonColor.primary}
                        >
                            {formType === EAuthFormType.logIn
                                ? "Log in"
                                : "Sign Up"}
                        </ButtonPrimary>
                    </div>
                    <div className={`${classPrefix}_footer`}>
                        <P>
                            {formType === EAuthFormType.logIn ? (
                                <>
                                    Don’t have an account?{" "}
                                    <a
                                        onClick={() =>
                                            setFormType(EAuthFormType.signUp)
                                        }
                                    >
                                        Sign Up
                                    </a>
                                </>
                            ) : (
                                <>
                                    Already have an account?{" "}
                                    <a
                                        onClick={() =>
                                            setFormType(EAuthFormType.logIn)
                                        }
                                    >
                                        Log In
                                    </a>
                                </>
                            )}
                        </P>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
};

export default AuthForm;
