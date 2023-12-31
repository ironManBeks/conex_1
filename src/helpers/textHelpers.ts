import { isString } from "lodash";

export const cutText = (text: string, limit: number): string => {
    text = text.trim();
    if (text.length <= limit) return text;
    text = text.slice(0, limit);
    return text.trim() + "...";
};

export const addZeroBefore = (text: number | string): string => {
    if (isString(text)) {
        return (parseInt(text, 10) < 10 ? "0" : "") + text;
    }
    return (text < 10 ? "0" : "") + text;
};

export const firstLetterToUpperCase = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};
