import * as yup from "yup";
import { Resolver } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { yupEmailRequired } from "@consts/validationConsts";

export enum EForgotPasswordFormFieldsNames {
    email = "email",
}

export type TForgotPasswordForm = {
    [EForgotPasswordFormFieldsNames.email]: string;
};

export const forgotPasswordFormDefaultValues: TForgotPasswordForm = {
    [EForgotPasswordFormFieldsNames.email]: "",
};

export const forgotPasswordFormResolver = (): Resolver<TForgotPasswordForm> => {
    const requiredText = "This field is required";

    return yupResolver(
        yup.object().shape({
            [EForgotPasswordFormFieldsNames.email]: yupEmailRequired(),
        }),
    );
};
