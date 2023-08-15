import * as yup from "yup";
import { Resolver } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import {
    yupEmailRequired,
    yupPasswordRequired,
} from "@consts/validationConsts";

export enum ESignUpFormFieldsNames {
    username = "username",
    email = "email",
    password = "password",
}

export type TSignUpForm = {
    [ESignUpFormFieldsNames.username]: string;
    [ESignUpFormFieldsNames.email]: string;
    [ESignUpFormFieldsNames.password]: string;
};

export const signUpFormDefaultValues: TSignUpForm = {
    [ESignUpFormFieldsNames.username]: "",
    [ESignUpFormFieldsNames.email]: "",
    [ESignUpFormFieldsNames.password]: "",
};

export const signUpFormResolver = (): Resolver<TSignUpForm> => {
    const requiredText = "This field is required";

    return yupResolver(
        yup.object().shape({
            [ESignUpFormFieldsNames.username]: yup
                .string()
                .required(requiredText)
                .trim(),
            [ESignUpFormFieldsNames.email]: yupEmailRequired(),
            [ESignUpFormFieldsNames.password]: yupPasswordRequired(),
        }),
    );
};
