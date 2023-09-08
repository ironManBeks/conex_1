import * as yup from "yup";

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
    const minText = `${
        surName ? "Surname" : "Name"
    } cannot contain less than 2 symbols`;
    const maxText = `${
        surName ? "Surname" : "Name"
    } cannot contain more than 30 symbols`;
    return yup
        .string()
        .required(requiredText || "This field is required")
        .min(2, minText)
        .max(30, maxText)
        .trim();
};

export const yupEmailRequired = (
    requiredText?: string,
): yup.StringSchema<string, yup.AnyObject> => {
    const emailNotValid = "Please enter valid email address";
    const emailMaxText = "Email cannot contain more than 255 symbols";
    return yup
        .string()
        .required(requiredText || "This field is required")
        .max(255, emailMaxText)
        .email(emailNotValid);
};
