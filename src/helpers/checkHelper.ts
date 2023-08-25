import { isNil } from "lodash";

export const isColorHex = (value: string | null | undefined): boolean => {
    if (isNil(value)) return false;
    const reg = /^#([0-9a-f]{3}){1,2}$/i;
    return reg.test(value);
};
