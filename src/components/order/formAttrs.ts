import * as yup from "yup";
import { Resolver } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

export enum EGuestModeFormFieldsNames {
    name = "name",
    phone = "phone",
}

export enum EPaymentMethodFromFieldsNames {
    nameOnCard = "nameOnCard",
    cardNumber = "cardNumber",
    cvv = "cvv",
    expDate = "expDate",
}

export type TGuestModeForm = {
    [EGuestModeFormFieldsNames.name]: string;
    [EGuestModeFormFieldsNames.phone]: string;
};

export type TOrderPaymentMethodFrom = {
    [EPaymentMethodFromFieldsNames.nameOnCard]: string;
    [EPaymentMethodFromFieldsNames.cardNumber]: number;
    [EPaymentMethodFromFieldsNames.cvv]: number;
    [EPaymentMethodFromFieldsNames.expDate]: number;
};

export const guestModeDefaultValues: TGuestModeForm = {
    [EGuestModeFormFieldsNames.name]: "",
    [EGuestModeFormFieldsNames.phone]: "",
};

export const orderPaymentMethodDefaultValues: Record<
    EPaymentMethodFromFieldsNames,
    string | number | null
> = {
    [EPaymentMethodFromFieldsNames.nameOnCard]: "",
    [EPaymentMethodFromFieldsNames.cardNumber]: null,
    [EPaymentMethodFromFieldsNames.cvv]: null,
    [EPaymentMethodFromFieldsNames.expDate]: null,
};

export const guestModeFormResolver = (): Resolver<TGuestModeForm> => {
    const requiredText = "This field is required";

    return yupResolver(
        yup.object().shape({
            [EGuestModeFormFieldsNames.name]: yup
                .string()
                .required(requiredText),
            [EGuestModeFormFieldsNames.phone]: yup
                .string()
                .required(requiredText),
        }),
    );
};

export const orderPaymentMethodFormResolver =
    (): Resolver<TOrderPaymentMethodFrom> => {
        const requiredText = "This field is required";

        return yupResolver(
            yup.object().shape({
                [EPaymentMethodFromFieldsNames.nameOnCard]: yup
                    .string()
                    .required(requiredText),
                [EPaymentMethodFromFieldsNames.cardNumber]: yup
                    .number()
                    .max(16)
                    .required(requiredText),
                [EPaymentMethodFromFieldsNames.cvv]: yup
                    .number()
                    .min(3)
                    .max(4)
                    .required(requiredText),
                [EPaymentMethodFromFieldsNames.expDate]: yup
                    .number()
                    .max(5)
                    .required(requiredText),
            }),
        );
    };
