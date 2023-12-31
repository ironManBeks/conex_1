import * as yup from "yup";
import { renderValidationText } from "@helpers/formHelpers";

export const yupPhoneRequired = (
    requiredText?: string,
): yup.StringSchema<string, yup.AnyObject> => {
    return yup
        .string()
        .required(requiredText || "This field is required")
        .min(11, "Please enter valid phone number")
        .max(11, "Please enter valid phone number");
};

export const yupPasswordRequired = (
    requiredText?: string,
): yup.StringSchema<string, yup.AnyObject> => {
    const minText = "Password cannot contain less than 8 symbols";
    const maxText = "Password cannot contain more than 30 symbols";
    const onlyLatin = "Password can only contain Latin letters";
    return yup
        .string()
        .required(requiredText || "This field is required")
        .min(8, minText)
        .max(30, maxText)
        .matches(/[a-zA-Z]/, onlyLatin);
};

export const yupNameRequired = (
    surName?: boolean,
    requiredText?: string,
): yup.StringSchema<string, yup.AnyObject> => {
    return yup
        .string()
        .required(requiredText || renderValidationText("required"))
        .min(2, renderValidationText("min", surName ? "Surname" : "Name", 2))
        .max(30, renderValidationText("max", surName ? "Surname" : "Name", 30))
        .trim();
};

export const yupEmailRequired = (
    requiredText?: string,
): yup.StringSchema<string, yup.AnyObject> => {
    const emailNotValid = "Please enter valid email address";
    const emailMaxText = "Email cannot contain more than 100 symbols";
    return yup
        .string()
        .required(requiredText || renderValidationText("required"))
        .max(100, emailMaxText)
        .email(emailNotValid)
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, emailNotValid);
};
