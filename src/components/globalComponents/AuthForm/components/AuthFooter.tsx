import React, { FC, useMemo } from "react";

import { P } from "@components/Text";

import { AUTH_FORM_CLASSNAME_PREFIX } from "../consts";
import { EAuthFormType, TAuthFooter } from "../types";

const AuthFooter: FC<TAuthFooter> = ({ formType, setFormType }) => {
    const classPrefix = `${AUTH_FORM_CLASSNAME_PREFIX}_footer`;

    const content = useMemo(() => {
        if (formType === EAuthFormType.login) {
            return (
                <P>
                    Don’t have an account?{" "}
                    <a onClick={() => setFormType(EAuthFormType.register)}>
                        Sign Up
                    </a>
                </P>
            );
        }

        return (
            <P>
                Already have an account?{" "}
                <a onClick={() => setFormType(EAuthFormType.login)}>Log In</a>
            </P>
        );
    }, [formType]);

    return content ? (
        <div className={`${classPrefix}__wrapper`}>{content}</div>
    ) : null;
};

export default AuthFooter;
