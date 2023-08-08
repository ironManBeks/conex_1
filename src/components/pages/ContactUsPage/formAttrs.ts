import { Resolver } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { yupPhoneRequired } from "@consts/validationConsts";

export enum EContactsUsFieldsNames {
    name = "name",
    phone = "phone",
    message = "message",
}

export type TContactsUsForm = {
    [EContactsUsFieldsNames.name]: string;
    [EContactsUsFieldsNames.phone]: string;
    [EContactsUsFieldsNames.message]: string;
};

export const contactsUsDefaultValues: TContactsUsForm = {
    [EContactsUsFieldsNames.name]: "",
    [EContactsUsFieldsNames.phone]: "",
    [EContactsUsFieldsNames.message]: "",
};

export const contactsUsFormResolver = (): Resolver<TContactsUsForm> => {
    const requiredText = "This field is required";

    return yupResolver(
        yup.object().shape({
            [EContactsUsFieldsNames.name]: yup.string().required(requiredText),
            [EContactsUsFieldsNames.phone]: yupPhoneRequired(),
            [EContactsUsFieldsNames.message]: yup
                .string()
                .required(requiredText),
        }),
    );
};
