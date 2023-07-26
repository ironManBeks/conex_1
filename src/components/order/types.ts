import { ReactNode, Ref } from "react";
import { TGuestModeForm } from "@components/order/formAttrs";
import { FieldErrors } from "react-hook-form/dist/types/errors";
import { ECheckoutUserModes } from "@components/pages/CheckoutPage/types";

export type TOrderSettingsLayout = {
    className?: string;
    title?: string;
    headContent?: ReactNode;
    bodyContent?: ReactNode;
    footerContent?: ReactNode;
    footerActions?: ReactNode;
};

export type TOrderChoiceAddress = {
    className?: string;
};

export interface IOrderGuestModeFormRef {
    submitForm: () => Promise<FieldErrors<TGuestModeForm> | TGuestModeForm>;
}

export type TOrderGuestModeForm = {
    className?: string;
    onValuesChange?: (values: TGuestModeForm) => void;
    reference: Ref<IOrderGuestModeFormRef> | undefined;
};

export type TShippingMethod = {
    isDefault?: boolean;
    name: string;
    price: string;
    value: string;
    dayFrom?: number;
    dayTo?: number;
    icon?: string;
};

export type TOrderShippingMethod = {
    className?: string;
    onChange?: (value: string) => void;
    options: TShippingMethod[];
};

export type TOrderPaymentMethod = {
    className?: string;
    userMode: ECheckoutUserModes;
};

export enum EPaymentMethodsNames {
    paypal = "paypal",
    amazon = "amazon",
    bankTransfer = "bankTransfer",
    card = "card",
}
