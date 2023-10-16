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
};

export const accountMyFormDefaultValues = (
    data?: TNullable<TUserData>,
): TAccountMyForm => {
    return {
        [EAccountMyFormFieldsNames.first_name]: data?.first_name ?? "name",
        [EAccountMyFormFieldsNames.last_name]: data?.last_name ?? "surname",
        [EAccountMyFormFieldsNames.email]: data?.email ?? "email",
        [EAccountMyFormFieldsNames.phone]: data?.phone ?? "12312312312",
        [EAccountMyFormFieldsNames.country]: data?.country ?? "country",
        [EAccountMyFormFieldsNames.city]: data?.city ?? "city",
        [EAccountMyFormFieldsNames.address]: data?.address ?? "address",
        [EAccountMyFormFieldsNames.zip]: data?.zip ?? "zip",
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
                .max(50, renderValidationText("max", undefined, 50))
                .required(requiredText)
                .trim(),
        }),
    );
};
