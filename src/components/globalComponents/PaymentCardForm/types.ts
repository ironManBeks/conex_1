import { ReactNode, Ref } from "react";
import { TPaymentCardForm } from "@components/globalComponents/PaymentCardForm/formAttrs";

export interface IPaymentCardFormRef {
    reset: (newVal?: TPaymentCardForm) => void;
}

export type TPaymentCardFormSection = {
    className?: string;
    submitText?: string;
    actionsContent?: ReactNode;
    onSuccessfulSubmit?: (data: TPaymentCardForm) => void;
    defaultValues?: TPaymentCardForm;
    reference?: Ref<IPaymentCardFormRef> | undefined;
    subText?: {
        top?: ReactNode;
        bottom?: ReactNode;
    };
};
