import React, { FC, useMemo, useState } from "react";

import { P } from "@components/Text";

import { AUTH_FORM_CLASSNAME_PREFIX } from "@components/globalComponents/AuthForm/consts";
import {
    EAuthFormType,
    TAuthFooter,
} from "@components/globalComponents/AuthForm/types";

const AuthFooter: FC<TAuthFooter> = ({ formType, setFormType }) => {
    const footerContent = useMemo(() => {
        if (formType === EAuthFormType.register) {
            return (
                <>
                    Already have an account?{" "}
                    <a onClick={() => setFormType(EAuthFormType.login)}>
                        Log In
                    </a>
                </>
            );
        }

        return (
            <>
                Don’t have an account?{" "}
                <a onClick={() => setFormType(EAuthFormType.register)}>
                    Sign Up
                </a>
            </>
        );
    }, [formType]);

    return (
        <div className={`${AUTH_FORM_CLASSNAME_PREFIX}_footer`}>
            <P>{footerContent}</P>
        </div>
    );
};

export default AuthFooter;
