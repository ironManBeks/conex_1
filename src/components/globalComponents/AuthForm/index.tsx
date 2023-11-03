import cn from "classnames";
import React, { FC } from "react";

import SignInForm from "./components/SignInForm";
import SignUpForm from "./components/SignUpForm";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import ResetPasswordForm from "./components/ResetPasswordForm";
import ChangePasswordForm from "./components/ChangePasswordForm";
import EmailConfirmationForm from "./components/EmailConfirmationForm";

import AuthHead from "./components/AuthHead";
import AuthFooter from "./components/AuthFooter";

import { AUTH_FORM_CLASSNAME_PREFIX } from "./consts";
import { EAuthFormType, TAuthFormProps } from "./types";
import { useSelectAuthForm } from "@hooks/useSelectAuthForm";

const AuthForm: FC<TAuthFormProps> = ({ className }) => {
    const { setForm } = useSelectAuthForm();

    return (
        <div
            style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
            }}
        >
            <div
                className={cn(
                    `${AUTH_FORM_CLASSNAME_PREFIX}_wrapper`,
                    className,
                )}
            >
                <AuthHead />
                <Content />
                <AuthFooter />
                {/*<LoginWithGoogle />*/}
                {/*<LoginWithApple />*/}
            </div>
            <br />
            <a onClick={() => setForm(EAuthFormType.resetPassword)}>
                Reset password? (remove)
            </a>
            <br />
            <a onClick={() => setForm(EAuthFormType.changePassword)}>
                Change password? (remove)
            </a>
            <br />
            <a onClick={() => setForm(EAuthFormType.sendEmailConfirmation)}>
                Email confirmation? (remove)
            </a>
        </div>
    );
};

export default AuthForm;

const Content = () => {
    const { currentForm } = useSelectAuthForm();

    switch (currentForm) {
        case EAuthFormType.register:
            return <SignUpForm />;
        case EAuthFormType.forgotPassword:
            return <ForgotPasswordForm />;
        case EAuthFormType.resetPassword:
            return <ResetPasswordForm />;
        case EAuthFormType.changePassword:
            return <ChangePasswordForm />;
        case EAuthFormType.sendEmailConfirmation:
            return <EmailConfirmationForm />;
        default:
            return <SignInForm />;
    }
};
