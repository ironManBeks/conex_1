import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Resolver } from "react-hook-form";
import {
    yupEmailRequired,
    yupNameRequired,
    yupPhoneRequired,
} from "@consts/validationConsts";
import { TUserData } from "@store/auth/types";
import { TNullable } from "@globalTypes/commonTypes";
import { renderValidationText } from "@helpers/formHelpers";

export enum EAccountMyFormFieldsNames {
    first_name = "first_name",
    last_name = "last_name",
    email = "email",
    phone = "phone",
    country = "country",
    city = "city",
    address = "address",
    zip = "zip",
    username = "username",
}

export type TAccountMyForm = {
    [EAccountMyFormFieldsNames.first_name]: string;
    [EAccountMyFormFieldsNames.last_name]: string;
    [EAccountMyFormFieldsNames.email]: string;
    [EAccountMyFormFieldsNames.phone]: string;
    [EAccountMyFormFieldsNames.country]: string;
    [EAccountMyFormFieldsNames.city]: string;
    [EAccountMyFormFieldsNames.address]: string;
    [EAccountMyFormFieldsNames.zip]: string;
    [EAccountMyFormFieldsNames.username]: string;
};

export const accountMyFormDefaultValues = (
    data?: TNullable<TUserData>,
): Record<EAccountMyFormFieldsNames, string> => {
    return {
        [EAccountMyFormFieldsNames.first_name]: data?.first_name ?? "",
        [EAccountMyFormFieldsNames.last_name]: data?.last_name ?? "",
        [EAccountMyFormFieldsNames.email]: data?.email ?? "",
        [EAccountMyFormFieldsNames.phone]: data?.phone ?? "",
        [EAccountMyFormFieldsNames.country]: data?.country ?? "",
        [EAccountMyFormFieldsNames.city]: data?.city ?? "",
        [EAccountMyFormFieldsNames.address]: data?.address ?? "",
        [EAccountMyFormFieldsNames.zip]: data?.zip ?? "",
        [EAccountMyFormFieldsNames.username]: data?.username ?? "",
    };
};

export const accountMyFormResolver = (): Resolver<TAccountMyForm> => {
    const requiredText = "This field is required";

    return yupResolver(
        yup.object().shape({
            [EAccountMyFormFieldsNames.first_name]: yupNameRequired(),
            [EAccountMyFormFieldsNames.last_name]: yupNameRequired(true),
            [EAccountMyFormFieldsNames.email]: yupEmailRequired(),
            [EAccountMyFormFieldsNames.phone]: yupPhoneRequired(),
            [EAccountMyFormFieldsNames.username]: yupNameRequired(),
            [EAccountMyFormFieldsNames.country]: yup
                .string()
                .max(50, renderValidationText("max", undefined, 50))
                .required(requiredText)
                .trim(),
            [EAccountMyFormFieldsNames.city]: yup
                .string()
                .max(50, renderValidationText("max", undefined, 50))
                .required(requiredText)
                .trim(),
            [EAccountMyFormFieldsNames.address]: yup
                .string()
                .max(100, renderValidationText("max", undefined, 100))
                .required(requiredText)
                .trim(),
            [EAccountMyFormFieldsNames.zip]: yup
                .string()
                .required(requiredText)
                .matches(/^\d{5}(?:[-\s]\d{4})?$/, "Invalid ZIP code format"),
        }),
    );
};
