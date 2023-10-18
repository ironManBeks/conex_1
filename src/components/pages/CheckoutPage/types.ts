import { TSectionTypes } from "@globalTypes/sectionTypes";
import { EPaymentMethodValues } from "@components/pages/CheckoutPage/formAttrs";
import { ReactNode } from "react";

export type TOrderSettings = {
    className?: string;
    placement: "cart" | "checkout";
} & TSectionTypes;

export type TPaymentMethod = {
    value: EPaymentMethodValues;
    label: ReactNode;
};
