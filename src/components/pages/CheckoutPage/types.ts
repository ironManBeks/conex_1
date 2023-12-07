import { TSectionTypes } from "@globalTypes/sectionTypes";
import {
    EPaymentMethodValues,
    TCheckoutForm,
} from "@components/pages/CheckoutPage/formAttrs";
import { ReactNode } from "react";

export type TOrderSettings = {
    className?: string;
    placement: "cart" | "checkout";
} & TSectionTypes;

export type TPaymentMethod = {
    value: EPaymentMethodValues;
    label: ReactNode;
};

export type TCustomSubmitHandler = (
    data: TCheckoutForm,
    additionalData: TSessionsData,
) => unknown | Promise<unknown>;

export type TSessionsData = {
    sessionId: string;
    sessionResult: string;
};
