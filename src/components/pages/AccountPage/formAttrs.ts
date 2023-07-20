import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Resolver } from "react-hook-form";

export enum EAccountInfoFieldsNames {
    name = "name",
    email = "email",
    phone = "phone",
}

export enum EAccountTrackerFieldsNames {
    tracker = "tracker",
}

export type TAccountInfoForm = {
    [EAccountInfoFieldsNames.name]: string;
    [EAccountInfoFieldsNames.email]: string;
    [EAccountInfoFieldsNames.phone]: string;
};

export type TAccountTrackerForm = {
    [EAccountTrackerFieldsNames.tracker]: string;
};

export const accountInfoDefaultValues: TAccountInfoForm = {
    [EAccountInfoFieldsNames.name]: "",
    [EAccountInfoFieldsNames.email]: "",
    [EAccountInfoFieldsNames.phone]: "",
};

export const accountTrackerDefaultValues: TAccountTrackerForm = {
    [EAccountTrackerFieldsNames.tracker]: "",
};

export const accountInfoFormResolver = (): Resolver<TAccountInfoForm> => {
    const requiredText = "This field is required";

    return yupResolver(
        yup.object().shape({
            [EAccountInfoFieldsNames.name]: yup.string().required(requiredText),
            [EAccountInfoFieldsNames.email]: yup
                .string()
                .email()
                .required(requiredText),
            [EAccountInfoFieldsNames.phone]: yup
                .string()
                .required(requiredText),
        }),
    );
};
