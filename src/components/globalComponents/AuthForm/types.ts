import { Dispatch, SetStateAction } from "react";

export type TAuthFormProps = {
    onAuth?: () => void;
    className?: string;
};

export type TAuthFormTypes = {
    setFormType: Dispatch<SetStateAction<EAuthFormType>>;
    formType: EAuthFormType;
};

export type TAuthFooter = TAuthFormTypes;

export enum EAuthFormType {
    login = "login",
    register = "register",
    forgotPassword = "forgotPassword",
    resetPassword = "resetPassword",
    changePassword = "changePassword",
    sendEmailConfirmation = "sendEmailConfirmation",
}
