import { CSSProperties } from "react";

export type TBuilderRightSide = {
    pageClassPrefix: string;
};

export type TBuilderForm = {
    pageClassPrefix: string;
};

export type TBuilderFormActions = {
    pageClassPrefix: string;
};

export type TBuilderFormCard = {
    title?: string;
    subTitle?: string;
    subInfo?: string;
    src?: string;
    wrapperClassPrefix: string;
    wrapperStyles?: CSSProperties;
    value: string;
    onClick?: (value: string) => void;
    isActive?: boolean;
};
