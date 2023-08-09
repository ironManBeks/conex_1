import { Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export enum EPaymentCardFromFieldsNames {
    nameOnCard = "nameOnCard",
    cardNumber = "cardNumber",
    cvv = "cvv",
    expDate = "expDate",
}

export type TPaymentCardFrom = {
    [EPaymentCardFromFieldsNames.nameOnCard]: string;
    [EPaymentCardFromFieldsNames.cardNumber]: string;
    [EPaymentCardFromFieldsNames.cvv]: string;
    [EPaymentCardFromFieldsNames.expDate]: string;
};

export const paymentCardFromDefaultValues: Record<
    EPaymentCardFromFieldsNames,
    string | number | null
> = {
    [EPaymentCardFromFieldsNames.nameOnCard]: "",
    [EPaymentCardFromFieldsNames.cardNumber]: "",
    [EPaymentCardFromFieldsNames.cvv]: "",
    [EPaymentCardFromFieldsNames.expDate]: "",
};

export const paymentCardFromResolver = (): Resolver<TPaymentCardFrom> => {
    const requiredText = (fieldName: string) =>
        `Field "${fieldName}" is required`;
    const minLengthText = (fieldName: string, value: number) =>
        `Field "${fieldName}" cannot contain less than ${value} characters`;
    const maxLengthText = (fieldName: string, value: number) =>
        `Field "${fieldName}" cannot contain more than ${value} characters`;
    const notValidDate = "Invalid date format";

    return yupResolver(
        yup.object().shape({
            [EPaymentCardFromFieldsNames.nameOnCard]: yup
                .string()
                .required(requiredText("Name on the card")),
            [EPaymentCardFromFieldsNames.cardNumber]: yup
                .string()
                .required(requiredText("Card number"))
                // .min(12, minLengthText("Card number", 12))
                .test(
                    EPaymentCardFromFieldsNames.cardNumber,
                    minLengthText("Card number", 15),
                    (value) => {
                        const trimVal = value.replace(/[^\d]/g, "").trim();
                        return trimVal.length > 14;
                    },
                ),
            [EPaymentCardFromFieldsNames.cvv]: yup
                .string()
                .required(requiredText("CVV"))
                .min(3, minLengthText("CVV", 3))
                .max(4, maxLengthText("CVV", 4)),
            [EPaymentCardFromFieldsNames.expDate]: yup
                .string()
                .required(requiredText("Exp. date"))
                .typeError(notValidDate)
                .max(5, notValidDate)
                .matches(/([0-9]{2})\/([0-9]{2})/, notValidDate),
        }),
    );
};
