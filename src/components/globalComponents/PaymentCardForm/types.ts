import { ReactNode } from "react";
import { TPaymentCardFrom } from "@components/globalComponents/PaymentCardForm/formAttrs";

export type TPaymentCardFormSection = {
    className?: string;
    submitText?: string;
    actionsContent?: ReactNode;
    onSuccessfulSubmit?: (data: TPaymentCardFrom) => void;
};
