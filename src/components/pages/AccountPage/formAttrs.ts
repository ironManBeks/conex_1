import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Resolver } from "react-hook-form";
import { TAuthData } from "@store/stores/auth/types";
import { yupPhoneRequired } from "@consts/validationConsts";
import { isEmpty } from "lodash";

export enum EAccountInfoFieldsNames {
    name = "name",
    email = "email",
    phone = "phone",
}

export enum EAccountTrackerFieldsNames {
    tracker = "tracker",
}

export type TAccountInfoForm = {
    [EAccountInfoFieldsNames.name]?: string;
    [EAccountInfoFieldsNames.email]?: string;
    [EAccountInfoFieldsNames.phone]?: string;
};

export type TAccountTrackerForm = {
    [EAccountTrackerFieldsNames.tracker]: string;
};

export const accountInfoDefaultValues = (
    authData?: TAuthData,
): TAccountInfoForm => {
    return {
        [EAccountInfoFieldsNames.name]: authData?.name ?? "",
        [EAccountInfoFieldsNames.email]: authData?.email ?? "",
        [EAccountInfoFieldsNames.phone]: authData?.phone ?? "",
    };
};

export const accountTrackerDefaultValues: TAccountTrackerForm = {
    [EAccountTrackerFieldsNames.tracker]: "",
};

export const accountInfoFormResolver = (
    editableField: EAccountInfoFieldsNames | undefined,
): Resolver<TAccountInfoForm> | undefined => {
    const requiredText = "This field is required";
    const emailNotValid = "Please enter valid email address";

    if (!editableField) return undefined;
    let result: yup.ObjectSchema<
        { [editableField: string]: string },
        yup.AnyObject,
        { [editableField: string]: undefined },
        ""
    > | null = null;

    switch (editableField) {
        case EAccountInfoFieldsNames.name:
            result = yup.object().shape({
                [EAccountInfoFieldsNames.name]: yup
                    .string()
                    .required(requiredText),
            });
            break;
        case EAccountInfoFieldsNames.email:
            result = yup.object().shape({
                [EAccountInfoFieldsNames.email]: yup
                    .string()
                    .email(emailNotValid)
                    .required(requiredText),
            });
            break;
        case EAccountInfoFieldsNames.phone:
            result = yup
                .object()
                .shape({ [EAccountInfoFieldsNames.phone]: yupPhoneRequired() });
            break;
    }

    if (isEmpty(result)) return undefined;

    return yupResolver(result);
};
