export type TNullable<T> = T | null;

export enum EDirection {
    vertical = "vertical",
    horizontal = "horizontal",
}

export type TRGB = `rgb(${number}, ${number}, ${number})`;
export type TRGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
export type THEX = `#${string}`;
