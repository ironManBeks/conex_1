import { Dispatch, SetStateAction } from "react";
import { TStore } from "@globalTypes/storeTypes";

export type TAuthFormProps = {
    onAuth?: () => void;
    className?: string;
} & TStore;

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
