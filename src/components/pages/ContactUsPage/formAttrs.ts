import { Resolver } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { yupNameRequired, yupPhoneRequired } from "@consts/validationConsts";

export const FEEDBACK_MAX_MESSAGE_LENGTH = 1000;

export enum EContactsUsFieldsNames {
    name = "name",
    phoneNumber = "phoneNumber",
    message = "message",
}

export type TContactsUsForm = {
    [EContactsUsFieldsNames.name]: string;
    [EContactsUsFieldsNames.phoneNumber]: string;
    [EContactsUsFieldsNames.message]: string;
};

export const contactsUsDefaultValues: TContactsUsForm = {
    [EContactsUsFieldsNames.name]: "",
    [EContactsUsFieldsNames.phoneNumber]: "",
    [EContactsUsFieldsNames.message]: "",
};

export const contactsUsFormResolver = (): Resolver<TContactsUsForm> => {
    const requiredText = "This field is required";
    const maxText = `This field cannot contain more than ${FEEDBACK_MAX_MESSAGE_LENGTH} symbols`;

    return yupResolver(
        yup.object().shape({
            [EContactsUsFieldsNames.name]: yupNameRequired(),
            [EContactsUsFieldsNames.phoneNumber]: yupPhoneRequired(),
            [EContactsUsFieldsNames.message]: yup
                .string()
                .required(requiredText)
                .max(FEEDBACK_MAX_MESSAGE_LENGTH, maxText),
        }),
    );
};
