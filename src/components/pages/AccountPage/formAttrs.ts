import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Resolver } from "react-hook-form";
import { TAccountData } from "@store/auth/types";
import {
    yupEmailRequired,
    yupNameRequired,
    yupPhoneRequired,
} from "@consts/validationConsts";

export enum EAccountMyFormFieldsNames {
    name = "name",
    surname = "surname",
    email = "email",
    phone = "phone",
    country = "country",
    city = "city",
    address = "address",
    index = "index",
}

export type TAccountMyForm = {
    [EAccountMyFormFieldsNames.name]: string;
    [EAccountMyFormFieldsNames.surname]: string;
    [EAccountMyFormFieldsNames.email]: string;
    [EAccountMyFormFieldsNames.phone]: string;
    [EAccountMyFormFieldsNames.country]: string;
    [EAccountMyFormFieldsNames.city]: string;
    [EAccountMyFormFieldsNames.address]: string;
    [EAccountMyFormFieldsNames.index]: string;
};

export const accountMyFormDefaultValues = (
    data?: TAccountData,
): TAccountMyForm => {
    return {
        [EAccountMyFormFieldsNames.name]: data?.name ?? "",
        [EAccountMyFormFieldsNames.surname]: data?.surname ?? "",
        [EAccountMyFormFieldsNames.email]: data?.email ?? "",
        [EAccountMyFormFieldsNames.phone]: data?.phone ?? "",
        [EAccountMyFormFieldsNames.country]: data?.country ?? "",
        [EAccountMyFormFieldsNames.city]: data?.city ?? "",
        [EAccountMyFormFieldsNames.address]: data?.address ?? "",
        [EAccountMyFormFieldsNames.index]: data?.index ?? "",
    };
};

export const accountMyFormResolver = (): Resolver<TAccountMyForm> => {
    const requiredText = "This field is required";

    return yupResolver(
        yup.object().shape({
            [EAccountMyFormFieldsNames.name]: yupNameRequired(),
            [EAccountMyFormFieldsNames.surname]: yupNameRequired(true),
            [EAccountMyFormFieldsNames.email]: yupEmailRequired(),
            [EAccountMyFormFieldsNames.phone]: yupPhoneRequired(),
            [EAccountMyFormFieldsNames.country]: yup
                .string()
                .required(requiredText),
            [EAccountMyFormFieldsNames.city]: yup
                .string()
                .required(requiredText),
            [EAccountMyFormFieldsNames.address]: yup
                .string()
                .required(requiredText),
            [EAccountMyFormFieldsNames.index]: yup
                .string()
                .required(requiredText),
        }),
    );
};
