import * as yup from "yup";
import { Resolver } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { yupPasswordRequired } from "@consts/validationConsts";

export enum EResetPasswordFormFieldsNames {
    password = "password",
    passwordConfirmation = "passwordConfirmation",
}

export type TResetPasswordForm = {
    [EResetPasswordFormFieldsNames.password]: string;
    [EResetPasswordFormFieldsNames.passwordConfirmation]: string;
};

export const resetPasswordFormDefaultValues: TResetPasswordForm = {
    [EResetPasswordFormFieldsNames.password]: "",
    [EResetPasswordFormFieldsNames.passwordConfirmation]: "",
};

export const resetPasswordFormResolver = (): Resolver<TResetPasswordForm> => {
    const requiredText = "This field is required";

    return yupResolver(
        yup.object().shape({
            [EResetPasswordFormFieldsNames.password]: yupPasswordRequired(),
            [EResetPasswordFormFieldsNames.passwordConfirmation]: yup
                .string()
                .required(requiredText || "This field is required")
                .oneOf(
                    [yup.ref(EResetPasswordFormFieldsNames.password)],
                    "Password confirmation doesn't match the password",
                ),
        }),
    );
};
