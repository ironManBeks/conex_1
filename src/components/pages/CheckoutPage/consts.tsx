import React from "react";
import { IconBank, IconCreditCard } from "@components/Icons";
import { EPaymentMethodValues } from "./formAttrs";
import { TPaymentMethod } from "./types";

export const CHECKOUT_SUBMIT_BUTTON_ID = "id_checkout_submit_button";

export const PaymentMethodsMockup: TPaymentMethod[] = [
    // {
    //     value: EPaymentMethodValues.paypal,
    //     label: <IconPaypal />,
    // },
    // {
    //     value: EPaymentMethodValues.amazonPay,
    //     label: <IconAmazonPay />,
    // },
    {
        value: EPaymentMethodValues.bankTransfer,
        label: (
            <>
                <IconBank /> Bank Transfer
            </>
        ),
    },
    {
        value: EPaymentMethodValues.creditDebitCard,
        label: (
            <>
                <IconCreditCard /> Credit/Debit Card
            </>
        ),
    },
];
