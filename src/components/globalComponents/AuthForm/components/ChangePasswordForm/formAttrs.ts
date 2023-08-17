import * as yup from "yup";
import { Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { yupPasswordRequired } from "@consts/validationConsts";

export enum EChangePasswordFormFieldsNames {
    currentPassword = "currentPassword",
    password = "password",
    passwordConfirmation = "passwordConfirmation",
}

export type TChangePasswordForm = {
    [EChangePasswordFormFieldsNames.currentPassword]: string;
    [EChangePasswordFormFieldsNames.password]: string;
    [EChangePasswordFormFieldsNames.passwordConfirmation]: string;
};

export const changePasswordFormDefaultValues: TChangePasswordForm = {
    [EChangePasswordFormFieldsNames.currentPassword]: "",
    [EChangePasswordFormFieldsNames.password]: "",
    [EChangePasswordFormFieldsNames.passwordConfirmation]: "",
};

export const changePasswordFormResolver = (): Resolver<TChangePasswordForm> => {
    const requiredText = "This field is required";

    return yupResolver(
        yup.object().shape({
            [EChangePasswordFormFieldsNames.currentPassword]: yup
                .string()
                .required(requiredText),
            [EChangePasswordFormFieldsNames.password]: yupPasswordRequired(),
            [EChangePasswordFormFieldsNames.passwordConfirmation]: yup
                .string()
                .required(requiredText || "This field is required")
                .oneOf(
                    [yup.ref(EChangePasswordFormFieldsNames.password)],
                    "Password confirmation doesn't match the new password",
                ),
        }),
    );
};
