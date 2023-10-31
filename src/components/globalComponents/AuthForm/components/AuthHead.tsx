import React, { FC } from "react";

import ImgWrapper from "@components/globalComponents/ImgWrapper";
import { LogoMain } from "@components/Icons";
import { P } from "@components/Text";
import Segmented from "@components/globalComponents/Segmented";

import { AUTH_FORM_CLASSNAME_PREFIX } from "../consts";
import { EAuthFormType, TAuthHeader } from "../types";
import { useSelectAuthForm } from "@hooks/useSelectAuthForm";

const image = (
    <ImgWrapper
        src="/images/svg/auth-form.svg"
        alt="Image: Auth form"
        width="185"
        height="113"
    />
);

const AuthHead: FC<TAuthHeader> = () => {
    const classPrefix = `${AUTH_FORM_CLASSNAME_PREFIX}_header`;
    const { currentForm, setForm } = useSelectAuthForm();

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
        setForm(val);
    };

    const content = () => {
        if (
            currentForm === EAuthFormType.login ||
            currentForm === EAuthFormType.register
        ) {
            return (
                <>
                    <Segmented
                        options={segmentedOptions}
                        value={currentForm}
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

        if (currentForm === EAuthFormType.resetPassword) {
            return (
                <P>
                    Fill in your new password and we'll send you a link to
                    update your password.
                </P>
            );
        }

        return null;
    };

    return (
        <div className={`${classPrefix}__wrapper`}>
            <div className={`${classPrefix}__logo`}>
                <LogoMain />
            </div>
            {content()}
        </div>
    );
};

export default AuthHead;
