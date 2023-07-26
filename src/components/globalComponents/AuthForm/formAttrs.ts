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
    const passwordMinSymbols = "Password must contains minimum 8 symbols";
    const passwordMaxSymbols = "Password must contains max 30 symbols";

    return yupResolver(
        yup.object().shape({
            [EAuthFormFieldsNames.name]: yup
                .string()
                .email(emailNotValid)
                .required(requiredText),
            [EAuthFormFieldsNames.password]: yup
                .string()
                .min(8, passwordMinSymbols)
                .max(30, passwordMaxSymbols)
                .required(requiredText),
        }),
    );
};
