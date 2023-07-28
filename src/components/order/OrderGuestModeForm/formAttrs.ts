import * as yup from "yup";
import { Resolver } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

export enum EGuestModeFormFieldsNames {
    name = "name",
    phone = "phone",
}

export type TGuestModeForm = {
    [EGuestModeFormFieldsNames.name]: string;
    [EGuestModeFormFieldsNames.phone]: string;
};

export const guestModeDefaultValues: TGuestModeForm = {
    [EGuestModeFormFieldsNames.name]: "",
    [EGuestModeFormFieldsNames.phone]: "",
};

export const guestModeFormResolver = (): Resolver<TGuestModeForm> => {
    const requiredText = "This field is required";

    return yupResolver(
        yup.object().shape({
            [EGuestModeFormFieldsNames.name]: yup
                .string()
                .required(requiredText),
            [EGuestModeFormFieldsNames.phone]: yup
                .string()
                .required(requiredText),
        }),
    );
};
