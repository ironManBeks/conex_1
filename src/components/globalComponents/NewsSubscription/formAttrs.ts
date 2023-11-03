import { Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { yupEmailRequired } from "@consts/validationConsts";

export enum ENewsSubscriptionFormFieldsNames {
    email = "email",
}

export type TNewsSubscriptionForm = {
    [ENewsSubscriptionFormFieldsNames.email]: string;
};

export const newsSubscriptionFormDefaultValues: TNewsSubscriptionForm = {
    [ENewsSubscriptionFormFieldsNames.email]: "",
};

export const newsSubscriptionFormResolver =
    (): Resolver<TNewsSubscriptionForm> => {
        return yupResolver(
            yup.object().shape({
                [ENewsSubscriptionFormFieldsNames.email]: yupEmailRequired(),
            }),
        );
    };
