import React, { FC, useEffect, useMemo, useState } from "react";

import ImgWrapper from "@components/globalComponents/ImgWrapper";
import { LogoMain } from "@components/Icons";
import { P } from "@components/Text";
import Segmented from "@components/globalComponents/Segmented";

import { AUTH_FORM_CLASSNAME_PREFIX } from "../consts";
import { EAuthFormType, TAuthHeader } from "../types";

const image = (
    <ImgWrapper
        src="/images/svg/auth-form.svg"
        alt="Image: Auth form"
        width="185"
        height="113"
    />
);

const AuthHead: FC<TAuthHeader> = ({ formType, setFormType }) => {
    const classPrefix = `${AUTH_FORM_CLASSNAME_PREFIX}_header`;

    const segmentedOptions = [
        {
            value: EAuthFormType.register,
            label: "Sign Up",
        },
        {
            value: EAuthFormType.login,
            label: "Log in",
        },
    ];

    const handleSegmentedChange = (val: EAuthFormType) => {
        setFormType(val);
    };

    const content = useMemo(() => {
        if (
            formType === EAuthFormType.login ||
            formType === EAuthFormType.register
        ) {
            return (
                <>
                    <Segmented
                        options={segmentedOptions}
                        value={formType}
                        onChange={(val) => {
                            handleSegmentedChange(val as EAuthFormType);
                        }}
                        className={`${classPrefix}__segmented`}
                        viewStyle="block"
                    />
                    <P> Log in to your account or create</P>
                    {image}
                </>
            );
        }

        if (formType === EAuthFormType.resetPassword) {
            return (
                <P>
                    Fill in your new password and we'll send you a link to
                    update your password.
                </P>
            );
        }

        return null;
    }, [formType]);

    return (
        <div className={`${classPrefix}__wrapper`}>
            <div className={`${classPrefix}__logo`}>
                <LogoMain />
            </div>
            {content}
        </div>
    );
};

export default AuthHead;
