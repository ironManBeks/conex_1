import { TDefaultOption } from "@components/form/types";

export const convertCheckboxArrayToBoolean = (
    checkboxArray: string[],
    defaultOptions: TDefaultOption[],
    onlyActive?: boolean,
): Record<string, boolean> => {
    const result: Record<string, boolean> = {};
    for (let i = 0; i < defaultOptions.length; i++) {
        const value = checkboxArray.includes(`${defaultOptions[i].value}`);
        if (onlyActive && value) {
            result[`${defaultOptions[i].value}`] = value;
        }
        if (!onlyActive) {
            result[`${defaultOptions[i].value}`] = value;
        }
    }

    return result;
};

export const renderValidationText = (
    type: "required" | "min" | "max" | "invalidDate" | "validEmail",
    fieldName?: string,
    value?: number,
): string => {
    switch (type) {
        case "required":
            return fieldName
                ? `Field "${fieldName}" is required`
                : "This field is required";
        case "max":
            return fieldName
                ? `Field "${fieldName}" cannot contain more than ${value} characters`
                : `This field cannot contain more than ${value} characters`;
        case "min":
            return fieldName
                ? `Field "${fieldName}" cannot contain less than ${value} characters`
                : `This field cannot contain less than ${value} characters`;
        case "invalidDate":
            return "Invalid date format";
        case "validEmail":
            return "Please enter valid email address";
    }
};
