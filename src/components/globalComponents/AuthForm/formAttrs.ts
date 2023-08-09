import * as yup from "yup";
import { Resolver } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

export enum EAuthFormFieldsNames {
    name = "name",
    password = "password",
}

export type TAuthForm = {
    [EAuthFormFieldsNames.name]: string;
    [EAuthFormFieldsNames.password]: string;
};

export const authFormDefaultValues: TAuthForm = {
    [EAuthFormFieldsNames.name]: "",
    [EAuthFormFieldsNames.password]: "",
};

export const authFormResolver = (): Resolver<TAuthForm> => {
    const requiredText = "This field is required";
    const emailNotValid = "Email address not valid";
    const passwordMinText = "Password cannot contain less than 8 symbols";
    const passwordMaxText = "Password cannot contain more than 30 symbols";

    return yupResolver(
        yup.object().shape({
            [EAuthFormFieldsNames.name]: yup
                .string()
                .required(requiredText)
                .email(emailNotValid),
            [EAuthFormFieldsNames.password]: yup
                .string()
                .required(requiredText)
                .min(8, passwordMinText)
                .max(30, passwordMaxText),
        }),
    );
};
