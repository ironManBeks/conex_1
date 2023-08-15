import * as yup from "yup";
import { Resolver } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { yupPasswordRequired } from "@consts/validationConsts";

export enum ESignInFormFieldsNames {
    identifier = "identifier",
    password = "password",
}

export type TSignInForm = {
    [ESignInFormFieldsNames.identifier]: string;
    [ESignInFormFieldsNames.password]: string;
};

export const signInFormDefaultValues: TSignInForm = {
    [ESignInFormFieldsNames.identifier]: "",
    [ESignInFormFieldsNames.password]: "",
};

export const signInFormResolver = (): Resolver<TSignInForm> => {
    const requiredText = "This field is required";

    return yupResolver(
        yup.object().shape({
            [ESignInFormFieldsNames.identifier]: yup
                .string()
                .required(requiredText),
            [ESignInFormFieldsNames.password]: yupPasswordRequired(),
        }),
    );
};
