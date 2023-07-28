import { isEmpty } from "lodash";
import { FieldErrors } from "react-hook-form/dist/types/errors";

export const pickOutErrorMessages = <
    S extends FieldErrors,
    T extends string[] = [],
>(
    errorList: S,
    exceptions?: T,
): string[] => {
    const result: string[] = [];
    if (isEmpty(errorList)) {
        return result;
    }

    const keys = Object.keys(errorList);

    for (let i = 0; i < keys.length; i++) {
        const currentKey: keyof FieldErrors = keys[i];
        const hasMessage =
            !isEmpty(errorList) &&
            typeof errorList !== "undefined" &&
            !isEmpty(errorList[currentKey]) &&
            !exceptions?.includes(currentKey) &&
            errorList[currentKey]?.message;

        if (hasMessage) {
            result.push(errorList[currentKey]?.message as string);
        }
    }
    return result;
};
