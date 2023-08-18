import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Resolver } from "react-hook-form";
import { TAccountData } from "@store/auth/types";
import {
    yupEmailRequired,
    yupNameRequired,
    yupPhoneRequired,
} from "@consts/validationConsts";
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
    data?: TAccountInfoForm,
): TAccountInfoForm => {
    return {
        [EAccountInfoFieldsNames.name]: data?.name ?? "",
        [EAccountInfoFieldsNames.email]: data?.email ?? "",
        [EAccountInfoFieldsNames.phone]: data?.phone ?? "",
    };
};

export const accountTrackerDefaultValues: TAccountTrackerForm = {
    [EAccountTrackerFieldsNames.tracker]: "",
};

export const accountInfoFormResolver = (
    editableField: EAccountInfoFieldsNames | undefined,
): Resolver<TAccountInfoForm> | undefined => {
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
                [EAccountInfoFieldsNames.name]: yupNameRequired(),
            });
            break;
        case EAccountInfoFieldsNames.email:
            result = yup.object().shape({
                [EAccountInfoFieldsNames.email]: yupEmailRequired(),
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
