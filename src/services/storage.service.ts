//////////////////
// Local Storage
//
import { isNil } from "lodash";

export const setStorage = (key: string, value: unknown): void => {
    if (!isNil(value)) {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

export const getStorage = (key: string): unknown | null => {
    if (typeof window !== "undefined") {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    } else return null;
};

export const removeStorage = (key: string): void => {
    localStorage.removeItem(key);
};

export const clearStorage = (): void => {
    localStorage.clear();
};

//////////////////
// Session Storage
//
export const setSessionStorage = (
    key: string,
    value: string | string[],
): void => {
    sessionStorage.setItem(key, JSON.stringify(value));
};

export const getSessionStorage = (key: string): unknown | null => {
    if (typeof window !== "undefined") {
        const value = sessionStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    } else return null;
};

export const removeSessionStorage = (key: string): void => {
    sessionStorage.removeItem(key);
};

export const clearSessionStorage = (): void => {
    sessionStorage.clear();
};
