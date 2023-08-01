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
