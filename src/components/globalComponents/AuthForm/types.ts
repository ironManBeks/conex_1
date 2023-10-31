import { TStore } from "@globalTypes/storeTypes";

export type TAuthFormProps = {
    onAuth?: () => void;
    className?: string;
} & TStore;

export type TAuthFormTypes = {
    // setFormType: (value: EAuthFormType) => void;
    // formType: EAuthFormType | string | undefined;
};

export type TAuthFooter = TAuthFormTypes;
export type TAuthHeader = TAuthFormTypes;

export enum EAuthFormType {
    login = "login",
    register = "register",
    forgotPassword = "forgot-password",
    resetPassword = "reset-password",
    changePassword = "change-password",
    sendEmailConfirmation = "send-email-confirmation",
}
