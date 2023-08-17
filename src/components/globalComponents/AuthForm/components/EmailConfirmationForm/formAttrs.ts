import * as yup from "yup";
import { Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { yupEmailRequired } from "@consts/validationConsts";

export enum EEmailConfirmationFormFieldsNames {
    email = "email",
}

export type TEmailConfirmationForm = {
    [EEmailConfirmationFormFieldsNames.email]: string;
};

export const emailConfirmationFormDefaultValues: TEmailConfirmationForm = {
    [EEmailConfirmationFormFieldsNames.email]: "",
};

export const emailConfirmationFormResolver =
    (): Resolver<TEmailConfirmationForm> => {
        return yupResolver(
            yup.object().shape({
                [EEmailConfirmationFormFieldsNames.email]: yupEmailRequired(),
            }),
        );
    };
