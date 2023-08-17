import cn from "classnames";
import React, { FC, useMemo, useState } from "react";
import { observer } from "mobx-react";
import { isFunction } from "lodash";

import ImgWrapper from "@components/globalComponents/ImgWrapper";
import { P } from "@components/Text";
import SignInForm from "./components/SignInForm";
import SignUpForm from "./components/SignUpForm";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import ResetPasswordForm from "./components/ResetPasswordForm";
import ChangePasswordForm from "./components/ChangePasswordForm";
import EmailConfirmationForm from "./components/EmailConfirmationForm";

import AuthFooter from "./components/AuthFooter";

import { AUTH_FORM_CLASSNAME_PREFIX } from "./consts";
import { EAuthFormType, TAuthFormProps } from "./types";

const AuthForm: FC<TAuthFormProps> = observer(({ className, onAuth }) => {
    const [formType, setFormType] = useState<EAuthFormType>(
        EAuthFormType.login,
    );

    const onAuthSuccess = () => {
        if (isFunction(onAuth)) {
            onAuth();
        }
    };

    const formContent = useMemo(() => {
        if (formType === EAuthFormType.login) {
            return <SignInForm setFormType={setFormType} formType={formType} />;
        }

        if (formType === EAuthFormType.register) {
            return <SignUpForm />;
        }

        if (formType === EAuthFormType.forgotPassword) {
            return (
                <ForgotPasswordForm
                    setFormType={setFormType}
                    formType={formType}
                />
            );
        }

        if (formType === EAuthFormType.resetPassword) {
            return (
                <ResetPasswordForm
                    setFormType={setFormType}
                    formType={formType}
                />
            );
        }

        if (formType === EAuthFormType.changePassword) {
            return (
                <ChangePasswordForm
                    setFormType={setFormType}
                    formType={formType}
                />
            );
        }

        if (formType === EAuthFormType.sendEmailConfirmation) {
            return (
                <EmailConfirmationForm
                    setFormType={setFormType}
                    formType={formType}
                />
            );
        }

        return (
            <P style={{ textAlign: "center" }}>
                Form not found. <br /> Try to reload the page or report an error
                to the site administration
            </P>
        );
    }, [formType, onAuth]);

    return (
        <div className={cn(`${AUTH_FORM_CLASSNAME_PREFIX}_wrapper`, className)}>
            <ImgWrapper
                src="/images/svg/auth-form.svg"
                alt="Image: Auth form"
                width="185"
                height="113"
            />
            {/*<LoginWithGoogle />*/}
            {/*<LoginWithApple />*/}
            {/*<P className="divider">or</P>*/}
            {formContent}
            <AuthFooter formType={formType} setFormType={setFormType} />
        </div>
    );
});

export default AuthForm;
