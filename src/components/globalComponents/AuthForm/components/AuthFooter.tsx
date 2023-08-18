import React, { FC, useMemo, useState } from "react";

import { P } from "@components/Text";

import { AUTH_FORM_CLASSNAME_PREFIX } from "@components/globalComponents/AuthForm/consts";
import {
    EAuthFormType,
    TAuthFooter,
} from "@components/globalComponents/AuthForm/types";

const AuthFooter: FC<TAuthFooter> = ({ formType, setFormType }) => {
    const footerContent = useMemo(() => {
        if (formType === EAuthFormType.login) {
            return (
                <>
                    Don’t have an account?{" "}
                    <a onClick={() => setFormType(EAuthFormType.register)}>
                        Sign Up
                    </a>
                </>
            );
        }

        return (
            <>
                Already have an account?{" "}
                <a onClick={() => setFormType(EAuthFormType.login)}>Log In</a>
            </>
        );
    }, [formType]);

    return (
        <div className={`${AUTH_FORM_CLASSNAME_PREFIX}_footer`}>
            <P>{footerContent}</P>
            <a onClick={() => setFormType(EAuthFormType.resetPassword)}>
                Reset password? (this link will be removed)
            </a>
            <br />
            <a onClick={() => setFormType(EAuthFormType.changePassword)}>
                Change password? (this link will be removed)
            </a>
            <br />
            <a onClick={() => setFormType(EAuthFormType.sendEmailConfirmation)}>
                Email confirmation? (this link will be removed)
            </a>
        </div>
    );
};

export default AuthFooter;
