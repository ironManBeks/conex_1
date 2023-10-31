import React, { FC } from "react";

import { P } from "@components/Text";

import { AUTH_FORM_CLASSNAME_PREFIX } from "../consts";
import { EAuthFormType, TAuthFooter } from "../types";
import { useSelectAuthForm } from "@hooks/useSelectAuthForm";

const AuthFooter: FC<TAuthFooter> = () => {
    const classPrefix = `${AUTH_FORM_CLASSNAME_PREFIX}_footer`;
    const { currentForm, setForm } = useSelectAuthForm();

    const content = () => {
        if (currentForm === EAuthFormType.login) {
            return (
                <P>
                    Don’t have an account?{" "}
                    <a onClick={() => setForm(EAuthFormType.register)}>
                        Sign Up
                    </a>
                </P>
            );
        }
        return (
            <P>
                Already have an account?{" "}
                <a onClick={() => setForm(EAuthFormType.login)}>Log In</a>
            </P>
        );
    };

    return <div className={`${classPrefix}__wrapper`}>{content()}</div>;
};

export default AuthFooter;
