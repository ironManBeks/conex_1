import * as yup from "yup";

export const yupPhoneRequired = (
    requiredText?: string,
): yup.StringSchema<string, yup.AnyObject> =>
    yup
        .string()
        .required(requiredText || "This field is required")
        .min(11, "Please enter valid phone number")
        .max(11, "Please enter valid phone number");
